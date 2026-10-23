import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import { passwordRecord } from '../src/lib/security.mjs';
import { loadEnvFile } from 'node:process';
for (const envFile of ['.env.local', '.env']) {
  try {
    loadEnvFile(envFile);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}
const directory = path.resolve(process.env.DATA_DIR || '.data');
await mkdir(directory, { recursive: true });
const file = path.join(directory, 'admin.json');
let exists = false;
try {
  await readFile(file);
  exists = true;
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
if (exists && !process.argv.includes('--reset')) {
  console.log(
    'El administrador ya está configurado. Para restablecerlo: npm run admin:setup -- --reset',
  );
} else {
  const password = randomBytes(18).toString('base64url');
  await writeFile(
    file,
    JSON.stringify({ ...passwordRecord(password), secret: randomBytes(48).toString('hex') }),
    { mode: 0o600 },
  );
  const accessFile = path.join(directory, 'admin-access.txt');
  await writeFile(
    accessFile,
    `OCAMPO WORLDS — ACCESO LOCAL\n\nPanel: /admin\nContraseña: ${password}\n\nArchivo privado, excluido de Git. Puedes cambiar la contraseña desde el panel.\nAl cambiarla, este acceso inicial dejará de funcionar.\n`,
    { mode: 0o600 },
  );
  console.log(`Administrador configurado. La contraseña está en: ${accessFile}`);
}
