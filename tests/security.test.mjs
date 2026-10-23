import test from 'node:test';
import assert from 'node:assert/strict';
import {
  passwordRecord,
  verifyPassword,
  issueSession,
  verifySession,
  SESSION_SECONDS,
} from '../src/lib/security.mjs';
test('password hashes verify and reject invalid input', () => {
  const record = passwordRecord('a sufficiently long password');
  assert.equal(verifyPassword('a sufficiently long password', record), true);
  assert.equal(verifyPassword('wrong', record), false);
  assert.equal(verifyPassword(null, record), false);
  assert.equal(verifyPassword('x'.repeat(257), record), false);
  assert.notEqual(passwordRecord('a sufficiently long password').hash, record.hash);
});
test('sessions are signed, expire and are invalidated by a secret rotation', () => {
  const now = 1700000000000,
    secret = 'test-secret-with-sufficient-entropy';
  const token = issueSession(secret, now);
  assert.equal(verifySession(token, secret, now), true);
  assert.equal(verifySession(token, 'rotated-secret', now), false);
  assert.equal(verifySession(token + 'x', secret, now), false);
  assert.equal(verifySession(token, secret, now + SESSION_SECONDS * 1000), false);
  assert.equal(verifySession('invalid', secret, now), false);
});
