export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between w-screen min-h-screen bg-lighter p-8">
      <h1 className="text-darker text-3xl font-bold mb-8">Paleta de Colores</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Primary */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="h-32 bg-[hsl(var(--primary))]"></div>
          <div className="p-4 bg-white">
            <h3 className="font-semibold">Primary</h3>
            <p className="text-sm text-gray-600">HSL: 289 58% 59%</p>
          </div>
        </div>

        {/* Secondary */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="h-32 bg-[hsl(var(--secondary))]"></div>
          <div className="p-4 bg-white">
            <h3 className="font-semibold">Secondary</h3>
            <p className="text-sm text-gray-600">HSL: 289 49% 46%</p>
          </div>
        </div>

        {/* Tertiary */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="h-32 bg-[hsl(var(--tertiary))]"></div>
          <div className="p-4 bg-white">
            <h3 className="font-semibold">Tertiary</h3>
            <p className="text-sm text-gray-600">HSL: 293 49% 41%</p>
          </div>
        </div>

        {/* Quaternary */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="h-32 bg-[hsl(var(--quaternary))]"></div>
          <div className="p-4 bg-white">
            <h3 className="font-semibold">Quaternary</h3>
            <p className="text-sm text-gray-600">HSL: 311 49% 31%</p>
          </div>
        </div>

        {/* Light */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="h-32 bg-[hsl(var(--light))]"></div>
          <div className="p-4 bg-white">
            <h3 className="font-semibold">Light</h3>
            <p className="text-sm text-gray-600">HSL: 300 94% 98%</p>
          </div>
        </div>

        {/* Lighter */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="h-32 bg-[hsl(var(--lighter))]"></div>
          <div className="p-4 bg-white">
            <h3 className="font-semibold">Lighter</h3>
            <p className="text-sm text-gray-600">HSL: 300 91% 96%</p>
          </div>
        </div>

        {/* Muted */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="h-32 bg-[hsl(var(--muted))]"></div>
          <div className="p-4 bg-white">
            <h3 className="font-semibold">Muted</h3>
            <p className="text-sm text-gray-600">HSL: 297 83% 92%</p>
          </div>
        </div>

        {/* Soft */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="h-32 bg-[hsl(var(--soft))]"></div>
          <div className="p-4 bg-white">
            <h3 className="font-semibold">Soft</h3>
            <p className="text-sm text-gray-600">HSL: 295 73% 84%</p>
          </div>
        </div>

        {/* Accent */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="h-32 bg-[hsl(var(--accent))]"></div>
          <div className="p-4 bg-white">
            <h3 className="font-semibold">Accent</h3>
            <p className="text-sm text-gray-600">HSL: 293 71% 72%</p>
          </div>
        </div>

        {/* Dark */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="h-32 bg-[hsl(var(--dark))]"></div>
          <div className="p-4 bg-white">
            <h3 className="font-semibold">Dark</h3>
            <p className="text-sm text-gray-600">HSL: 311 46% 27%</p>
          </div>
        </div>

        {/* Darker */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="h-32 bg-[hsl(var(--darker))]"></div>
          <div className="p-4 bg-white">
            <h3 className="font-semibold">Darker</h3>
            <p className="text-sm text-gray-600">HSL: 311 61% 14%</p>
          </div>
        </div>
      </div>
      
      <footer className="mt-12 text-dark">
        <p className="font-medium">Diego Alejandro Ocampo Madroñero</p>
      </footer>
    </main>
  );
}