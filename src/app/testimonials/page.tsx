import Menu from "../components/Menu";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-lighter dark:bg-darker transition-colors duration-300">
        <Testimonials />
      <section className="fixed top-0 left-0 z-50">
        <Menu />
      </section>
    </main>
  );
}