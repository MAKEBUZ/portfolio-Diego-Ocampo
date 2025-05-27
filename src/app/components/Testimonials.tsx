'use client'

import { useState, useEffect } from 'react';

interface Testimonio {
  autor: string;
  texto: string;
}

const testimonios: Testimonio[] = [
  { autor: 'Tomas Benavides', texto: 'Un gran compañero muy dedicado en todos los ámbitos, es alguien que jamás te defraudará y siempre va a trabajar a tu lado apoyándote.' },
  { autor: 'Yoseph Ojeda', texto: 'Trabajar contigo es una experiencia enriquecedora. Tu compromiso y disposición hacen que cualquier proyecto avance con éxito.' },
  { autor: 'Kanekobo', texto: 'Un gran amigo, siempre dispuesto a escuchar y aportar. Su energía positiva y compañerismo hacen la diferencia en cualquier equipo' },
  { autor: 'Nicolas Vallejo', texto: 'Destaca por su profesionalismo, capacidad de organización y atención al detalle. Su aporte siempre es valioso y pertinente.' },
  { autor: 'River Bonilla', texto: 'Un colaborador comprometido que mantiene una actitud proactiva ante los retos. Su enfoque y dedicación inspiran al equipo.' },
  { autor: 'Danilo Montezuma', texto: 'Demuestra constancia, responsabilidad y habilidades que fortalecen cualquier grupo de trabajo. Siempre enfocado en los resultados.' },
  { autor: 'Javier Ordoñez', texto: 'Un compañero que aporta más allá de lo técnico, con ideas claras y una actitud siempre dispuesta a colaborar y construir.' },
  { autor: 'Juan Jose Burbano', texto: 'Una persona con visión, que no teme asumir responsabilidades. Su liderazgo y empatía lo convierten en un gran aliado' },
  { autor: 'Airlegend', texto: 'Siempre abierto al aprendizaje, aporta soluciones creativas y prácticas. Su presencia genera un ambiente de trabajo positivo.' },
  { autor: 'Danilo Montezuma', texto: 'Con iniciativa y sentido del compromiso, sabe adaptarse a diferentes escenarios y aportar desde su experiencia.' },
  { autor: 'Dylan Rodriguez', texto: 'Sabe escuchar, analizar y actuar con criterio. Su actitud profesional es clave en cualquier proyecto exitoso' },
  { autor: 'Andres Arango', texto: 'Su trabajo refleja pasión, inteligencia y capacidad de adaptación. Un compañero con quien siempre quieres contar.' },
  { autor: 'Antonio Parra', texto: 'Tiene la habilidad de trabajar en equipo sin perder el enfoque individual. Responsable, puntual y siempre dispuesto.' },
  { autor: 'Sebastian Ramos', texto: 'Aporta una combinación equilibrada de creatividad y disciplina. Su manera de trabajar motiva y ordena al equipo.' },
  { autor: 'Cristhian', texto: 'Su experiencia se nota en cada paso que da. Siempre con un consejo útil, una visión clara y una actitud colaborativa.' },
  { autor: 'ElAbueloFede', texto: 'Gran profesional y mejor persona. Siempre encuentra formas eficientes de resolver problemas y apoyar a los demás.' },
  { autor: 'Thiago Espindola', texto: 'Trabajar con él siempre ha sido una experiencia positiva. Tiene una actitud colaborativa, escucha activamente y se esfuerza por lograr resultados de calidad. Es de esas personas que elevan el nivel del equipo sin buscar protagonismo.' },
];

export default function Testimonials() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, [isDarkMode, isMounted]);

  return (
    <section className="h-full w-full flex flex-col items-center justify-center bitacora-bg p-2 md:p-6">
      <section className="w-full h-full">
        <section className="h-full overflow-y-auto testimonials-scroll grid [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] gap-6 md:gap-8 p-2 md:p-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-yellow-500/50 [&::-webkit-scrollbar-thumb]:rounded-full">
          {testimonios.map((testimonio, idx) => (
            <section
              key={idx}
              className="card-bg card-border border-4 rounded-2xl shadow-lg p-4 flex flex-col items-center justify-between transition-all duration-300 hover:scale-105 hover:shadow-2xl relative"
              style={{
                boxShadow: '0 0 16px 2px rgba(245, 158, 11, 0.15)', 
              }}
            >
              <h3 className="text-primary font-serif text-lg mb-2 text-center tracking-wide">
                {testimonio.autor}
              </h3>
              <p className="text-secondary text-sm text-center">
                {testimonio.texto}
              </p>
            </section>
          ))}
        </section>
      </section>
    </section>
  );
}
