'use client';
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Check,
  Code2,
  Copy,
  ExternalLink,
  Github,
  Menu,
  MoveUpRight,
  Orbit,
  Search,
} from 'lucide-react';
import type { Content, Project, Interest, Category } from '@/lib/types';
import Dialog from './Dialog';
import InterestGallery from './InterestGallery';

const categories: Record<Category, string> = {
  web: 'Desarrollo web',
  ai: 'Inteligencia artificial',
  games: 'Videojuegos',
  backend: 'Ingeniería de software',
};
type Modal =
  | { type: 'archive' }
  | { type: 'project'; project: Project; fromArchive?: boolean }
  | { type: 'interest'; interest: Interest }
  | null;

function ProjectVisual({ project }: { project: Project }) {
  if (project.image)
    return (
      <div className={`work-visual visual-${project.id}`}>
        <img src={project.image} alt={`Captura del proyecto ${project.title}`} loading="lazy" />
        <span className="visual-corner">
          {project.technologies[0]} / {project.year}
        </span>
      </div>
    );
  if (project.id === 'watsolution')
    return (
      <div className="work-visual water-visual">
        <div className="water-rings" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="water-wordmark">
          <span className="water-symbol" aria-hidden="true">
            ≈
          </span>
          <strong>
            wat<span>solution</span>
          </strong>
          <p>TECNOLOGÍA PARA LO ESENCIAL.</p>
        </div>
        <span className="visual-corner">ACUEDUCTOS / PLATAFORMA WEB</span>
        <span className="visual-note">Concepto visual del proyecto</span>
      </div>
    );
  if (project.id === 'lstm-energia')
    return (
      <div className="work-visual energy-visual">
        <div className="energy-grid" />
        <div className="energy-label">
          <span>SERIES TEMPORALES / MACHINE LEARNING</span>
          <strong>
            El siguiente
            <br />
            <em>dato.</em>
          </strong>
        </div>
        <svg className="energy-chart" viewBox="0 0 800 230" aria-hidden="true">
          <defs>
            <linearGradient id="energy-fill" x1="0" x2="0" y1="0" y2="1">
              <stop stopColor="#9571bf" stopOpacity=".38" />
              <stop offset="1" stopColor="#9571bf" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 190 30 178 60 185 92 135 125 149 155 98 190 116 220 158 250 142 280 182 310 132 340 146 375 77 410 92 440 58 470 74 510 120 540 85 575 108 605 47 635 73 670 35 700 53 735 26 765 48 800 16V230H0Z"
            fill="url(#energy-fill)"
          />
          <path
            d="M0 190 30 178 60 185 92 135 125 149 155 98 190 116 220 158 250 142 280 182 310 132 340 146 375 77 410 92 440 58 470 74 510 120 540 85 575 108 605 47 635 73 670 35 700 53 735 26 765 48 800 16"
            fill="none"
            stroke="#7954a5"
            strokeWidth="2"
          />
        </svg>
        <span className="visual-corner">PYTHON / TENSORFLOW / STREAMLIT</span>
        <span className="visual-note">Gráfica ilustrativa</span>
      </div>
    );
  return (
    <div className={`work-visual type-visual type-${project.category}`}>
      <Code2 size={38} strokeWidth={1} />
      <strong>{project.title}</strong>
      <span>{project.technologies.slice(0, 3).join(' / ')}</span>
      <span className="visual-corner">
        {categories[project.category]} / {project.year}
      </span>
    </div>
  );
}

export default function Portfolio({ content }: { content: Content }) {
  const { profile, settings, projects, interests } = content;
  const [modal, setModal] = useState<Modal>(null);
  const [menu, setMenu] = useState(false);

  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const heroArt = useRef<HTMLImageElement>(null);
  const heroType = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const selected = featured.length ? featured : projects.slice(0, 3);
  const filtered = projects.filter(
    (project) =>
      (filter === 'all' || project.category === filter) &&
      `${project.title} ${project.tagline} ${project.technologies.join(' ')}`
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()),
  );

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    function paint() {
      frame = 0;
      if (motion.matches) {
        heroArt.current?.style.removeProperty('transform');
        heroType.current?.style.removeProperty('transform');
        rail.current?.style.removeProperty('transform');
        return;
      }
      if (hero.current) {
        const bounds = hero.current.getBoundingClientRect();
        const travel = Math.max(0, Math.min(1, -bounds.top / bounds.height));
        if (heroArt.current)
          heroArt.current.style.transform = `translate3d(0,${travel * 100}px,0) scale(${1 + travel * 0.09})`;
        if (heroType.current)
          heroType.current.style.transform = `translate3d(0,${travel * -48}px,0)`;
      }
      if (rail.current) {
        const bounds = rail.current.parentElement!.getBoundingClientRect();
        const travel = Math.max(-1, Math.min(1, (innerHeight / 2 - bounds.top) / innerHeight));
        rail.current.style.transform = `translate3d(${-travel * 90}px,0,0)`;
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
    document.documentElement.classList.add('motion-ready');
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    paint();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.documentElement.classList.remove('motion-ready');
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  }
  function closeMenu() {
    setMenu(false);
  }
  const navigation = (
    <>
      <a href="#proyectos" onClick={closeMenu}>
        Proyectos
      </a>
      <a href="#sobre-mi" onClick={closeMenu}>
        Sobre mí
      </a>
      <a href="#universo" onClick={closeMenu}>
        Mi universo
      </a>
      <a href="#contacto" onClick={closeMenu}>
        Contacto <ArrowUpRight size={15} />
      </a>
    </>
  );
  return (
    <div className="portfolio">
      <a className="skip-link" href="#proyectos">
        Saltar a los proyectos
      </a>
      <header className="editorial-header">
        <a className="wordmark" href="#inicio" aria-label="Diego Ocampo, inicio">
          D<span>/</span>O<span className="wordmark-dot">.</span>
        </a>
        <nav className="editorial-nav" aria-label="Navegación principal">
          {navigation}
        </nav>
        <div className="header-note">
          <span className="live-dot" /> {profile.availability.toUpperCase()}
        </div>
        <button
          className="mobile-menu-button"
          aria-label="Abrir navegación"
          aria-expanded={menu}
          onClick={() => setMenu(true)}
        >
          <Menu size={24} />
        </button>
      </header>
      <main>
        <section className="editorial-hero" id="inicio" ref={hero}>
          <img
            ref={heroArt}
            className="orbit-image"
            src="/images/editorial/orbit-hero.webp"
            alt="Escena conceptual de exploración: un astronauta frente a un planeta eclipsado"
            fetchPriority="high"
          />
          <div className="orbit-shade" />
          <div className="hero-coordinate" aria-hidden="true">
            <Orbit size={33} strokeWidth={1.2} />
            <span>
              CÓDIGO, HISTORIAS
              <br />Y MUCHA CURIOSIDAD.
            </span>
          </div>
          <div className="editorial-hero-content" ref={heroType}>
            <p className="micro hero-kicker">
              <span /> {profile.role.toUpperCase()} / {profile.location.toUpperCase()}
            </p>
            <h1>
              <span className="hero-name-line">
                {settings.heroLine}
                <Asterisk aria-hidden="true" />
              </span>
              <span>{settings.heroAccent}</span>
            </h1>
            <div className="hero-introduction">
              <p>{settings.heroDescription}</p>
              <a href="#proyectos" className="round-link">
                <span className="round-arrow">
                  <ArrowDownRight size={23} />
                </span>
                <span>
                  Explora mi trabajo<small>PROYECTOS SELECCIONADOS</small>
                </span>
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <span>SOFTWARE & OTROS UNIVERSOS</span>
            <a href="#proyectos">
              <span>SCROLL PARA EXPLORAR</span>
              <ArrowDown size={16} />
            </a>
            <span>PORTFOLIO / {new Date().getFullYear()}</span>
          </div>
        </section>

        <section className="editorial-work paper" id="proyectos">
          <div className="work-intro section-shell">
            <div className="section-index" data-reveal>
              <span>01 / TRABAJO SELECCIONADO</span>
              <ArrowDownRight size={24} />
            </div>
            <div className="work-title-row" data-reveal>
              <h2>
                IDEAS REALES.
                <br />
                <span>CÓDIGO REAL.</span>
              </h2>
              <div>
                <p>
                  Del primer experimento a una aplicación completa. Una selección de lo que
                  construyo, aprendo y llevo un poco más allá.
                </p>
                <a
                  className="inline-link dark-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  Explorar mi GitHub <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <div className="selected-grid">
              {selected.map((project, index) => (
                <article
                  className={`selected-project project-position-${index}`}
                  data-project={project.id}
                  key={project.id}
                  data-reveal
                >
                  <button
                    className="project-cover-button"
                    onClick={() => setModal({ type: 'project', project })}
                    aria-label={`Ver proyecto ${project.title}`}
                  >
                    <ProjectVisual project={project} />
                    <span className="project-open">
                      <ArrowUpRight size={25} />
                    </span>
                  </button>
                  <div className="project-summary">
                    <div className="project-editorial-meta">
                      <span>
                        {String(index + 1).padStart(2, '0')} / {categories[project.category]}
                      </span>
                      <span>{project.year}</span>
                    </div>
                    <button
                      className="project-title-button"
                      onClick={() => setModal({ type: 'project', project })}
                    >
                      <h3>{project.title}</h3>
                      <ArrowUpRight size={24} />
                    </button>
                    <p className="project-editorial-description">{project.tagline}</p>
                    {index === 2 && <p className="project-story">{project.description}</p>}
                    <div className="project-techline">
                      {project.technologies.slice(0, 4).join(' / ')}
                      {project.status === 'development' && <span>EN DESARROLLO</span>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="work-bottom" data-reveal>
              <p>
                Hay más por descubrir.
                <br />
                <span>Experimentos, videojuegos y otras ideas.</span>
              </p>
              <button className="outline-action" onClick={() => setModal({ type: 'archive' })}>
                Todos los proyectos <span>({String(projects.length).padStart(2, '0')})</span>
                <ArrowUpRight size={21} />
              </button>
            </div>
          </div>
        </section>

        <section className="editorial-about section-shell" id="sobre-mi">
          <div className="section-index" data-reveal>
            <span>02 / DETRÁS DEL CÓDIGO</span>
            <span>DE COLOMBIA, CON CURIOSIDAD.</span>
          </div>
          <div className="about-grid">
            <div className="about-photo" data-reveal>
              <img src={profile.avatar} alt={profile.name} loading="lazy" />
              <span className="photo-caption">DIEGO ALEJANDRO OCAMPO MADROÑERO</span>
              <span className="photo-cross" aria-hidden="true">
                +
              </span>
            </div>
            <div className="about-editorial-copy" data-reveal>
              <span className="micro">HOLA, SOY {profile.name.toUpperCase()}.</span>
              <h2>
                SIEMPRE
                <br />
                EN <span>ÓRBITA.</span>
              </h2>
              <p className="about-lead">{profile.intro}</p>
              <p>{profile.biography}</p>
              <div className="editorial-skills">
                {profile.skills.map((skill, index) => (
                  <span key={skill}>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                    {skill}
                  </span>
                ))}
              </div>
              <a className="inline-link" href={profile.cvUrl} download="CV_Diego_Ocampo.pdf">
                Descargar mi CV <ArrowDown size={18} />
              </a>
            </div>
          </div>
        </section>

        <div className="typographic-rail" aria-hidden="true">
          <div ref={rail}>
            <span>CÓDIGO</span>
            <i>✳</i>
            <span>HISTORIAS</span>
            <i>✳</i>
            <span>CURIOSIDAD</span>
            <i>✳</i>
            <span>CÓDIGO</span>
          </div>
        </div>

        <InterestGallery
          interests={interests}
          onOpen={(interest) => setModal({ type: 'interest', interest })}
        />

        <section className="editorial-contact paper" id="contacto">
          <div className="section-shell">
            <div className="section-index" data-reveal>
              <span>04 / SIGUIENTE CAPÍTULO</span>
              <span className="availability">
                <span className="live-dot" />
                {profile.availability}
              </span>
            </div>
            <div className="contact-main" data-reveal>
              <h2>
                HAGAMOS
                <br />
                <span>ALGO BUENO.</span>
              </h2>
              <a
                className="contact-big-arrow"
                href={`mailto:${profile.email}`}
                aria-label={`Escribir a ${profile.email}`}
              >
                <MoveUpRight strokeWidth={1.1} />
              </a>
            </div>
            <div className="contact-bottom">
              <div>
                <p>Una idea. Un proyecto. Una conversación.</p>
                <a className="contact-email" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                <button className="copy-contact" onClick={copyEmail} aria-label="Copiar correo">
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
                <span className="copy-status" role="status">
                  {copied
                    ? 'Correo copiado'
                    : copyError
                      ? 'Puedes seleccionar y copiar el correo.'
                      : ''}
                </span>
              </div>
              <div className="editorial-socials">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight size={17} />
                </a>
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn <ArrowUpRight size={17} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="editorial-footer">
        <a href="#inicio" className="wordmark" aria-label="Volver al inicio">
          D<span>/</span>O.
        </a>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>HECHO CON CÓDIGO Y CURIOSIDAD.</span>
        <a href="/admin">
          Administración <ArrowUpRight size={13} />
        </a>
      </footer>

      {menu && (
        <Dialog title="Exploremos." onClose={closeMenu}>
          <nav className="mobile-editorial-nav" aria-label="Navegación móvil">
            {navigation}
          </nav>
        </Dialog>
      )}
      {modal?.type === 'archive' && (
        <Dialog title="Archivo de proyectos." onClose={() => setModal(null)} wide>
          <div className="archive-toolbar">
            <div className="archive-filters" aria-label="Filtrar proyectos">
              {(['all', 'web', 'ai', 'games', 'backend'] as const).map((category) => (
                <button
                  key={category}
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                >
                  {category === 'all' ? 'Todos' : categories[category]}
                </button>
              ))}
            </div>
            <label className="archive-search">
              <Search size={17} />
              <input
                placeholder="Buscar un proyecto"
                aria-label="Buscar proyectos"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>
          <div className="archive-list">
            {filtered.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setModal({ type: 'project', project, fromArchive: true })}
              >
                <span className="archive-number">{String(index + 1).padStart(2, '0')}</span>
                <span>
                  <strong>{project.title}</strong>
                  <small>
                    {categories[project.category]} / {project.year}
                  </small>
                </span>
                <ArrowUpRight size={23} />
              </button>
            ))}
          </div>
          {!filtered.length && (
            <div className="archive-empty">
              <p>No hay proyectos con esa búsqueda.</p>
              <button
                className="inline-link"
                onClick={() => {
                  setFilter('all');
                  setQuery('');
                }}
              >
                Restablecer filtros <ArrowRight size={17} />
              </button>
            </div>
          )}
        </Dialog>
      )}
      {modal?.type === 'project' && (
        <Dialog
          key={modal.project.id}
          title={modal.project.title}
          onClose={() => setModal(null)}
          wide
        >
          {modal.fromArchive && (
            <button
              className="inline-link back-to-archive"
              onClick={() => setModal({ type: 'archive' })}
            >
              <ArrowLeft size={16} /> Volver al archivo
            </button>
          )}
          <div className="editorial-project-detail">
            <ProjectVisual project={modal.project} />
            <div className="case-content">
              <div className="case-meta">
                <span>{categories[modal.project.category]}</span>
                <span>{modal.project.year}</span>
                {modal.project.status === 'development' && <span>En desarrollo</span>}
              </div>
              <h3>{modal.project.tagline}</h3>
              <p>{modal.project.description}</p>
              <div className="case-technologies">
                {modal.project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="case-actions">
                <a
                  className="button button-gold"
                  href={modal.project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={17} /> Ver código <ArrowUpRight size={16} />
                </a>
                {modal.project.demoUrl && (
                  <a
                    className="button button-outline"
                    href={modal.project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={17} /> Abrir demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </Dialog>
      )}
      {modal?.type === 'interest' && (
        <Dialog title={modal.interest.title} onClose={() => setModal(null)}>
          <p className="dialog-prose">{modal.interest.description}</p>
          <ul className="all-favorites">
            {modal.interest.favorites.map((favorite, index) => (
              <li key={favorite}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {favorite}
              </li>
            ))}
          </ul>
        </Dialog>
      )}
    </div>
  );
}
