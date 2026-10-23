import { NextResponse } from 'next/server';
import { credentials, sameOrigin, isAdmin, setSession, COOKIE, limitedBody } from '@/lib/auth';
import { verifyPassword } from '@/lib/security.mjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
let failures = 0,
  blockedUntil = 0;
export async function GET() {
  return NextResponse.json(
    { authenticated: await isAdmin(), configured: Boolean(await credentials()) },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: 'Origen no permitido.' }, { status: 403 });
  if (Date.now() < blockedUntil)
    return NextResponse.json(
      { error: 'Demasiados intentos. Espera 10 minutos antes de volver a intentarlo.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((blockedUntil - Date.now()) / 1000)) },
      },
    );
  if (blockedUntil) {
    failures = 0;
    blockedUntil = 0;
  }
  const config = await credentials();
  if (!config)
    return NextResponse.json(
      { error: 'Configura el acceso ejecutando npm run admin:setup en el servidor.' },
      { status: 503 },
    );
  try {
    const body = JSON.parse(Buffer.from(await limitedBody(request, 2048)).toString());
    if (!verifyPassword(body.password, config)) {
      failures++;
      if (failures >= 5) blockedUntil = Date.now() + 600_000;
      return NextResponse.json({ error: 'Contraseña incorrecta.' }, { status: 401 });
    }
    failures = 0;
    const response = NextResponse.json({ ok: true });
    setSession(response, config.secret, request);
    return response;
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }
}
export async function DELETE(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: 'Origen no permitido.' }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, '', { path: '/', maxAge: 0, httpOnly: true, sameSite: 'strict' });
  return response;
}
