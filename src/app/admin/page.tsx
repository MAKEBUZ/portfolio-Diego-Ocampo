import Admin from './Admin';
import './admin.css';
import { isAdmin, credentials } from '@/lib/auth';
import { readContent } from '@/lib/store';
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Administración · Diego Ocampo',
  robots: { index: false, follow: false },
};
export default async function AdminPage() {
  return (
    <Admin
      initialContent={(await isAdmin()) ? await readContent() : null}
      configured={Boolean(await credentials())}
    />
  );
}
