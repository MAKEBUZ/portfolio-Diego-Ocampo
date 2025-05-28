'use client';

import { useState, useEffect, JSX } from 'react';
import { FaUser, FaFileAlt, FaGamepad } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import Image from 'next/image';

type TabId = 'sobre-mi' | 'cv' | 'pasatiempos';

interface TabOption {
  id: TabId;
  label: string;
  colorClass: string;
  icon: JSX.Element;
}

interface AvatarProps {
  src: string;
  alt: string;
  selected: boolean;
  onClick?: () => void;
}

interface HobbyProps {
  title: string;
  image: string;
}

const Avatar = ({ src, alt, selected, onClick }: AvatarProps) => (
  <section 
    className={`rounded-full border-4 ${selected ? 'avatar-border-active shadow-lg' : 'avatar-border-inactive'} overflow-hidden cursor-pointer hover:border-amber-400 transition-all`}
    onClick={onClick}
  >
    <Image src={src} alt={alt} width={200} height={200} className="w-full h-full object-cover" />
  </section>
);

const HobbyCard = ({ title, image, onClick }: HobbyProps & { onClick: () => void }) => (
  <section 
    className="relative overflow-hidden rounded-lg md:rounded-full shadow-md hover:shadow-xl cursor-pointer transition-all duration-300"
    onClick={onClick}
  >
    <Image src={image} alt={title} width={200} height={150} className="w-full h-32 object-cover" />
  </section>
);

export default function Bitacora() {
  const [activeTab, setActiveTab] = useState<TabId>('sobre-mi');
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [selectedHobby, setSelectedHobby] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) as TabId;
      if (hash && ['sobre-mi', 'cv', 'pasatiempos'].includes(hash)) {
        setActiveTab(hash);
        setIsMobileMenuOpen(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.toggle('dark', isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, isMounted]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv-diego-ocampo.pdf';
    link.download = 'CV_Diego_Ocampo.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const tabs: TabOption[] = [
    { 
      id: 'sobre-mi', 
      label: 'Sobre Mí', 
      colorClass: 'tab-sobre-mi',
      icon: <FaUser className="text-xl" />
    },
    { 
      id: 'cv', 
      label: 'CV', 
      colorClass: 'tab-cv',
      icon: <FaFileAlt className="text-xl" />
    },
    { 
      id: 'pasatiempos', 
      label: 'Pasatiempos', 
      colorClass: 'tab-pasatiempos',
      icon: <FaGamepad className="text-xl" />
    }
  ];
  
  const avatars = [
    '/images/avatars/avatar1.jpg',
    '/images/avatars/avatar2.jpg',
    '/images/avatars/avatar3.jpg'
  ];

  const hobbies = [
    { 
      title: 'Lectura', 
      image: '/images/hobbies/lectura.jpg', 
      bannerImage: '/images/hobbies/lectura-banner.png',
      description: 'Me encanta leer, sobre todo Novelas y Manwhas Coreanos, Novelas y Manhuas Chinos y Novelas y Mangas Japoneses, me gusta mucho el romance, la acción y el drama.' 
    },
    { 
      title: 'Fotografía', 
      image: '/images/hobbies/foto.jpg', 
      bannerImage: '/images/hobbies/foto-banner.jpg',
      description: 'Me encanta la fotografia, sobre todo la fotografia de paisajes y la fotografia de retrato, me fascina la fotografia nocturna y sobre todo del extenso mar de nubes' 
    },
    { 
      title: 'Colección de Mangas, Figuras y Albunes', 
      image: '/images/hobbies/coleccion.jpg', 
      bannerImage: '/images/hobbies/coleccion-banner.jpg',
      description: 'Me encanta coleccionar figuras de anime, mangas, videojuegos y albunes de musica, me encanta ver los detalles de cada figura y manga, y escuchar la musica de los albunes de musica.' 
    },
    { 
      title: 'Videojuegos', 
      image: '/images/hobbies/videojuegos.png', 
      bannerImage: '/images/hobbies/videojuegos-banner.png',
      description: 'Los videojuegos son una de las cosas que mas me gustan, me encanta jugar a los videojuegos y sobre todo a los videojuegos RPG y sus derivados, me encanta sobre todo el estilo de juegos anime. Tambies los juegos de deportes como MotoGP, Formula 1 y Rocket League' 
    },
    { 
      title: 'Musica', 
      image: '/images/hobbies/musica_.jpg', 
      bannerImage: '/images/hobbies/musica-banner.png',
      description: 'Me encanta la musica y sobre todo de la decada del 2010 y en Japones. La musica es una parte muy importante de mi día a día.' 
    },
    { 
      title: 'Series y Peliculas', 
      image: '/images/hobbies/peliculas.jpg', 
      bannerImage: '/images/hobbies/peliculas-banner.jpg',
      description: 'Una de mis cosas favoritas por mas que actualmente sea cada vez menos constante, es ver series y peliculas, me encanta el drama y el romance. Sobretodo las series como el Anime, Kdramas, Manga y Peliculas del Espacio o el Universo' 
    },
    { 
      title: 'Formula 1', 
      image: '/images/hobbies/f1.png', 
      bannerImage: '/images/hobbies/f1-banner.jpg',
      description: 'El deporte que mas me apasiona seguir es la Formula 1, me encanta ver las carreras y los pilotos, me encanta el estilo de los coches y la tecnologia que se utiliza en la Formula 1, me encanta su historia y su evolucion. Soy fanatico de Max Verstappen, Colapinto, Schumacher, Hamilton y Checo Perez' 
    },
    { 
      title: 'Astrofisica y Astronomia', 
      image: '/images/hobbies/astrofisica.jpg', 
      bannerImage: '/images/hobbies/astrofisica-banner.jpg',
      description: 'La astrofisica y la astronomia son dos de mis cosas favoritas, me encanta aprender sobre el universo y la fisica, me encanta aprender sobre los planetas, estrellas, galaxias y el espacio. Me apasiona investigar sobre la teoria de la relatividad y la teoria de la cuantica.'
    }
  ];
  
  const userName = "Diego Alejandro Ocampo";
  
  const getContent = (tabId: TabId) => {
    switch (tabId) {
      case 'sobre-mi':
        return (
          <section className="flex flex-col md:flex-row h-full">
            <section className="w-full md:w-1/3 flex flex-col items-center justify-start p-4 md:p-6 border-b-2 md:border-b-0 md:border-r-2 card-border">
              <section className="w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-6">
                <Avatar 
                  src={avatars[selectedAvatar]} 
                  alt="Avatar principal" 
                  selected={true} 
                />
              </section>
              <section className="text-center space-y-2 md:space-y-4">
                <h3 className="text-primary font-serif text-lg md:text-xl mt-5 md:mt-9">Programador</h3>
                <section className="text-xs md:text-sm text-secondary">
                  Soy Diego Alejandro Ocampo, tengo 20 años, soy de Colombia, me gusta mucho la programacion y la tecnologia.
                </section>
                <section className="flex justify-center space-x-2 mt-2 md:mt-4">
                  {avatars.map((avatar, index) => (
                    <section key={index} className="w-12 h-12 md:w-22 md:h-22" onClick={() => setSelectedAvatar(index)}>
                      <Avatar 
                        src={avatar} 
                        alt={`Avatar ${index}`} 
                        selected={selectedAvatar === index} 
                      />
                    </section>
                  ))}
                </section>
              </section>
            </section>
            
            <section className="w-full md:w-2/3 p-4 md:p-6 overflow-y-auto">
              <section className="space-y-3 md:space-y-4">
                <section className="w-full">
                  <section className="card-bg p-3 md:p-4 rounded-lg border-2 card-border shadow-inner">
                    <Image src="/images/main-banner.jpg" alt="Banner" width={600} height={150} className="w-full h-24 md:h-32 object-cover rounded" />
                    <section className="text-xs text-secondary mt-1 md:mt-2 italic">
                      
                    </section>
                  </section>
                </section>
                
                <section className="prose max-w-none">
                  <p className="text-primary text-sm md:text-base first-letter:text-2xl md:first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-1">
                    Actualmente estoy estudiando programacion en la Universidad Cooperativa de Colombia, me gusta mucho el desarrollo web y el desarrollo de videojuegos.
                  </p>
                  <p className="text-primary text-sm md:text-base py-2">
                    Curso el 5to semestre de la carrera de Ingenieria de Software, una parte de la programacion que me gusta es la programacion orientada a objetos y la aplicabilidad de esta en el desarrollo de videojuegos.
                  </p>
                  <p className="text-primary text-sm md:text-base py-2">
                    La programacion es una parte muy importante de mi vida, junto a la astrofisica, son mis dos puntos mas algidos de mi vida, en donde me decidi a estudiar programacion y seguir de cerca la astrofisica.
                  </p>
                  <p className="text-primary text-sm md:text-base py-2">
                    Cuando termine la carrera, me gustaria trabajar en una empresa de desarrollo de videojuegos, o en intentar fundar mi propia empresa de desarrollo de videojuegos. Mientras tanto, me gustaria seguir estudiando y mejorando mis habilidades en la programacion.
                  </p>
                </section>
              </section>
            </section>
          </section>
        );
      case 'cv':
        return (
          <section className="flex flex-col md:flex-row h-full">
            <section className="w-full md:w-1/3 flex flex-col items-center justify-start p-4 md:p-6 border-b-2 md:border-b-0 md:border-r-2 card-border">
              <section className="w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-6">
                <Avatar 
                  src={avatars[selectedAvatar]} 
                  alt="Avatar principal" 
                  selected={true} 
                />
              </section>
              <section className="text-center space-y-2 md:space-y-4">
                <h3 className="text-primary font-serif text-lg md:text-xl mt-5 md:mt-9">Programador</h3>
                <section className="text-xs md:text-sm text-secondary">
                  Soy Diego Alejandro Ocampo, tengo 20 años, soy de Colombia, me gusta mucho la programacion y la tecnologia.
                </section>
                <section className="mt-2 md:mt-4 text-primary text-sm md:text-base font-semibold">
                  Contacto: daom3456@gmail.com
                </section>
              </section>
            </section>
            
            <section className="w-full md:w-2/3 p-4 md:p-6 overflow-y-auto">
              <h3 className="text-lg md:text-xl font-serif text-primary border-b-2 border-amber-300 pb-2 mb-4 md:mb-6">Curriculum Vitae</h3>
              
              <section className="space-y-4 md:space-y-6">
                <section className="card-bg p-3 md:p-4 rounded-lg border-2 card-border shadow-inner">
                  <h4 className="font-medium text-primary text-sm md:text-base">Resumen Profesional</h4>
                  <p className="text-secondary mt-1 md:mt-2 text-xs md:text-sm">
                    Estudiante iniciando el 5to semestre en ingeniería en software con habilidades en desarrollo frontend, desarrollo en diferentes tecnologías (Vue, React, Next, Springboot, entre otros) y múltiples lenguajes de programación como Typescript, Java, Python, C#, entre otros, participación en hackathon Pasto, destacado por participación en proyectos de inteligencia artificial, además cuenta con habilidades en la resolución de conflictos y trabajo en equipo durante proyectos universitarios.
                  </p>
                </section>
                
                <section className="card-bg p-3 md:p-4 rounded-lg border-2 card-border shadow-inner">
                  <h4 className="font-medium text-primary text-sm md:text-base">Programas y habilidades</h4>
                  <p className="text-secondary mt-1 md:mt-2 text-xs md:text-sm">
                    Desarrollo en múltiples frameworks y lenguajes de programación.
                    Manejo de nivel intermedio de Ingles, Honestidad, habilidades asertivas como lo son el respeto, saber escuchar, dar mi opinión de manera adecuada, de la misma manera una alta capacidad sobre la resolución de conflictos y un adecuado trabajo en equipo.
                  </p>
                </section>
                
                <section className="card-bg p-3 md:p-4 rounded-lg border-2 card-border shadow-inner">
                  <h4 className="font-medium text-primary text-sm md:text-base">Cursos y certificaciones</h4>
                  <p className="text-secondary mt-1 md:mt-2 text-xs md:text-sm">
                    2024	Certificación de participación en Hackathon	- ParqueSoft (Nariño) y ConeXSurTic (Nariño)
                  </p>
                </section>

                <section className="card-bg p-3 md:p-4 rounded-lg border-2 card-border shadow-inner">
                  <h4 className="font-medium text-primary text-sm md:text-base">Experiencia laboral</h4>
                  <p className="text-secondary mt-1 md:mt-2 text-xs md:text-sm">
                    2024 Hackaton - 
                    Colaborador en Desarrollo de FrontEnd y BackEnd
                    En la Hackathon diciembre 2024 por ConeXSurTic y ParqueSoft (Nariño) Concurso de Innovación para Arenas Digitales se me dio la oportunidad de desarrollar una solución tecnológica en equipos para un problema propuesto por la misma organización, en donde debíamos entregar un producto mínimo viable desarrollado durante 48 horas, en la que haríamos uso de Inteligencia Artificial para complementar las necesidades propuestas
                  </p>
                </section>
              </section>
            </section>
          </section>
        );
      case 'pasatiempos':
        return (
          <section className="flex flex-col md:flex-row h-full">
            <section className="w-full md:w-1/3 p-4 md:p-6 border-b-2 md:border-b-0 md:border-r-2 card-border overflow-y-auto">
              <h3 className="text-primary font-serif text-base md:text-lg mb-3 md:mb-4">Mis Pasatiempos</h3>
              <section className="grid grid-cols-2 gap-3 md:gap-4">
                {hobbies.map((hobby, index) => (
                  <HobbyCard 
                    key={index}
                    title={hobby.title}
                    image={hobby.image}
                    onClick={() => setSelectedHobby(index)}
                  />
                ))}
              </section>
            </section>
            
            <section className="w-full md:w-2/3 p-4 md:p-6 overflow-y-auto">
              {selectedHobby !== null ? (
                <>
                  <section className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-0 flex flex-col justify-center items-center p-2 animate-fade-in">
                    <section className="bg-dark card-bg rounded-lg shadow-2xl w-full max-w-md mx-auto overflow-y-auto">
                      <section className="flex items-center mb-3 md:mb-4 p-4">
                        <h3 className="text-lg md:text-xl font-serif text-primary">{hobbies[selectedHobby].title}</h3>
                        <section className="ml-auto">
                          <button 
                            className="text-accent hover:text-accent-dark text-lg"
                            onClick={() => setSelectedHobby(null)}
                          >
                            ✖
                          </button>
                        </section>
                      </section>
                      <Image 
                        src={hobbies[selectedHobby].bannerImage} 
                        alt={hobbies[selectedHobby].title} 
                        width={200} 
                        height={150} 
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                      />
                      <section className="card-bg p-3 rounded-lg border-2 card-border shadow-inner">
                        <p className="text-primary text-sm">
                          {hobbies[selectedHobby].description}
                        </p>
                      </section>
                    </section>
                  </section>
                  <section className="hidden md:block space-y-3 md:space-y-4">
                    <section className="flex items-center mb-3 md:mb-4">
                      <h3 className="text-lg md:text-xl font-serif text-primary">{hobbies[selectedHobby].title}</h3>
                      <section className="ml-auto">
                        <button 
                          className="text-accent hover:text-accent-dark text-lg"
                          onClick={() => setSelectedHobby(null)}
                        >
                          ✖
                        </button>
                      </section>
                    </section>
                    <Image 
                      src={hobbies[selectedHobby].bannerImage} 
                      alt={hobbies[selectedHobby].title} 
                      width={200} 
                      height={150} 
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                    <section className="card-bg p-3 md:p-4 rounded-lg border-2 card-border shadow-inner">
                      <p className="text-primary text-base">
                        {hobbies[selectedHobby].description}
                      </p>
                    </section>
                  </section>
                </>
              ) : (
                <section className="flex flex-col items-center justify-center h-full text-secondary text-sm md:text-base">
                  <p>Selecciona un pasatiempo para ver su descripción</p>
                </section>
              )}
            </section>
          </section>
        );
      default:
        return <section className="p-4 md:p-6">Selecciona una opción del menú</section>;
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bitacora-bg p-2 md:p-4">
      <section className="w-full h-full max-w-5xl relative">
        <section className="md:hidden fixed top-4 right-4 z-50">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-800 text-white shadow-lg"
          >
            {isMobileMenuOpen ? '✖' : '☰'}
          </button>
        </section>
        
        <section className="flex flex-col md:flex-row h-[90vh] md:h-[700px]">
          {isMobileMenuOpen && (
            <section className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)}></section>
          )}
          
          <section className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 md:w-24 bg-gray-800 md:bg-transparent z-50 transition-transform duration-300 ease-in-out md:transition-none`}>
            <section className="flex flex-col space-y-2 p-2 md:pr-2 h-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                    window.location.hash = tab.id;
                  }}
                  className={`p-3 rounded-lg md:rounded-l-lg text-light text-left tab-transition flex flex-col items-center ${tab.colorClass} ${activeTab === tab.id ? 'tab-active' : 'opacity-80 hover:opacity-100'}`}
                >
                  <span className="mb-1">{tab.icon}</span>
                  <span className="text-xs">{tab.label}</span>
                </button>
              ))}
            </section>
          </section>
          
          <section className="w-full md:w-[calc(100%-6rem)] h-full book-bg rounded-lg shadow-xl flex flex-col overflow-hidden book-edge border-4 md:border-8 relative book-shadow book-texture">
            <section className="absolute top-0 left-0 w-full h-4 accent-light-bg opacity-30"></section>
            <section className="absolute top-0 left-0 w-1 h-full book-edge opacity-30"></section>
            <section className="absolute top-0 right-0 w-1 h-full bg-black opacity-10"></section>
            
            <section className="card-bg p-3 md:p-4 border-b-2 card-border">
              <h2 className="text-xl md:text-2xl text-center text-primary font-serif tracking-wider">{userName}</h2>
            </section>
            
            <section className="flex-grow card-bg overflow-hidden">
              {getContent(activeTab)}
            </section>
            
            {activeTab === 'cv' && (
              <section className="card-bg p-2 md:p-3 border-t-2 card-border flex justify-end">
                <button 
                  onClick={handleDownloadCV}
                  className={`px-4 py-1 md:px-6 md:py-2 rounded-md text-xs md:text-sm hover:button-hover flex items-center shadow-md transition-all transform hover:translate-y-[-2px] ${
                    isDarkMode 
                      ? 'bg-white text-gray-800 hover:bg-gray-100' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  <FiDownload className="mr-1 md:mr-2" />
                  Descargar CV (PDF)
                </button>
              </section>
            )}
          </section>
        </section>
      </section>
    </section>
  );
}