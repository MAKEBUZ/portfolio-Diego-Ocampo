import type { Content } from './types';
import projects from './projects.json';
export const seed: Content = {
  version: 1,
  profile: {
    name: 'Diego Ocampo',
    role: 'Desarrollador de software',
    intro: 'Me gusta construir cosas que se sientan tan bien como funcionan.',
    biography:
      'Soy Diego Alejandro Ocampo Madroñero, de Colombia. Estudio Ingeniería de Software en la Universidad Cooperativa de Colombia. Me muevo entre el desarrollo web, el backend y los videojuegos, con una curiosidad que también me lleva al espacio, al cine y a las historias que vale la pena contar.',
    location: 'Colombia',
    email: 'daom3456@gmail.com',
    github: 'https://github.com/MAKEBUZ',
    linkedin: 'https://www.linkedin.com/in/diego-alejandro-ocampo-madro%C3%B1ero-307706339/',
    avatar: '/images/avatars/avatar1.jpg',
    cvUrl: '/cv-diego-ocampo.pdf',
    availability: 'Abierto a nuevas colaboraciones',
    skills: ['TypeScript', 'React', 'Next.js', 'Vue', 'Java', 'Python', 'C#', 'Unity'],
  },
  settings: {
    siteTitle: 'Software & otros universos',
    heroLine: 'DIEGO',
    heroAccent: 'OCAMPO.',
    heroDescription:
      'Desarrollo software. Exploro ideas. Construyo experiencias que conectan la tecnología con las personas.',
    gameEnabled: false,
    soundEnabled: false,
  },
  projects: projects as Content['projects'],
  interests: [
    {
      id: 'cinema',
      title: 'La magia del cine',
      eyebrow: 'CINE DE LA PLAZA · BUTACA FAVORITA',
      icon: 'film',
      image: '/images/hobbies/peliculas-banner.jpg',
      description:
        'Me encantan las antiguas salas de cine: la marquesina, las butacas y ese instante en que se apagan las luces. En mi cartelera conviven los viajes de Interstellar, Oppenheimer, la conexión de Your Name y la magia de Harry Potter.',
      favorites: ['Interstellar', 'Oppenheimer', 'Your Name', 'Harry Potter'],
    },
    {
      id: 'anime',
      title: 'Historias que se quedan',
      eyebrow: 'BIBLIOTECA SAKURA · ANIME',
      icon: 'anime',
      image: '/images/hobbies/coleccion-banner.jpg',
      description:
        'De la cancha de Haikyuu!! a los mundos de Black Clover y Fairy Tail. Me gustan las historias de superación, los romances, las batallas y esos personajes que terminan acompañándote mucho después del último episodio.',
      favorites: [
        'Haikyuu!!',
        'Black Clover',
        'Shokugeki no Soma',
        '86',
        'Las quintillizas',
        'Fairy Tail',
        'Horimiya',
        'Koe no Katachi',
        'Bocchi the Rock!',
        'Chainsaw Man',
        'To Be Hero X',
        'Solo Leveling',
        'Nisekoi',
        'Fire Force',
        'Soul Eater',
        'Bleach',
      ],
    },
    {
      id: 'reading',
      title: 'Solo un capítulo más',
      eyebrow: 'BIBLIOTECA SAKURA · MANGA & NOVELAS',
      icon: 'book',
      image: '/images/hobbies/coleccion-banner.jpg',
      description:
        'Hay historias que prefiero descubrir página a página. Me encanta el manga de Kaoruko Hana y Horimiya; también la novela Maldita Reencarnación. Romance, mundos nuevos y personajes a los que siempre dan ganas de volver.',
      favorites: [
        'Kaoruko Hana',
        'Horimiya',
        'Koe no Katachi',
        'Maldita Reencarnación',
        'Solo Leveling',
      ],
    },
    {
      id: 'space',
      title: 'Un universo por descubrir',
      eyebrow: 'SALA 03 · ASTRONOMÍA',
      icon: 'stars',
      image: '/images/hobbies/astrofisica-banner.jpg',
      description:
        'La astrofísica es una de mis grandes curiosidades. Galaxias, relatividad, física cuántica y todas esas preguntas que nos recuerdan cuánto nos queda por descubrir.',
      favorites: ['Astrofísica', 'Relatividad', 'Física cuántica'],
    },
    {
      id: 'games',
      title: 'Siempre una partida más',
      eyebrow: 'ARCADE AURORA · VIDEOJUEGOS & ESPORTS',
      icon: 'gamepad',
      image: '/images/hobbies/videojuegos-banner.png',
      description:
        'De explorar Teyvat a optimizar una fábrica en Satisfactory, cazar en Monster Hunter: World o buscar un buen gol en Rocket League. También sigo el competitivo de League of Legends y Rocket League. Jugar me inspira a crear mis propias experiencias.',
      favorites: [
        'Rocket League',
        'Genshin Impact',
        'Zenless Zone Zero',
        'Monster Hunter: World',
        'Satisfactory',
        'League of Legends',
        'Competitivo de LoL',
        'Competitivo de Rocket League',
      ],
    },
    {
      id: 'music',
      title: 'No me salto el opening',
      eyebrow: 'CINE DE LA PLAZA · BANDA SONORA',
      icon: 'music',
      image: '/images/hobbies/musica-banner.png',
      description:
        'Me encanta la música de anime, especialmente los openings. Ado y Avicii tienen un lugar especial en mi banda sonora: energía, emoción y canciones que acompañan cada aventura.',
      favorites: ['Ado', 'Avicii', 'Openings de anime', 'Música japonesa'],
    },
    {
      id: 'photo',
      title: 'Pausar un instante',
      eyebrow: 'DETRÁS DEL LENTE',
      icon: 'camera',
      image: '/images/hobbies/foto-banner.jpg',
      description:
        'Paisajes, retratos, fotografía nocturna y mares de nubes. Me gusta encontrar pequeños detalles que convierten lo cotidiano en una buena imagen.',
      favorites: ['Fotografía nocturna', 'Paisajes', 'Retratos'],
    },
    {
      id: 'racing',
      title: 'Hasta la última vuelta',
      eyebrow: 'LA PARRILLA · FÓRMULA 1',
      icon: 'flag',
      image: '/images/hobbies/f1-banner.jpg',
      description:
        'Sigo la Fórmula 1 por las carreras, pero también por la tecnología, la evolución de los coches y las historias de sus pilotos.',
      favorites: ['Verstappen', 'Colapinto', 'Schumacher', 'Hamilton', 'Checo Pérez'],
    },
  ],
};
