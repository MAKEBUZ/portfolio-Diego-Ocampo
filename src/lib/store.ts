import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { seed } from './seed';
import type { Content } from './types';

export const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), '.data');
export async function readContent(): Promise<Content> {
  try {
    return JSON.parse(await readFile(path.join(DATA_DIR, 'content.json'), 'utf8'));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return structuredClone(seed);
    throw error;
  }
}
export async function atomicWrite(file: string, value: unknown) {
  await mkdir(DATA_DIR, { recursive: true });
  const temporary = path.join(DATA_DIR, `${file}.${randomUUID()}.tmp`);
  await writeFile(temporary, JSON.stringify(value, null, 2), { mode: 0o600 });
  await rename(temporary, path.join(DATA_DIR, file));
}
let pending: Promise<unknown> = Promise.resolve();
export function saveContent(content: Content): Promise<Content> {
  const operation = pending.then(async () => {
    const current = await readContent();
    if (current.version !== content.version) throw new Error('CONFLICT');
    const updated = { ...content, version: current.version + 1 };
    await atomicWrite('content.json', updated);
    return updated;
  });
  pending = operation.catch(() => undefined);
  return operation;
}
