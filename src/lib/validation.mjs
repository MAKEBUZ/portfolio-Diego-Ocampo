function object(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error(`${label}: formato inválido.`);
  return value;
}
function text(value, label, max = 200, optional = false) {
  if (typeof value !== 'string' || value.length > max || (!optional && !value.trim()))
    throw new Error(`${label}: escribe un texto de hasta ${max} caracteres.`);
  return value.trim();
}
function url(value, label, local = false, optional = true) {
  const result = text(value, label, 1000, optional);
  if (!result && optional) return result;
  if (
    local &&
    /^\/(images\/|media\/|cv-diego-ocampo\.pdf$)/.test(result) &&
    !result.includes('..') &&
    !/[\\<>]/.test(result)
  )
    return result;
  try {
    const parsed = new URL(result);
    if (['http:', 'https:'].includes(parsed.protocol) && !parsed.username && !parsed.password)
      return result;
  } catch {}
  throw new Error(`${label}: usa una URL http/https válida${local ? ' o una imagen local' : ''}.`);
}
function list(value, label, max = 20) {
  if (!Array.isArray(value) || value.length > max)
    throw new Error(`${label}: se permiten hasta ${max} elementos.`);
  return value;
}
function strings(value, label, max = 20) {
  return list(value, label, max).map((item) => text(item, label, 100));
}
function choice(value, choices, label) {
  if (!choices.includes(value)) throw new Error(`${label}: opción inválida.`);
  return value;
}
function boolean(value, label) {
  if (typeof value !== 'boolean') throw new Error(`${label}: valor inválido.`);
  return value;
}
function id(value) {
  if (typeof value !== 'string' || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(value))
    throw new Error('Identificador inválido. Usa letras minúsculas, números y guiones.');
  return value;
}
function unique(items) {
  if (new Set(items.map((item) => item.id)).size !== items.length)
    throw new Error('Hay identificadores duplicados.');
  return items;
}
export function validateContent(input) {
  const root = object(input, 'Contenido'),
    p = object(root.profile, 'Perfil'),
    s = object(root.settings, 'Ajustes');
  if (!Number.isSafeInteger(root.version) || root.version < 1)
    throw new Error('Versión inválida. Recarga el panel.');
  const email = text(p.email, 'Correo', 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[<>]/.test(email))
    throw new Error('Correo inválido.');
  return {
    version: root.version,
    profile: {
      name: text(p.name, 'Nombre', 100),
      role: text(p.role, 'Profesión', 120),
      intro: text(p.intro, 'Presentación', 400),
      biography: text(p.biography, 'Biografía', 4000),
      location: text(p.location, 'Ubicación', 100),
      email,
      github: url(p.github, 'GitHub', false, false),
      linkedin: url(p.linkedin, 'LinkedIn'),
      avatar: url(p.avatar, 'Avatar', true, false),
      cvUrl: url(p.cvUrl, 'CV', true, false),
      availability: text(p.availability, 'Disponibilidad', 120),
      skills: strings(p.skills, 'Habilidades', 32),
    },
    settings: {
      siteTitle: text(s.siteTitle, 'Título del sitio', 80),
      heroLine: text(s.heroLine, 'Primera línea', 80),
      heroAccent: text(s.heroAccent, 'Segunda línea', 80),
      heroDescription: text(s.heroDescription, 'Descripción de portada', 600),
      gameEnabled: boolean(s.gameEnabled, 'Juego'),
      soundEnabled: boolean(s.soundEnabled, 'Sonido'),
    },
    projects: unique(
      list(root.projects, 'Proyectos', 60).map((value) => {
        const p = object(value, 'Proyecto');
        const year = text(p.year, 'Año', 4);
        if (!/^\d{4}$/.test(year)) throw new Error('El año debe tener cuatro dígitos.');
        return {
          id: id(p.id),
          title: text(p.title, 'Título del proyecto', 100),
          tagline: text(p.tagline, 'Subtítulo', 180),
          description: text(p.description, 'Descripción', 4000),
          category: choice(p.category, ['web', 'games', 'backend', 'ai'], 'Categoría'),
          technologies: strings(p.technologies, 'Tecnologías', 20),
          image: url(p.image, 'Imagen', true),
          repositoryUrl: url(p.repositoryUrl, 'Repositorio', false, false),
          demoUrl: url(p.demoUrl, 'Demo'),
          year,
          featured: boolean(p.featured, 'Destacado'),
          status: choice(p.status, ['released', 'development'], 'Estado'),
        };
      }),
    ),
    interests: unique(
      list(root.interests, 'Intereses', 20).map((value) => {
        const i = object(value, 'Interés');
        return {
          id: id(i.id),
          title: text(i.title, 'Título del interés', 100),
          eyebrow: text(i.eyebrow, 'Etiqueta', 100),
          description: text(i.description, 'Descripción', 4000),
          icon: choice(
            i.icon,
            ['film', 'anime', 'stars', 'gamepad', 'music', 'camera', 'flag', 'book'],
            'Icono',
          ),
          image: url(i.image, 'Imagen', true),
          favorites: strings(i.favorites, 'Favoritos', 20),
        };
      }),
    ),
  };
}
