import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { authorize, credentials, limitedBody, setSession } from '@/lib/auth';
import { verifyPassword, passwordRecord } from '@/lib/security.mjs';
import { atomicWrite } from '@/lib/store';
export const runtime = 'nodejs';
export async function PUT(request: Request) {
  const denied = await authorize(request);
  if (denied) return denied;
  try {
    const body = JSON.parse(Buffer.from(await limitedBody(request, 2048)).toString());
    const config = await credentials();
    if (!config || !verifyPassword(body.currentPassword, config))
      return NextResponse.json({ error: 'La contraseña actual no coincide.' }, { status: 400 });
    if (
      typeof body.password !== 'string' ||
      body.password.length < 12 ||
      body.password.length > 128
    )
      return NextResponse.json({ error: 'Usa entre 12 y 128 caracteres.' }, { status: 400 });
    const secret = randomBytes(48).toString('hex');
    await atomicWrite('admin.json', { ...passwordRecord(body.password), secret });
    const response = NextResponse.json({ ok: true });
    setSession(response, secret, request);
    return response;
  } catch {
    return NextResponse.json({ error: 'No se pudo cambiar la contraseña.' }, { status: 400 });
  }
}
