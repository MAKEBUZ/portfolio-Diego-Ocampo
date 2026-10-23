export type Category = 'web' | 'games' | 'backend' | 'ai';
export type InterestIcon =
  'film' | 'anime' | 'stars' | 'gamepad' | 'music' | 'camera' | 'flag' | 'book';
export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: Category;
  technologies: string[];
  image: string;
  repositoryUrl: string;
  demoUrl: string;
  year: string;
  featured: boolean;
  status: 'released' | 'development';
}
export interface Interest {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: InterestIcon;
  image: string;
  favorites: string[];
}
export interface Content {
  version: number;
  profile: {
    name: string;
    role: string;
    intro: string;
    biography: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    avatar: string;
    cvUrl: string;
    availability: string;
    skills: string[];
  };
  settings: {
    siteTitle: string;
    heroLine: string;
    heroAccent: string;
    heroDescription: string;
    gameEnabled: boolean;
    soundEnabled: boolean;
  };
  projects: Project[];
  interests: Interest[];
}
