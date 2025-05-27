import React, { useState } from "react";

const proyectos = [
  {
    nombre: "Proyecto 1",
    imagen: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    detalles: "Detalles del Proyecto 1...",
    link: "https://ejemplo.com/1",
    informacion: "Información adicional del Proyecto 1...",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    nombre: "Proyecto 2",
    imagen: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    detalles: "Detalles del Proyecto 2...",
    link: "https://ejemplo.com/2",
    informacion: "Información adicional del Proyecto 2...",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    nombre: "Proyecto 3",
    imagen: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    detalles: "Detalles del Proyecto 3...",
    link: "https://ejemplo.com/3",
    informacion: "Información adicional del Proyecto 3...",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const opciones = [
  { key: "detalles", label: "Detalles" },
  { key: "link", label: "Link" },
  { key: "informacion", label: "Informacion" },
];

export default function Projects() {
  const [proyectoIdx, setProyectoIdx] = useState(0);
  const [opcion, setOpcion] = useState("detalles");
  const proyecto = proyectos[proyectoIdx];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative">
      {/* Carrusel de avatares */}
      <div className="flex space-x-4 mb-8 mt-6">
        {proyectos.map((p, idx) => (
          <button
            key={p.nombre}
            onClick={() => setProyectoIdx(idx)}
            className={`w-16 h-16 rounded-full border-4 ${
              proyectoIdx === idx ? "border-yellow-400" : "border-transparent"
            } overflow-hidden shadow-lg transition-all duration-200`}
          >
            <img src={p.avatar} alt={p.nombre} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <div className="flex w-full max-w-5xl h-[400px] bg-white bg-opacity-10 rounded-2xl shadow-xl overflow-hidden">
        {/* Menú izquierdo */}
        <div className="flex flex-col justify-center items-start bg-white bg-opacity-5 px-6 py-8 min-w-[150px]">
          {opciones.map((op) => (
            <button
              key={op.key}
              onClick={() => setOpcion(op.key)}
              className={`mb-4 text-lg font-semibold text-left transition-colors duration-200 ${
                opcion === op.key ? "text-yellow-400" : "text-white hover:text-yellow-300"
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>

        {/* Imagen central */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={proyecto.imagen}
            alt={proyecto.nombre}
            className="rounded-3xl shadow-2xl max-h-72 object-contain border-4 border-white"
          />
        </div>

        {/* Información derecha */}
        <div className="flex flex-col justify-center items-start bg-white bg-opacity-5 px-8 py-8 min-w-[300px]">
          <h2 className="text-2xl font-bold text-white mb-4">{proyecto.nombre}</h2>
          {opcion === "detalles" && <p className="text-white/80">{proyecto.detalles}</p>}
          {opcion === "link" && (
            <a
              href={proyecto.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline"
            >
              {proyecto.link}
            </a>
          )}
          {opcion === "informacion" && <p className="text-white/80">{proyecto.informacion}</p>}
        </div>
      </div>
    </div>
  );
}
