import Menu from "../components/Menu";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-lighter dark:bg-darker transition-colors duration-300">
        <Projects />
      <section className="fixed left-0 bottom-0 z-50">
        <Menu />
      </section>
    </main>
  );
}