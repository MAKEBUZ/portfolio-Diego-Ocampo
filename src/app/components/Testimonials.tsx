'use client'

import { useState, useEffect } from 'react';

interface Testimonio {
  autor: string;
  texto: string;
}

const testimonios: Testimonio[] = [
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
  { autor: 'Testimonio', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.' },
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
