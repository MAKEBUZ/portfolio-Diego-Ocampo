'use client';
import Link from 'next/link';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronRight,
  Download,
  Code2,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Plus,
  Save,
  Search,
  Asterisk,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  UserRound,
  X,
} from 'lucide-react';
import type { Content, Project, Interest } from '@/lib/types';
import { validateContent } from '@/lib/validation.mjs';
import { Field, TextList, UploadField, Panel, MediaPreview } from './AdminFields';
import StudioDashboard from './StudioDashboard';

type Tab = 'dashboard' | 'profile' | 'projects' | 'interests' | 'settings';
const tabs = [
  { id: 'dashboard' as const, label: 'Vista general', icon: LayoutDashboard },
  { id: 'profile' as const, label: 'Mi perfil', icon: UserRound },
  { id: 'projects' as const, label: 'Proyectos', icon: Code2 },
  { id: 'interests' as const, label: 'Mi universo', icon: Sparkles },
  { id: 'settings' as const, label: 'Configuración', icon: Settings },
];
export default function Admin({
  initialContent,
  configured,
}: {
  initialContent: Content | null;
  configured: boolean;
}) {
  const [content, setContent] = useState<Content | null>(initialContent);
  const [tab, setTab] = useState<Tab>('dashboard');
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [password, setPassword] = useState('');
  const [selectedProject, setSelectedProject] = useState(initialContent?.projects[0]?.id || '');
  const [selectedInterest, setSelectedInterest] = useState(initialContent?.interests[0]?.id || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formKey, setFormKey] = useState(0);
  const [pendingUploads, setPendingUploads] = useState(0);
  const [projectSearch, setProjectSearch] = useState('');
  const [interestSearch, setInterestSearch] = useState('');
  function trackUpload(delta: number) {
    setPendingUploads((count) => count + delta);
  }
  const importRef = useRef<HTMLInputElement>(null);
  const project = content?.projects.find((p) => p.id === selectedProject);
  const interest = content?.interests.find((i) => i.id === selectedInterest);
  useEffect(() => {
    if (!dirty && !pendingUploads) return;
    const prevent = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', prevent);
    return () => window.removeEventListener('beforeunload', prevent);
  }, [dirty, pendingUploads]);
  function navigate(next: Tab) {
    setTab(next);
    setMessage(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function fail(text: string) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setMessage({ text, error: true });
  }
  function change(update: (current: Content) => Content) {
    setContent((current) => (current ? update(current) : null));
    setDirty(true);
    setMessage(null);
  }
  function updateProfile(key: keyof Content['profile'], value: string | string[]) {
    change((c) => ({ ...c, profile: { ...c.profile, [key]: value } }));
  }
  function updateSettings(key: keyof Content['settings'], value: string | boolean) {
    change((c) => ({ ...c, settings: { ...c.settings, [key]: value } }));
  }
  function updateProject<K extends keyof Project>(key: K, value: Project[K]) {
    change((c) => ({
      ...c,
      projects: c.projects.map((p) => (p.id === selectedProject ? { ...p, [key]: value } : p)),
    }));
  }
  function updateInterest<K extends keyof Interest>(key: K, value: Interest[K]) {
    change((c) => ({
      ...c,
      interests: c.interests.map((i) => (i.id === selectedInterest ? { ...i, [key]: value } : i)),
    }));
  }
  async function login(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      const result = await fetch('/api/admin/content', { cache: 'no-store' });
      const loaded = await result.json();
      if (!result.ok) throw new Error(loaded.error);
      setContent(loaded);
      setSelectedProject(loaded.projects[0]?.id || '');
      setSelectedInterest(loaded.interests[0]?.id || '');
      setPassword('');
    } catch (error) {
      fail(error instanceof Error ? error.message : 'No se pudo iniciar sesión.');
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    if (busy || pendingUploads) return;
    if (dirty && !window.confirm('Tienes cambios sin guardar. ¿Quieres salir y descartarlos?'))
      return;
    try {
      const response = await fetch('/api/admin/session', { method: 'DELETE' });
      if (!response.ok) throw new Error();
      setContent(null);
      setDirty(false);
      setMessage(null);
    } catch {
      fail('No se pudo cerrar la sesión. Inténtalo otra vez.');
    }
  }
  async function save() {
    if (!content || busy || pendingUploads) return;
    setBusy(true);
    setMessage(null);
    try {
      const clean = validateContent(content);
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clean),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setContent(data);
      setDirty(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setMessage({
        text: 'Cambios guardados. Ya están disponibles en el portafolio.',
        error: false,
      });
    } catch (error) {
      fail(error instanceof Error ? error.message : 'No se pudo guardar.');
    } finally {
      setBusy(false);
    }
  }
  function addProject() {
    const id = `proyecto-${crypto.randomUUID().slice(0, 8)}`;
    change((c) => ({
      ...c,
      projects: [
        ...c.projects,
        {
          id,
          title: 'Nuevo proyecto',
          tagline: 'Una nueva historia por contar',
          description: 'Describe el problema, tu aportación y el resultado.',
          category: 'web',
          technologies: [],
          image: '',
          repositoryUrl: content!.profile.github,
          demoUrl: '',
          year: String(new Date().getFullYear()),
          featured: false,
          status: 'development',
        },
      ],
    }));
    setSelectedProject(id);
    setProjectSearch('');
  }
  function addInterest() {
    const id = `interes-${crypto.randomUUID().slice(0, 8)}`;
    change((c) => ({
      ...c,
      interests: [
        ...c.interests,
        {
          id,
          title: 'Un nuevo interés',
          eyebrow: 'MI UNIVERSO',
          description: 'Cuenta qué te inspira de este tema.',
          icon: 'film',
          image: '',
          favorites: [],
        },
      ],
    }));
    setSelectedInterest(id);
    setInterestSearch('');
  }
  function remove(kind: 'projects' | 'interests', id: string) {
    if (!window.confirm('¿Eliminar este elemento? El cambio se aplicará cuando guardes.')) return;
    change((c) => ({ ...c, [kind]: c[kind].filter((item) => item.id !== id) }));
    if (kind === 'projects')
      setSelectedProject(content!.projects.find((p) => p.id !== id)?.id || '');
    else setSelectedInterest(content!.interests.find((i) => i.id !== id)?.id || '');
  }
  function reorder(kind: 'projects' | 'interests', id: string, direction: number) {
    change((c) => {
      const list = [...c[kind]];
      const from = list.findIndex((item) => item.id === id);
      const to = from + direction;
      if (to < 0 || to >= list.length) return c;
      [list[from], list[to]] = [list[to], list[from]];
      return { ...c, [kind]: list };
    });
  }
  function exportContent() {
    if (!content) return;
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = `diego-ocampo-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function importContent(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !content) return;
    try {
      if (file.size > 500_000) throw new Error('La copia supera los 500 KB.');
      const data = validateContent({
        ...JSON.parse(await file.text()),
        version: content.version,
      }) as Content;
      if (
        !window.confirm(
          '¿Reemplazar el borrador con esta copia? Revisa los datos antes de guardar.',
        )
      )
        return;
      setContent(data);
      setDirty(true);
      setSelectedProject(data.projects[0]?.id || '');
      setSelectedInterest(data.interests[0]?.id || '');
      setFormKey((k) => k + 1);
      setMessage({ text: 'Copia cargada como borrador. Guarda para aplicarla.', error: false });
    } catch (error) {
      fail(error instanceof Error ? error.message : 'La copia no es válida.');
    } finally {
      event.target.value = '';
    }
  }
  async function changePassword(event: React.FormEvent) {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      fail('La confirmación de contraseña no coincide.');
      return;
    }
    setBusy(true);
    try {
      const response = await fetch('/api/admin/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, password: newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setMessage({
        text: 'Contraseña cambiada. Las demás sesiones han sido cerradas.',
        error: false,
      });
    } catch (error) {
      fail(error instanceof Error ? error.message : 'No se pudo cambiar la contraseña.');
    } finally {
      setBusy(false);
    }
  }
  if (!content)
    return (
      <main className="admin-login">
        <div className="login-art" aria-hidden="true">
          <span>OCAMPO / ESTUDIO PERSONAL</span>
          <Asterisk size={76} />
          <h2>
            DETRÁS
            <br />
            DE CADA
            <br />
            <em>HISTORIA.</em>
          </h2>
          <p>Ideas, proyectos y otros universos.</p>
        </div>
        <div className="login-card">
          <div className="login-brand">
            <Code2 size={26} />
            <span>Diego Ocampo</span>
          </div>
          <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: 12 }}>
            TU ESTUDIO PERSONAL
          </span>
          <h1>Qué bueno verte.</h1>
          <p>Un espacio para cuidar lo que haces y compartir lo que te mueve.</p>
          {!configured && (
            <p className="admin-note">
              Primera configuración: ejecuta <code>npm run admin:setup</code> en el servidor para
              generar tu acceso privado.
            </p>
          )}
          <form onSubmit={login}>
            <label className="field">
              <span>Tu contraseña</span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña de administrador"
              />
            </label>
            <button className="button button-gold" disabled={busy}>
              <LockKeyhole size={16} />
              {busy ? 'Verificando…' : 'Entrar al panel'}
              <ChevronRight size={17} />
            </button>
          </form>
          {message && (
            <div className="admin-message error" role="alert">
              {message.text}
            </div>
          )}
          <Link href="/" className="text-button">
            <ArrowLeft size={14} /> Volver al portafolio
          </Link>
        </div>
      </main>
    );
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a href="/" target="_blank" rel="noreferrer" className="brand">
          <span className="admin-brand-mark">
            <Asterisk size={29} />
          </span>
          <span>
            OCAMPO<span className="brand-sub">ESTUDIO PERSONAL</span>
          </span>
        </a>
        <div className="sidebar-profile">
          <span className="profile-initial">{content.profile.name.charAt(0)}</span>
          <div>
            <strong>{content.profile.name}</strong>
            <small>Tu espacio creativo</small>
          </div>
        </div>
        <span className="admin-label">TU CONTENIDO</span>
        <nav className="admin-nav" aria-label="Secciones del administrador">
          {tabs.map((item) => (
            <button
              key={item.id}
              className={tab === item.id ? 'active' : ''}
              aria-current={tab === item.id ? 'page' : undefined}
              onClick={() => {
                navigate(item.id);
              }}
            >
              <item.icon size={17} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="sidebar-note">
            <Sparkles size={18} />
            <p>
              Un poco de ti.
              <br />
              <strong>En cada detalle.</strong>
            </p>
          </div>
          <a href="/" target="_blank" rel="noreferrer" className="text-button">
            Ver el portafolio <ArrowUpRight size={14} />
          </a>
          <button
            className="text-button muted-link"
            onClick={logout}
            disabled={busy || pendingUploads > 0}
          >
            <LogOut size={14} /> Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>{tabs.find((t) => t.id === tab)?.label}</h1>
            <p>Tu portafolio, a tu manera.</p>
          </div>
          <div className="admin-header-actions">
            <span className={`save-status ${dirty ? 'unsaved' : ''}`}>
              {pendingUploads ? (
                'Subiendo archivo…'
              ) : dirty ? (
                <>
                  <span className="admin-dirty-indicator" />
                  Cambios sin guardar
                </>
              ) : (
                'Todo está al día'
              )}
            </span>
            <button
              className="button button-gold"
              disabled={busy || !dirty || pendingUploads > 0}
              onClick={save}
            >
              <Save size={15} />
              {busy ? 'Guardando…' : 'Guardar cambios'}
            </button>
          </div>
        </header>
        <fieldset className="admin-content" disabled={busy}>
          {message && (
            <div
              className={`admin-message ${message.error ? 'error' : ''}`}
              role={message.error ? 'alert' : 'status'}
            >
              {message.error ? <X size={17} /> : <Check size={17} />}
              <span>{message.text}</span>
            </div>
          )}
          {tab === 'dashboard' && <StudioDashboard content={content} onNavigate={navigate} />}
          {tab === 'profile' && (
            <Panel
              title="La persona detrás del código"
              description="Tu perfil, enlaces de contacto y hoja de vida."
            >
              <div className="profile-summary">
                <MediaPreview value={content.profile.avatar} label="Tu fotografía actual" />
                <div>
                  <span className="studio-kicker">ASÍ TE PRESENTAS</span>
                  <h3>{content.profile.name}</h3>
                  <p>{content.profile.role}</p>
                  <small>{content.profile.location}</small>
                </div>
              </div>
              <div className="field-grid" key={formKey}>
                <h3 className="form-section-heading">01 / Tu historia</h3>
                <Field
                  label="Nombre público"
                  value={content.profile.name}
                  onChange={(v) => updateProfile('name', v)}
                />
                <Field
                  label="Profesión / rol"
                  value={content.profile.role}
                  onChange={(v) => updateProfile('role', v)}
                />
                <Field
                  label="Presentación breve"
                  value={content.profile.intro}
                  onChange={(v) => updateProfile('intro', v)}
                  full
                />
                <Field
                  label="Biografía"
                  value={content.profile.biography}
                  onChange={(v) => updateProfile('biography', v)}
                  area
                  full
                />
                <h3 className="form-section-heading">02 / Dónde encontrarte</h3>
                <Field
                  label="Ubicación"
                  value={content.profile.location}
                  onChange={(v) => updateProfile('location', v)}
                />
                <Field
                  label="Correo de contacto"
                  type="email"
                  value={content.profile.email}
                  onChange={(v) => updateProfile('email', v)}
                />
                <Field
                  label="GitHub"
                  value={content.profile.github}
                  onChange={(v) => updateProfile('github', v)}
                />
                <Field
                  label="LinkedIn"
                  value={content.profile.linkedin}
                  onChange={(v) => updateProfile('linkedin', v)}
                />
                <Field
                  label="Disponibilidad"
                  value={content.profile.availability}
                  onChange={(v) => updateProfile('availability', v)}
                  full
                />
                <TextList
                  label="Habilidades"
                  limit={32}
                  value={content.profile.skills}
                  onChange={(v) => updateProfile('skills', v)}
                />
                <h3 className="form-section-heading">03 / Imagen y hoja de vida</h3>
                <UploadField
                  label="Fotografía de perfil"
                  value={content.profile.avatar}
                  onChange={(v) => updateProfile('avatar', v)}
                  onError={fail}
                  onUploadChange={trackUpload}
                />
                <UploadField
                  label="Hoja de vida"
                  value={content.profile.cvUrl}
                  onChange={(v) => updateProfile('cvUrl', v)}
                  onError={fail}
                  onUploadChange={trackUpload}
                  pdf
                />
              </div>
            </Panel>
          )}
          {tab === 'projects' && (
            <div className="admin-editor-layout">
              <div className="admin-collection">
                <div className="collection-heading">
                  <span>TUS PROYECTOS</span>
                  <span>{content.projects.length}</span>
                </div>
                <label className="collection-search">
                  <Search size={16} />
                  <input
                    aria-label="Buscar proyectos"
                    placeholder="Buscar proyecto…"
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                  />
                </label>
                <div className="admin-item-list">
                  {content.projects
                    .map((p, index) => ({ p, index }))
                    .filter(({ p }) =>
                      `${p.title} ${p.technologies.join(' ')}`
                        .toLocaleLowerCase()
                        .includes(projectSearch.toLocaleLowerCase()),
                    )
                    .map(({ p, index }) => (
                      <button
                        key={p.id}
                        className={p.id === selectedProject ? 'active' : ''}
                        aria-pressed={p.id === selectedProject}
                        onClick={() => {
                          setSelectedProject(p.id);
                          window.scrollTo({ top: 0, behavior: 'instant' });
                        }}
                      >
                        <span className="item-number">{String(index + 1).padStart(2, '0')}</span>
                        <span>
                          <strong>{p.title}</strong>
                          <small>
                            {p.featured
                              ? '★ Destacado'
                              : {
                                  web: 'Desarrollo web',
                                  ai: 'Inteligencia artificial',
                                  games: 'Videojuegos',
                                  backend: 'Ingeniería',
                                }[p.category]}
                          </small>
                        </span>
                      </button>
                    ))}
                  {!content.projects.some((p) =>
                    `${p.title} ${p.technologies.join(' ')}`
                      .toLocaleLowerCase()
                      .includes(projectSearch.toLocaleLowerCase()),
                  ) && <p className="collection-empty">No hay proyectos con esa búsqueda.</p>}
                  <button
                    className="add-button"
                    onClick={addProject}
                    disabled={content.projects.length >= 60}
                  >
                    <Plus size={16} /> Añadir proyecto
                  </button>
                </div>
              </div>
              {project ? (
                <section className="admin-panel" key={`${project.id}-${formKey}`}>
                  <div className="editor-heading">
                    <div>
                      <span className="studio-kicker">EDITANDO PROYECTO</span>
                      <h2>{project.title}</h2>
                    </div>
                    <div className="editor-controls">
                      <button
                        aria-label="Subir proyecto"
                        title="Subir en el orden"
                        disabled={content.projects[0]?.id === project.id}
                        onClick={() => reorder('projects', project.id, -1)}
                      >
                        <ArrowUp size={15} />
                      </button>
                      <button
                        aria-label="Bajar proyecto"
                        title="Bajar en el orden"
                        disabled={content.projects.at(-1)?.id === project.id}
                        onClick={() => reorder('projects', project.id, 1)}
                      >
                        <ArrowDown size={15} />
                      </button>
                      <button
                        className="danger"
                        aria-label="Eliminar proyecto"
                        onClick={() => remove('projects', project.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  <div className="field-grid">
                    <Field
                      label="Título"
                      value={project.title}
                      onChange={(v) => updateProject('title', v)}
                    />
                    <Field
                      label="Año"
                      value={project.year}
                      onChange={(v) => updateProject('year', v)}
                    />
                    <Field
                      label="Subtítulo"
                      value={project.tagline}
                      onChange={(v) => updateProject('tagline', v)}
                      full
                    />
                    <Field
                      label="Descripción y aportación"
                      value={project.description}
                      onChange={(v) => updateProject('description', v)}
                      area
                      full
                    />
                    <label className="field">
                      Categoría
                      <select
                        value={project.category}
                        onChange={(e) =>
                          updateProject('category', e.target.value as Project['category'])
                        }
                      >
                        <option value="web">Desarrollo web</option>
                        <option value="ai">Inteligencia artificial</option>
                        <option value="games">Videojuegos</option>
                        <option value="backend">Ingeniería / backend</option>
                      </select>
                    </label>
                    <label className="field">
                      Estado
                      <select
                        value={project.status}
                        onChange={(e) =>
                          updateProject('status', e.target.value as Project['status'])
                        }
                      >
                        <option value="released">Disponible</option>
                        <option value="development">En desarrollo</option>
                      </select>
                    </label>
                    <TextList
                      label="Tecnologías"
                      value={project.technologies}
                      onChange={(v) => updateProject('technologies', v)}
                    />
                    <Field
                      label="Repositorio"
                      value={project.repositoryUrl}
                      onChange={(v) => updateProject('repositoryUrl', v)}
                    />
                    <Field
                      label="Demo (opcional)"
                      value={project.demoUrl}
                      onChange={(v) => updateProject('demoUrl', v)}
                    />
                    <UploadField
                      label="Portada (opcional)"
                      optional
                      value={project.image}
                      onChange={(v) => updateProject('image', v)}
                      onError={fail}
                      onUploadChange={trackUpload}
                    />
                  </div>
                  <label className="toggle-field">
                    <input
                      type="checkbox"
                      checked={project.featured}
                      onChange={(e) => updateProject('featured', e.target.checked)}
                    />
                    <span>
                      <strong>Proyecto destacado</strong>
                      <small>Destaca este proyecto en la selección inicial del portafolio.</small>
                    </span>
                  </label>
                </section>
              ) : (
                <div className="admin-empty">Añade un proyecto para comenzar.</div>
              )}
            </div>
          )}
          {tab === 'interests' && (
            <div className="admin-editor-layout">
              <div className="admin-collection">
                <div className="collection-heading">
                  <span>TUS UNIVERSOS</span>
                  <span>{content.interests.length}</span>
                </div>
                <label className="collection-search">
                  <Search size={16} />
                  <input
                    aria-label="Buscar intereses"
                    placeholder="Buscar interés…"
                    value={interestSearch}
                    onChange={(e) => setInterestSearch(e.target.value)}
                  />
                </label>
                <div className="admin-item-list">
                  {content.interests
                    .map((i, index) => ({ i, index }))
                    .filter(({ i }) =>
                      `${i.title} ${i.favorites.join(' ')}`
                        .toLocaleLowerCase()
                        .includes(interestSearch.toLocaleLowerCase()),
                    )
                    .map(({ i, index }) => (
                      <button
                        key={i.id}
                        className={i.id === selectedInterest ? 'active' : ''}
                        aria-pressed={i.id === selectedInterest}
                        onClick={() => {
                          setSelectedInterest(i.id);
                          window.scrollTo({ top: 0, behavior: 'instant' });
                        }}
                      >
                        <span className="item-number">{String(index + 1).padStart(2, '0')}</span>
                        <span>
                          <strong>{i.title}</strong>
                          <small>{i.eyebrow}</small>
                        </span>
                      </button>
                    ))}
                  {!content.interests.some((i) =>
                    `${i.title} ${i.favorites.join(' ')}`
                      .toLocaleLowerCase()
                      .includes(interestSearch.toLocaleLowerCase()),
                  ) && <p className="collection-empty">No hay intereses con esa búsqueda.</p>}
                  <button
                    className="add-button"
                    onClick={addInterest}
                    disabled={content.interests.length >= 20}
                  >
                    <Plus size={16} /> Añadir interés
                  </button>
                </div>
              </div>
              {interest ? (
                <section className="admin-panel" key={`${interest.id}-${formKey}`}>
                  <div className="editor-heading">
                    <div>
                      <span className="studio-kicker">EDITANDO TU UNIVERSO</span>
                      <h2>{interest.title}</h2>
                    </div>
                    <div className="editor-controls">
                      <button
                        aria-label="Subir interés"
                        title="Subir en el orden"
                        disabled={content.interests[0]?.id === interest.id}
                        onClick={() => reorder('interests', interest.id, -1)}
                      >
                        <ArrowUp size={15} />
                      </button>
                      <button
                        aria-label="Bajar interés"
                        title="Bajar en el orden"
                        disabled={content.interests.at(-1)?.id === interest.id}
                        onClick={() => reorder('interests', interest.id, 1)}
                      >
                        <ArrowDown size={15} />
                      </button>
                      <button
                        className="danger"
                        aria-label="Eliminar interés"
                        onClick={() => remove('interests', interest.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  <div className="field-grid">
                    <Field
                      label="Título del interés"
                      value={interest.title}
                      onChange={(v) => updateInterest('title', v)}
                    />
                    <Field
                      label="Etiqueta"
                      value={interest.eyebrow}
                      onChange={(v) => updateInterest('eyebrow', v)}
                    />
                    <Field
                      label="Tu historia con este tema"
                      value={interest.description}
                      onChange={(v) => updateInterest('description', v)}
                      area
                      full
                    />
                    <label className="field full-width">
                      Icono
                      <select
                        value={interest.icon}
                        onChange={(e) => updateInterest('icon', e.target.value as Interest['icon'])}
                      >
                        <option value="film">Cine</option>
                        <option value="anime">Anime & manga</option>
                        <option value="stars">Astronomía</option>
                        <option value="gamepad">Videojuegos</option>
                        <option value="music">Música</option>
                        <option value="camera">Fotografía</option>
                        <option value="flag">Fórmula 1</option>
                        <option value="book">Lectura</option>
                      </select>
                    </label>
                    <TextList
                      label="Favoritos: películas, animes, juegos o temas"
                      value={interest.favorites}
                      onChange={(v) => updateInterest('favorites', v)}
                    />
                    <UploadField
                      label="Imagen del interés"
                      optional
                      value={interest.image}
                      onChange={(v) => updateInterest('image', v)}
                      onError={fail}
                      onUploadChange={trackUpload}
                    />
                  </div>
                </section>
              ) : (
                <div className="admin-empty">Añade un tema para compartir tus intereses.</div>
              )}
            </div>
          )}
          {tab === 'settings' && (
            <>
              <Panel
                title="Identidad del portafolio"
                description="Personaliza los textos de la portada y el título de tu sitio."
              >
                <div className="field-grid">
                  <Field
                    label="Título del sitio (pestaña del navegador)"
                    value={content.settings.siteTitle}
                    onChange={(v) => updateSettings('siteTitle', v)}
                    full
                  />
                  <Field
                    label="Portada: primera línea"
                    value={content.settings.heroLine}
                    onChange={(v) => updateSettings('heroLine', v)}
                  />
                  <Field
                    label="Portada: línea destacada"
                    value={content.settings.heroAccent}
                    onChange={(v) => updateSettings('heroAccent', v)}
                  />
                  <Field
                    label="Descripción de portada"
                    value={content.settings.heroDescription}
                    onChange={(v) => updateSettings('heroDescription', v)}
                    area
                    full
                  />
                </div>
              </Panel>
              <Panel
                title="Copias de tu contenido"
                description="Exporta tus textos y enlaces o importa una copia anterior. Conserva también los archivos originales de tus imágenes y CV."
              >
                <div className="admin-links">
                  <button className="button button-outline" onClick={exportContent}>
                    <Download size={15} /> Exportar copia JSON
                  </button>
                  <button
                    className="button button-outline"
                    disabled={pendingUploads > 0}
                    onClick={() => importRef.current?.click()}
                  >
                    <Upload size={15} /> Importar copia
                  </button>
                  <input
                    ref={importRef}
                    className="sr-only"
                    type="file"
                    accept="application/json,.json"
                    onChange={importContent}
                  />
                </div>
                <p className="admin-note">
                  La importación crea un borrador: puedes revisarlo antes de guardar. La copia no
                  incluye contraseñas ni sesiones.
                </p>
              </Panel>
              <Panel
                title="Cambiar tu contraseña"
                description="Elige una contraseña de al menos 12 caracteres. El cambio cierra las demás sesiones."
              >
                <form className="password-form" onSubmit={changePassword}>
                  <label className="field">
                    Contraseña actual
                    <input
                      type="password"
                      autoComplete="current-password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </label>
                  <label className="field">
                    Nueva contraseña
                    <input
                      type="password"
                      autoComplete="new-password"
                      minLength={12}
                      maxLength={128}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </label>
                  <label className="field">
                    Repite la nueva contraseña
                    <input
                      type="password"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </label>
                  <button className="button button-outline" disabled={busy}>
                    <ShieldCheck size={16} /> Actualizar contraseña
                  </button>
                </form>
              </Panel>
            </>
          )}
        </fieldset>
      </main>
    </div>
  );
}
