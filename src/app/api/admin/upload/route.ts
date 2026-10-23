import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { authorize, limitedBody } from '@/lib/auth';
import { DATA_DIR } from '@/lib/store';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  const denied = await authorize(request);
  if (denied) return denied;
  try {
    const bytes = await limitedBody(request, 6 * 1024 * 1024);
    const form = await new Response(bytes as BodyInit, {
      headers: { 'Content-Type': request.headers.get('content-type') || '' },
    }).formData();
    const file = form.get('file');
    if (!(file instanceof File) || file.size > 5 * 1024 * 1024 || !file.size)
      throw new Error('Selecciona un archivo de hasta 5 MB.');
    const input = Buffer.from(await file.arrayBuffer());
    let output: Buffer, extension: string;
    if (file.type === 'application/pdf' && input.subarray(0, 5).toString() === '%PDF-') {
      output = input;
      extension = 'pdf';
    } else if (['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      output = await sharp(input, { limitInputPixels: 25_000_000 })
        .rotate()
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();
      extension = 'webp';
    } else throw new Error('Formatos permitidos: JPG, PNG, WebP o PDF.');
    const name = `${randomUUID()}.${extension}`;
    await mkdir(path.join(DATA_DIR, 'uploads'), { recursive: true });
    await writeFile(path.join(DATA_DIR, 'uploads', name), output);
    return NextResponse.json({ url: `/media/${name}` });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'No se pudo subir el archivo.' },
      { status: 400 },
    );
  }
}
