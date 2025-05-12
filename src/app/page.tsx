import Menu from "./components/Menu";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-screen min-h-screen bg-lighter dark:bg-darker transition-colors duration-300">
      {/* Cuadrado indicador del tema */}
      <div className="theme-indicator rounded-lg flex items-center justify-center shadow-xl">
        <p className="text-xl font-bold dark:text-white text-gray-800">
          Modo: <span className="dark:text-yellow-300 text-blue-600">
            {typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'Oscuro' : 'Claro'}
          </span>
        </p>
      </div>
      
      {/* Menú (se sobrepondrá) */}
      <div className="fixed top-0 left-0 z-50">
        <Menu />
      </div>
    </main>
  );
}