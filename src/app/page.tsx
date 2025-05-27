import HomeComponent from "./components/Home";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-screen min-h-screen bg-lighter dark:bg-darker transition-colors duration-300">
      <section className="h-max-screen w-full flex items-center justify-center">
        <HomeComponent />
      </section>
    </main>
  );
}