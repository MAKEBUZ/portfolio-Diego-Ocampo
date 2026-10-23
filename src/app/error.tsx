'use client';
import Link from 'next/link';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="status-page">
      <div className="status-card">
        <span className="eyebrow">ALGO NO SALIÓ COMO ESPERÁBAMOS</span>
        <h1>No pudimos cargar el portafolio.</h1>
        <p>Inténtalo de nuevo en un momento.</p>
        <button className="button button-gold" onClick={reset}>
          Volver a intentar
        </button>
        <Link href="/" className="text-button">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
