"use client";

import React, { useState, useEffect } from "react";

const proyectos = [
  {
    id: 1,
    titulo: "Proyecto 1",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. En id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Laculis lacinia nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
    imagen: "https://i.imgur.com/4M34hi2.png",
    detalles: "Estos son los detalles del Proyecto 1.",
    link: "https://proyecto1.com",
    informacion: "Información adicional sobre el Proyecto 1.",
    avatar: "https://i.imgur.com/4M34hi2.png",
  },
  {
    id: 2,
    titulo: "Proyecto 2",
    descripcion:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imagen: "https://i.imgur.com/2nCt3Sbl.jpg",
    detalles: "Estos son los detalles del Proyecto 2.",
    link: "https://proyecto2.com",
    informacion: "Información adicional sobre el Proyecto 2.",
    avatar: "https://i.imgur.com/2nCt3Sbl.jpg",
  },
];

const opciones = [
  { key: "detalles", label: "Detalles" },
  { key: "link", label: "Link" },
  { key: "informacion", label: "Información" },
];

function StarBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-30 animate-pulse"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: `blur(${Math.random() * 1.5}px)`
          }}
        />
      ))}
    </div>
  );
}

export default function ProjectsPreview() {
  const [proyectoActual, setProyectoActual] = useState(proyectos[0]);
  const [opcionActual, setOpcionActual] = useState("detalles");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode(); // Verificar estado inicial
    
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
            <a
              href={proyectoActual.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-yellow-300 hover:text-yellow-200'} underline text-xl mt-4 block transition`}
            >
              {proyectoActual.link}
            </a>
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
    <div className={`relative w-screen h-screen min-h-screen min-w-full flex flex-col items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-blue-950 to-blue-800' : 'bg-gradient-to-br from-yellow-950 to-yellow-800'} overflow-hidden`}>
      <StarBackground />
      <div className={`fixed top-0 left-0 w-full flex items-center justify-center gap-3 py-4 z-20 ${isDarkMode ? 'bg-blue-900/40' : 'bg-yellow-900/40'} backdrop-blur-md shadow-md`}>
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
            <img
              src={proy.avatar}
              alt={proy.titulo}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      <div className="flex flex-row items-start justify-center w-full max-w-6xl z-10 gap-8">
        <div className="flex flex-col gap-2 min-w-[150px] mt-2 select-none">
          {opciones.map((op) => (
            <button
              key={op.key}
              onClick={() => setOpcionActual(op.key)}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg font-semibold transition-all duration-150 focus:outline-none text-left ${isDarkMode ? 'text-blue-100' : 'text-yellow-100'} text-base tracking-wide group ${
                opcionActual === op.key
                  ? `${isDarkMode ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-gradient-to-r from-yellow-500 to-yellow-400'} text-white shadow-lg`
                  : `${isDarkMode ? 'hover:bg-blue-700/80' : 'hover:bg-yellow-700/80'} hover:text-white`
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                opcionActual === op.key
                  ? 'bg-white'
                  : isDarkMode ? 'bg-blue-400' : 'bg-yellow-400'
              }`}></span>
              {op.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center flex-shrink-0">
          <div className={`w-200 h-100 bg-white rounded-[30px_80px_30px_80px/40px_30px_80px_30px] overflow-hidden shadow-xl border-4 ${isDarkMode ? 'border-blue-300' : 'border-yellow-300'} relative`}>
            <img
              src={proyectoActual.imagen}
              alt={proyectoActual.titulo}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 to-transparent" />
          </div>
        </div>

        <div className={`flex flex-col justify-start text-left max-w-md mt-2 min-h-[450px] min-w-[350px] h-[280px] w-[350px] overflow-auto transition-all duration-300 scrollbar-thin ${isDarkMode ? 'scrollbar-thumb-blue-400 scrollbar-track-blue-900/30' : 'scrollbar-thumb-yellow-400 scrollbar-track-yellow-900/30'} scrollbar-thumb-rounded-full scrollbar-track-rounded-full`}>
          {getContenido()}
        </div>
      </div>
    </div>
  );
}
