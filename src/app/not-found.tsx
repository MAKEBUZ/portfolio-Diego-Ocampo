import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="status-page">
      <div className="status-card">
        <span className="eyebrow">ERROR 404</span>
        <h1>Esta página no existe.</h1>
        <p>Puedes volver al portafolio para seguir explorando.</p>
        <Link className="button button-gold" href="/">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
