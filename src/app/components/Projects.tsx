"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const proyectos = [
  {
    id: 1,
    titulo: "Spotifyn't",
    descripcion:
      "Un reproductor de musica web, desplegado en vercel.",
    imagen: "/images/projects/proyecto1.png",
    detalles: "Con las funcionalidades de reproducir, pausar, siguiente y anterior, barra de progreso, cancion actual, cancion siguiente y cancion anterior. Lista de reproduccion, y cambio de orden de las canciones.",
    links: [
      { url: "https://estructuras-de-software.vercel.app/", nombre: "Despliegue" },
      { url: "https://github.com/MAKEBUZ/estructuras-de-software", nombre: "Repositorio" }
    ],
    informacion: "Desarrollado en Vue.js, con canciones locales.",
    avatar: "/images/projects/pa-1.png",
  },
  {
    id: 2,
    titulo: "Reloj",
    descripcion:
      "Reloj Analogico",
    imagen: "/images/projects/proyecto2.png",
    detalles: "Un Reloj Analogico, con las funcionalidades de horas, minutos y segundos.",
    links: [
      { url: "https://estructuras-reloj.vercel.app/", nombre: "Despliegue" },
      { url: "https://github.com/MAKEBUZ/Estructuras-Reloj", nombre: "Repositorio" }
    ],
    informacion: "Desarrollado en vue.js.",
    avatar: "/images/projects/pa-2.png",
  },
  {
    id: 3,
    titulo: "Cuaso Commerce",
    descripcion:
      "E-Commerce de ropa.",
    imagen: "/images/projects/proyecto3.png",
    detalles: "Un E-Commerce de ropa, con las funcionalidades de agregar productos al carrito, eliminar productos del carrito, y finalizar compra. filtrado por genero, talla y precio. COn descuentos y panel de pedidos tanto para cliente como para administrador.",
    links: [
      { url: "https://github.com/MAKEBUZ/Proyecto-Final-Estructuras", nombre: "Repositorio" }
    ],
    informacion: "Desarrollado en vue.js y con typescript.",
    avatar: "/images/projects/pa-3.png",
  },
  {
    id: 4,
    titulo: "Spice-Umami",
    descripcion:
      "Spice & Umami es una página web que combina Next.js en el frontend con una API para la búsqueda de recetas, información nutricional e ingredientes. Además, cuenta con un chatbot basado en IA (Mistral) que recomienda recetas y productos según la temporada en la que preguntes.",
    imagen: "/images/projects/proyecto4.png",
    detalles: "",
    links: [
      { url: "https://spice-umami.vercel.app/", nombre: "Despliegue" },
      { url: "https://github.com/MAKEBUZ/Spice_Umami", nombre: "Repositorio" }
    ],
    informacion: "Cuenta con Recomendaciones estacionales, Chatbot con IA (Mistral), Búsqueda avanzada, Interfaz moderna. Frontend: Next.js (React), API: Servicio externo para búsqueda de recetas, ingredientes y nutrición, Chatbot: Basado en Mistral, un potente modelo de inteligencia artificial para procesamiento del lenguaje natural",
    avatar: "/images/projects/pa-4.png",
  },
  {
    id: 5,
    titulo: "Interfaz F1",
    descripcion:
      "Trabajo con IA para interfaz de F1",
    imagen: "/images/projects/proyecto5.png",
    detalles: "Interfaz basica basada en F1",
    links: [
      { url: "https://trabajo-ia-f1.vercel.app/", nombre: "Despliegue" },
      { url: "https://github.com/MAKEBUZ/trabajo-ia-f1", nombre: "Repositorio" }
    ],
    informacion: "Desarrollada en Next.js, con V0",
    avatar: "/images/projects/pa-5.png",
  },
  {
    id: 6,
    titulo: "Interfaz Sencilla Tailwind",
    descripcion:
      "Pequeño proyecto de interfaces",
    imagen: "/images/projects/proyecto6.png",
    detalles: "",
    links: [
      { url: "https://examen-segundo-momento-interfaces.vercel.app/", nombre: "Despliegue" },
      { url: "https://github.com/MAKEBUZ/examen-segundo-momento", nombre: "Repositorio" }
    ],
    informacion: "Tailwind CSS y Next.js",
    avatar: "/images/projects/pa-6.png",
  },
  {
    id: 7,
    titulo: "Loginar",
    descripcion:
      "Loginar es una pagina web para la administracion de inventario, con IA, panel de administrador, panel de usuario, panel de rutas y mas.",
    imagen: "/images/projects/proyecto7.png",
    detalles: "",
    links: [
      { url: "https://loginar.vercel.app/", nombre: "Despliegue" },
      { url: "https://github.com/T0m4s1n/loginar", nombre: "Repositorio" }
    ],
    informacion: "Desarrollada en Vue.js para la Hackaton 2024, realizado por 3 personas.",
    avatar: "/images/projects/pa-7.png",
  },
  {
    id: 8,
    titulo: "Backend Reserva Autos",
    descripcion:
      "Backend para reserva de autos",
    imagen: "/images/projects/proyecto8.png",
    detalles: "Apartado de Clientes, Apartado de Reservas, Apartado de Autos, Apartado de Usuarios, Apartado de Estadisticas",
    links: [
      { url: "https://github.com/riverbonilla1504/final_sistemas_transaccionales", nombre: "Repositorio" }
    ],
    informacion: "Trabajo realizado en equipo por 3 personas. Backend desarrollado en java",
    avatar: "/images/projects/pa-8.png",
  },
  {
    id: 9,
    titulo: "Backend para Historial Clinico",
    descripcion:
      "Backend para DTO de historial clinico",
    imagen: "/images/projects/proyecto9.png",
    detalles: "Se utilizaron DTO para la transformacion de datos traidos desde otros microservicios y creacion del historial clinico",
    links: [
      { url: "https://github.com/riverbonilla1504/tallerfinalpoo", nombre: "Repositorio" }
    ],
    informacion: "Trabajo realizado en equipo por 4 personas. Backend desarrollado en java",
    avatar: "/images/projects/pa-8.png",
  },
  {
    id: 10,
    titulo: "Resolution",
    descripcion:
      "Web para hacer reclamos y solicitudes",
    imagen: "/images/projects/proyecto10.png",
    detalles: "",
    links: [
      { url: "https://white-sand-08e1fda0f.6.azurestaticapps.net/", nombre: "Despliegue" },
      { url: "https://github.com/MAKEBUZ/ISWElectiva110202-3-RepoFork", nombre: "Repositorio" }
    ],
    informacion: "Trabajo realizado en equipo por 2 personas. Backend con Django y Python, Front con tailwind y Next.js",
    avatar: "/images/projects/pa-10.png",
  },
  {
    id: 11,
    titulo: "Raccon The Game",
    descripcion:
      "Juego basico desarrollado en Java",
    imagen: "/images/projects/proyecto11.png",
    detalles: "",
    links: [
      { url: "https://github.com/MAKEBUZ/Racoon-The-Game", nombre: "Repositorio" }
    ],
    informacion: "Juego desarrollado completamente en Java puro",
    avatar: "/images/projects/pa-11.png",
  },
  {
    id: 12,
    titulo: "Character-Customizer",
    descripcion:
      "Juego basico desarrollado en Unity",
    imagen: "/images/projects/proyecto12.png",
    detalles: "",
    links: [
      { url: "https://github.com/MAKEBUZ/Patrones-de-software", nombre: "Repositorio" },
    ],
    informacion: "Juego desarrollado completamente C# - Unity",
    avatar: "/images/projects/pa-12.png",
  },
];

const opciones = [
  { key: "detalles", label: "Detalles" },
  { key: "link", label: "Link" },
  { key: "informacion", label: "Información" },
];

function StarBackground() {
  const [stars, setStars] = useState<Array<{
    width: number;
    height: number;
    top: number;
    left: number;
    filter: number;
  }>>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 80 }, () => ({
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      filter: Math.random() * 1.5
    }));
    setStars(newStars);
  }, []);

  return (
    <section className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {stars.map((star, i) => (
        <section
          key={i}
          className="absolute rounded-full bg-white opacity-30 animate-pulse"
          style={{
            width: `${star.width}px`,
            height: `${star.height}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            filter: `blur(${star.filter}px)`
          }}
        />
      ))}
    </section>
  );
}

export default function ProjectsPreview() {
  const [proyectoActual, setProyectoActual] = useState(proyectos[0]);
  const [opcionActual, setOpcionActual] = useState("detalles");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const getContenido = () => {
    switch (opcionActual) {
      case "detalles":
        return (
          <>
            <h2 className={`text-3xl font-bold text-white mb-2 border-b-2 ${isDarkMode ? 'border-blue-400/60' : 'border-yellow-400/60'} pb-2 drop-shadow-lg`}>
              {proyectoActual.titulo}
            </h2>
            <p className={`${isDarkMode ? 'text-blue-100' : 'text-yellow-100'} text-base mb-4 leading-relaxed font-medium drop-shadow`}>
              {proyectoActual.descripcion}
            </p>
            <p className={`${isDarkMode ? 'text-blue-100' : 'text-yellow-100'} text-base leading-relaxed mt-2`}>
              {proyectoActual.detalles}
            </p>
          </>
        );
      case "link":
        return (
          <>
            <h2 className={`text-3xl font-bold text-white mb-2 border-b-2 ${isDarkMode ? 'border-blue-400/60' : 'border-yellow-400/60'} pb-2 drop-shadow-lg`}>
              {proyectoActual.titulo}
            </h2>
            <section className="flex flex-col gap-2 mt-2">
              {proyectoActual.links && proyectoActual.links.map((enlace, idx) => (
                <a
                  key={idx}
                  href={enlace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-semibold text-lg underline transition-colors duration-200
                    ${isDarkMode
                      ? 'text-blue-300 hover:text-blue-100'
                      : 'text-yellow-300 hover:text-yellow-100'}
                  `}
                >
                  {enlace.nombre}
                </a>
              ))}
            </section>
          </>
        );
      case "informacion":
        return (
          <>
            <h2 className={`text-3xl font-bold text-white mb-2 border-b-2 ${isDarkMode ? 'border-blue-400/60' : 'border-yellow-400/60'} pb-2 drop-shadow-lg`}>
              {proyectoActual.titulo}
            </h2>
            <p className={`${isDarkMode ? 'text-blue-100' : 'text-yellow-100'} text-base leading-relaxed mt-2`}>
              {proyectoActual.informacion}
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section className={`relative w-screen h-screen min-h-screen min-w-full flex flex-col items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-blue-950 to-blue-800' : 'bg-gradient-to-br from-yellow-950 to-yellow-800'} overflow-hidden`}>
      <StarBackground />
      <section className={`fixed top-0 left-0 w-full flex items-center justify-center py-4 z-20 ${isDarkMode ? 'bg-blue-900/40' : 'bg-yellow-900/40'} backdrop-blur-md shadow-md`}>
        <section className="md:hidden relative w-full max-w-[250px] mx-auto overflow-x-auto overflow-y-hidden scrollbar-hide h-[64px]">
          <section className="flex flex-row gap-3 px-4 h-full items-center" style={{ width: `${proyectos.length * 56}px` }}>
            {proyectos.map((proy) => (
              <button
                key={proy.id}
                onClick={() => setProyectoActual(proy)}
                className={`w-12 h-12 rounded-full border-4 transition-all duration-200 shadow-lg overflow-hidden ring-2 ring-white/30 backdrop-blur-md flex-shrink-0 ${
                  proyectoActual.id === proy.id
                    ? `${isDarkMode ? 'border-blue-400 bg-blue-900/60' : 'border-yellow-400 bg-yellow-900/60'} scale-110`
                    : `${isDarkMode ? 'border-blue-800 bg-blue-900/30' : 'border-yellow-800 bg-yellow-900/30'} opacity-70 hover:scale-105`
                }`}
              >
                <section className="relative w-full h-full">
                  <Image
                    src={proy.avatar}
                    alt={proy.titulo}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </section>
              </button>
            ))}
          </section>
        </section>

        <section className="hidden md:flex flex-row gap-3 justify-center items-center w-full max-w-6xl px-4">
          {proyectos.map((proy) => (
            <button
              key={proy.id}
              onClick={() => setProyectoActual(proy)}
              className={`w-14 h-14 rounded-full border-4 transition-all duration-200 shadow-lg overflow-hidden ring-2 ring-white/30 backdrop-blur-md ${
                proyectoActual.id === proy.id
                  ? `${isDarkMode ? 'border-blue-400 bg-blue-900/60' : 'border-yellow-400 bg-yellow-900/60'} scale-110`
                  : `${isDarkMode ? 'border-blue-800 bg-blue-900/30' : 'border-yellow-800 bg-yellow-900/30'} opacity-70 hover:scale-105`
              }`}
            >
              <section className="relative w-full h-full">
                <Image
                  src={proy.avatar}
                  alt={proy.titulo}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </section>
            </button>
          ))}
        </section>
      </section>

      <section className="flex flex-col md:flex-row items-center md:items-center justify-center w-full max-w-6xl z-10 gap-6 md:gap-12 px-2 md:px-0 mt-8 md:mt-0">
        <section className="flex flex-row md:flex-col gap-4 min-w-[180px] w-full md:w-[200px] justify-center md:justify-start mb-4 md:mb-0">
          {opciones.map((op) => (
            <button
              key={op.key}
              onClick={() => setOpcionActual(op.key)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl font-semibold transition-all duration-150 focus:outline-none text-left w-full md:w-auto text-base tracking-wide group relative
                ${isDarkMode ? 'text-blue-100' : 'text-yellow-100'}
                ${opcionActual === op.key
                  ? `${isDarkMode ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-gradient-to-r from-yellow-500 to-yellow-400'} text-white shadow-lg scale-105`
                  : `${isDarkMode ? 'hover:bg-blue-700/80' : 'hover:bg-yellow-700/80'} hover:text-white'}`}
              `}
            >
              <span className={`w-3 h-3 rounded-full flex-shrink-0 transition-colors duration-200
                ${opcionActual === op.key
                  ? isDarkMode ? 'bg-white' : 'bg-white'
                  : isDarkMode ? 'bg-blue-400' : 'bg-yellow-400'}
              `}></span>
              <span className="whitespace-nowrap">{op.label}</span>
            </button>
          ))}
        </section>

        <section className="flex flex-col items-center justify-center flex-shrink-0 w-full md:w-auto">
          <section className={`w-full max-w-[340px] aspect-[4/3] bg-white rounded-[30px_80px_30px_80px/40px_30px_80px_30px] overflow-hidden shadow-xl border-4 ${isDarkMode ? 'border-blue-300' : 'border-yellow-300'} relative md:w-[720px] md:h-[420px] md:max-w-none md:aspect-auto`}>
            <section className="relative w-full h-full min-h-[180px] md:min-h-0">
              <Image
                src={proyectoActual.imagen}
                alt={proyectoActual.titulo}
                fill
                className="object-cover w-full h-full rounded-[30px_80px_30px_80px/40px_30px_80px_30px]"
                sizes="(max-width: 520px) 100vw, 720px"
              />
              <section className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 to-transparent rounded-[30px_80px_30px_80px/40px_30px_80px_30px]" />
            </section>
          </section>
        </section>

        <section className={`flex flex-col justify-start text-left max-w-2xl mt-4 md:mt-2 min-h-[180px] min-w-[300px] h-auto w-full md:w-[520px] overflow-auto transition-all duration-300 scrollbar-thin ${isDarkMode ? 'scrollbar-thumb-blue-400 scrollbar-track-blue-900/30' : 'scrollbar-thumb-yellow-400 scrollbar-track-yellow-900/30'} scrollbar-thumb-rounded-full scrollbar-track-rounded-full bg-transparent p-4 md:p-8 rounded-xl`}>
          {getContenido()}
        </section>
      </section>
    </section>
  );
}
