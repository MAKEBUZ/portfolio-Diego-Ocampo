import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { DATA_DIR } from '@/lib/store';
export const runtime = 'nodejs';
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!/^[a-f0-9-]{36}\.(webp|pdf)$/.test(file)) return new Response(null, { status: 404 });
  try {
    const content = await readFile(path.join(DATA_DIR, 'uploads', file));
    return new Response(content, {
      headers: {
        'Content-Type': file.endsWith('.pdf') ? 'application/pdf' : 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
        'Content-Disposition': file.endsWith('.pdf')
          ? 'attachment; filename="CV_Diego_Ocampo.pdf"'
          : 'inline',
      },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
