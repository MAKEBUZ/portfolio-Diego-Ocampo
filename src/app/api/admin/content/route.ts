import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { authorize, isAdmin, limitedBody } from '@/lib/auth';
import { readContent, saveContent } from '@/lib/store';
import { validateContent } from '@/lib/validation.mjs';
import type { Content } from '@/lib/types';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET() {
  if (!(await isAdmin()))
    return NextResponse.json({ error: 'Acceso restringido.' }, { status: 401 });
  return NextResponse.json(await readContent(), { headers: { 'Cache-Control': 'no-store' } });
}
export async function PUT(request: Request) {
  const denied = await authorize(request);
  if (denied) return denied;
  let content: Content;
  try {
    content = validateContent(
      JSON.parse(Buffer.from(await limitedBody(request)).toString()),
    ) as Content;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Datos inválidos.' },
      { status: 400 },
    );
  }
  try {
    const saved = await saveContent(content);
    revalidatePath('/');
    return NextResponse.json(saved);
  } catch (error) {
    if (error instanceof Error && error.message === 'CONFLICT')
      return NextResponse.json(
        {
          error:
            'El contenido cambió en otra pestaña. Exporta tu borrador y recarga antes de guardar.',
        },
        { status: 409 },
      );
    console.error('CMS save failed', error);
    return NextResponse.json(
      { error: 'No se pudo guardar. Tu borrador sigue disponible; vuelve a intentarlo.' },
      { status: 500 },
    );
  }
}
