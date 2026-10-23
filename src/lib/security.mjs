import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
export const SESSION_SECONDS = 60 * 60 * 12;
export function passwordRecord(password) {
  const salt = randomBytes(32).toString('hex');
  return { salt, hash: scryptSync(password, salt, 64).toString('hex') };
}
export function verifyPassword(password, record) {
  if (typeof password !== 'string' || password.length > 256) return false;
  const candidate = scryptSync(password, record.salt, 64);
  const stored = Buffer.from(record.hash, 'hex');
  return candidate.length === stored.length && timingSafeEqual(candidate, stored);
}
export function issueSession(secret, now = Date.now()) {
  const payload = Buffer.from(
    JSON.stringify({
      exp: Math.floor(now / 1000) + SESSION_SECONDS,
      nonce: randomBytes(16).toString('hex'),
    }),
  ).toString('base64url');
  return `${payload}.${createHmac('sha256', secret).update(payload).digest('base64url')}`;
}
export function verifySession(token, secret, now = Date.now()) {
  try {
    const [payload, signature, extra] = token.split('.');
    if (!payload || !signature || extra) return false;
    const expected = createHmac('sha256', secret).update(payload).digest();
    const given = Buffer.from(signature, 'base64url');
    if (given.length !== expected.length || !timingSafeEqual(given, expected)) return false;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return (
      Number.isInteger(data.exp) &&
      data.exp > Math.floor(now / 1000) &&
      data.exp <= Math.floor(now / 1000) + SESSION_SECONDS
    );
  } catch {
    return false;
  }
}
