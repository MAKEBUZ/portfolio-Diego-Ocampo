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
  description: string;
}

const Avatar = ({ src, alt, selected, onClick }: AvatarProps) => (
  <div 
    className={`rounded-full border-4 ${selected ? 'avatar-border-active shadow-lg' : 'avatar-border-inactive'} overflow-hidden cursor-pointer hover:border-amber-400 transition-all`}
    onClick={onClick}
  >
    <Image src={src} alt={alt} width={200} height={200} className="w-full h-full object-cover" />
  </div>
);

const HobbyCard = ({ title, image, onClick }: HobbyProps & { onClick: () => void }) => (
  <div 
    className="relative overflow-hidden rounded-lg md:rounded-full shadow-md hover:shadow-xl cursor-pointer transition-all duration-300"
    onClick={onClick}
  >
    <Image src={image} alt={title} width={200} height={150} className="w-full h-32 object-cover" />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-2">
      <h4 className="font-medium text-light">{title}</h4>
    </div>
  </div>
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

    // Manejar el hash de la URL al cargar
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
    '/api/placeholder/200/200',
    '/api/placeholder/200/200',
    '/api/placeholder/200/200'
  ];

  const hobbies = [
    { 
      title: 'Aventuras', 
      image: '/api/placeholder/200/150', 
      description: 'Exploro lugares desconocidos, desde montañas hasta cuevas submarinas. Me encanta la adrenalina y descubrir lo inexplorado.' 
    },
    { 
      title: 'Cartografía', 
      image: '/api/placeholder/200/150', 
      description: 'Dibujo mapas detallados de los lugares que visito. Cada mapa cuenta una historia única de descubrimiento.' 
    },
    { 
      title: 'Colección', 
      image: '/api/placeholder/200/150', 
      description: 'Colecciono artefactos antiguos y objetos peculiares de mis viajes. Cada objeto tiene una historia fascinante detrás.' 
    },
    { 
      title: 'Fotografía', 
      image: '/api/placeholder/200/150', 
      description: 'Capturo momentos únicos en mis viajes. Las fotografías son ventanas a recuerdos inolvidables.' 
    }
  ];
  
  const userName = "Diego Alejandro Ocampo";
  
  const getContent = (tabId: TabId) => {
    switch (tabId) {
      case 'sobre-mi':
        return (
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/3 flex flex-col items-center justify-start p-4 md:p-6 border-b-2 md:border-b-0 md:border-r-2 card-border">
              <div className="w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-6">
                <Avatar 
                  src={avatars[selectedAvatar]} 
                  alt="Avatar principal" 
                  selected={true} 
                />
              </div>
              <div className="text-center space-y-2 md:space-y-4">
                <h3 className="text-primary font-serif text-lg md:text-xl">Aventurero</h3>
                <div className="text-xs md:text-sm text-secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.
                </div>
                <div className="flex justify-center space-x-2 mt-2 md:mt-4">
                  {avatars.map((avatar, index) => (
                    <div key={index} className="w-6 h-6 md:w-8 md:h-8" onClick={() => setSelectedAvatar(index)}>
                      <Avatar 
                        src={avatar} 
                        alt={`Avatar ${index}`} 
                        selected={selectedAvatar === index} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 p-4 md:p-6 overflow-y-auto">
              <div className="space-y-3 md:space-y-4">
                <div className="w-full">
                  <div className="card-bg p-3 md:p-4 rounded-lg border-2 card-border shadow-inner">
                    <Image src="/api/placeholder/600/150" alt="Banner" width={600} height={150} className="w-full h-24 md:h-32 object-cover rounded" />
                    <div className="text-xs text-secondary mt-1 md:mt-2 italic">
                      &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.&quot;
                    </div>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-primary text-sm md:text-base first-letter:text-2xl md:first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
                  </p>
                  
                  <p className="text-primary text-sm md:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.
                  </p>
                  
                  <p className="text-primary text-sm md:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'cv':
        return (
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/3 flex flex-col items-center justify-start p-4 md:p-6 border-b-2 md:border-b-0 md:border-r-2 card-border">
              <div className="w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-6">
                <Avatar 
                  src={avatars[selectedAvatar]} 
                  alt="Avatar principal" 
                  selected={true} 
                />
              </div>
              <div className="text-center space-y-2 md:space-y-4">
                <h3 className="text-primary font-serif text-lg md:text-xl">Explorador</h3>
                <div className="text-xs md:text-sm text-secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque.
                </div>
                <div className="mt-2 md:mt-4 text-primary text-sm md:text-base font-semibold">
                  Contacto: aventurero@example.com
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 p-4 md:p-6 overflow-y-auto">
              <h3 className="text-lg md:text-xl font-serif text-primary border-b-2 border-amber-300 pb-2 mb-4 md:mb-6">Curriculum Vitae</h3>
              
              <div className="space-y-4 md:space-y-6">
                <div className="card-bg p-3 md:p-4 rounded-lg border-2 card-border shadow-inner">
                  <h4 className="font-medium text-primary text-sm md:text-base">Experiencia como Aventurero</h4>
                  <p className="text-secondary mt-1 md:mt-2 text-xs md:text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.
                  </p>
                </div>
                
                <div className="card-bg p-3 md:p-4 rounded-lg border-2 card-border shadow-inner">
                  <h4 className="font-medium text-primary text-sm md:text-base">Educación y Entrenamiento</h4>
                  <p className="text-secondary mt-1 md:mt-2 text-xs md:text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.
                  </p>
                </div>
                
                <div className="card-bg p-3 md:p-4 rounded-lg border-2 card-border shadow-inner">
                  <h4 className="font-medium text-primary text-sm md:text-base">Habilidades de Exploración</h4>
                  <p className="text-secondary mt-1 md:mt-2 text-xs md:text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'pasatiempos':
        return (
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/3 p-4 md:p-6 border-b-2 md:border-b-0 md:border-r-2 card-border overflow-y-auto">
              <h3 className="text-primary font-serif text-base md:text-lg mb-3 md:mb-4">Mis Pasatiempos</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {hobbies.map((hobby, index) => (
                  <HobbyCard 
                    key={index}
                    title={hobby.title}
                    image={hobby.image}
                    description={hobby.description}
                    onClick={() => setSelectedHobby(index)}
                  />
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-2/3 p-4 md:p-6 overflow-y-auto">
              {selectedHobby !== null ? (
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center mb-3 md:mb-4">
                    <h3 className="text-lg md:text-xl font-serif text-primary">{hobbies[selectedHobby].title}</h3>
                    <div className="ml-auto">
                      <button 
                        className="text-accent hover:text-accent-dark text-lg"
                        onClick={() => setSelectedHobby(null)}
                      >
                        ✖
                      </button>
                    </div>
                  </div>
                  
                  <Image 
                    src={hobbies[selectedHobby].image} 
                    alt={hobbies[selectedHobby].title} 
                    width={200} 
                    height={150} 
                    className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
                  />
                  
                  <div className="card-bg p-3 md:p-4 rounded-lg border-2 card-border shadow-inner">
                    <p className="text-primary text-sm md:text-base">
                      {hobbies[selectedHobby].description}
                    </p>
                    <p className="text-primary mt-2 md:mt-4 text-sm md:text-base">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu semper sed diam urna tempor.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-secondary text-sm md:text-base">
                  <div className="text-4xl md:text-6xl mb-3 md:mb-4">🏺</div>
                  <p>Selecciona un pasatiempo para ver su descripción</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return <div className="p-4 md:p-6">Selecciona una opción del menú</div>;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bitacora-bg p-2 md:p-4">
      <div className="w-full h-full max-w-5xl relative">
        {/* Mobile menu button */}
        <div className="md:hidden fixed top-4 right-4 z-50">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-800 text-white shadow-lg"
          >
            {isMobileMenuOpen ? '✖' : '☰'}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row h-[90vh] md:h-[700px]">
          {/* Tabs - Mobile (overlay) */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>
          )}
          
          <div className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 md:w-24 bg-gray-800 md:bg-transparent z-50 transition-transform duration-300 ease-in-out md:transition-none`}>
            <div className="flex flex-col space-y-2 p-2 md:pr-2 h-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                    // Actualizar el hash de la URL
                    window.location.hash = tab.id;
                  }}
                  className={`p-3 rounded-lg md:rounded-l-lg text-light text-left tab-transition flex flex-col items-center ${tab.colorClass} ${activeTab === tab.id ? 'tab-active' : 'opacity-80 hover:opacity-100'}`}
                >
                  <span className="mb-1">{tab.icon}</span>
                  <span className="text-xs">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-[calc(100%-6rem)] h-full book-bg rounded-lg shadow-xl flex flex-col overflow-hidden book-edge border-4 md:border-8 relative book-shadow book-texture">
            <div className="absolute top-0 left-0 w-full h-4 accent-light-bg opacity-30"></div>
            <div className="absolute top-0 left-0 w-1 h-full book-edge opacity-30"></div>
            <div className="absolute top-0 right-0 w-1 h-full bg-black opacity-10"></div>
            
            <div className="card-bg p-3 md:p-4 border-b-2 card-border">
              <h2 className="text-xl md:text-2xl text-center text-primary font-serif tracking-wider">{userName}</h2>
            </div>
            
            <div className="flex-grow card-bg overflow-hidden">
              {getContent(activeTab)}
            </div>
            
            {activeTab === 'cv' && (
              <div className="card-bg p-2 md:p-3 border-t-2 card-border flex justify-end">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}