import { ArrowUpRight, Asterisk, Code2, Save, Settings, Sparkles, Star } from 'lucide-react';
import type { Content } from '@/lib/types';

export default function StudioDashboard({
  content,
  onNavigate,
}: {
  content: Content;
  onNavigate: (tab: 'profile' | 'projects' | 'interests' | 'settings') => void;
}) {
  return (
    <>
      <section className="studio-welcome">
        <div>
          <span className="studio-kicker">EL DETRÁS DE ESCENA</span>
          <h2>
            HOLA, {content.profile.name.split(' ')[0]}.<br />
            <span>HAZLO TUYO.</span>
          </h2>
          <p>
            Tus ideas evolucionan. Tu portafolio también.
            <br />
            Dale forma a lo que quieres compartir hoy.
          </p>
          <button className="button button-dark" onClick={() => onNavigate('profile')}>
            Editar mi perfil <ArrowUpRight size={17} />
          </button>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <span className="art-orbit" />
          <Asterisk className="art-star" />
          <span className="art-label">
            IDEAS EN
            <br />
            MOVIMIENTO
          </span>
          <span className="art-caption">OCAMPO — PERSONAL STUDIO</span>
        </div>
      </section>
      <div className="admin-stats">
        <button className="stat-card" onClick={() => onNavigate('projects')}>
          <Code2 size={21} />
          <strong>{String(content.projects.length).padStart(2, '0')}</strong>
          <span>Proyectos en tu colección</span>
          <ArrowUpRight className="stat-arrow" size={18} />
        </button>
        <button className="stat-card" onClick={() => onNavigate('interests')}>
          <Sparkles size={21} />
          <strong>{String(content.interests.length).padStart(2, '0')}</strong>
          <span>Universos por descubrir</span>
          <ArrowUpRight className="stat-arrow" size={18} />
        </button>
        <button className="stat-card" onClick={() => onNavigate('projects')}>
          <Star size={21} />
          <strong>
            {String(content.projects.filter((p) => p.featured).length).padStart(2, '0')}
          </strong>
          <span>Proyectos destacados</span>
          <ArrowUpRight className="stat-arrow" size={18} />
        </button>
      </div>
      <div className="studio-section-title">
        <h2>¿Qué quieres crear hoy?</h2>
        <span>ELIGE POR DÓNDE EMPEZAR</span>
      </div>
      <div className="studio-shortcuts">
        <button onClick={() => onNavigate('projects')}>
          <span className="shortcut-icon">
            <Code2 size={23} />
          </span>
          <strong>Tu próximo proyecto</strong>
          <p>Imágenes, enlaces y las historias detrás de tu trabajo.</p>
          <span className="shortcut-link">
            Gestionar proyectos <ArrowUpRight size={15} />
          </span>
        </button>
        <button onClick={() => onNavigate('interests')}>
          <span className="shortcut-icon">
            <Sparkles size={23} />
          </span>
          <strong>Lo que te mueve</strong>
          <p>Cine, anime, música y todos esos otros universos.</p>
          <span className="shortcut-link">
            Editar mis gustos <ArrowUpRight size={15} />
          </span>
        </button>
        <button onClick={() => onNavigate('settings')}>
          <span className="shortcut-icon">
            <Settings size={23} />
          </span>
          <strong>Los pequeños detalles</strong>
          <p>Textos de portada, copias de seguridad y acceso.</p>
          <span className="shortcut-link">
            Personalizar mi sitio <ArrowUpRight size={15} />
          </span>
        </button>
      </div>
      <p className="studio-save-note">
        <Save size={15} /> Edita con calma. Tus cambios se publican cuando pulsas «Guardar cambios».
      </p>
    </>
  );
}
