import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { DATA_DIR } from './store';
import { verifySession, issueSession, SESSION_SECONDS } from './security.mjs';
export const COOKIE = 'ocampo_admin';
export interface Credentials {
  salt: string;
  hash: string;
  secret: string;
}
export async function credentials(): Promise<Credentials | null> {
  try {
    return JSON.parse(await readFile(path.join(DATA_DIR, 'admin.json'), 'utf8'));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
}
export async function isAdmin() {
  const config = await credentials();
  const token = (await cookies()).get(COOKIE)?.value;
  return Boolean(config && token && verifySession(token, config.secret));
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  if (process.env.SITE_URL) return origin === new URL(process.env.SITE_URL).origin;
  // Next may normalize request.url to localhost. The browser's Host retains
  // the actual local address; in production SITE_URL pins the trusted origin.
  const url = new URL(request.url);
  const host = request.headers.get('host') || url.host;
  return origin === `${url.protocol}//${host}`;
}
export function setSession(response: NextResponse, secret: string, request: Request) {
  response.cookies.set(COOKIE, issueSession(secret), {
    httpOnly: true,
    sameSite: 'strict',
    secure: (process.env.SITE_URL || request.url).startsWith('https:'),
    path: '/',
    maxAge: SESSION_SECONDS,
  });
}
export async function authorize(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: 'Origen no permitido.' }, { status: 403 });
  if (!(await isAdmin()))
    return NextResponse.json(
      { error: 'Tu sesión expiró. Inicia sesión de nuevo.' },
      { status: 401 },
    );
  return null;
}
export async function limitedBody(request: Request, max = 500_000): Promise<Uint8Array> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Cuerpo vacío.');
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.length;
    if (length > max) {
      await reader.cancel();
      throw new Error('El archivo supera el tamaño permitido.');
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}
