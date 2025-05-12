import Menu from "../components/Menu";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-screen min-h-screen bg-lighter dark:bg-darker transition-colors duration-300">
      {/* Menú (se sobrepondrá) */}
      <div className="fixed top-0 left-0 z-50">
        <Menu />
      </div>
    </main>
  );
}