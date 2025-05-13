import Menu from "../components/Menu";
import Bitacora from "../components/Bitacora";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-lighter dark:bg-darker transition-colors duration-300">
      <section className="w-full h-full">
        <Bitacora />
      </section>
      <div className="fixed top-0 left-0 z-50">
        <Menu />
      </div>
    </main>
  );
}