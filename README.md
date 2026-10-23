# Diego Ocampo · Software & otros universos

Portafolio editorial de Diego Ocampo, construido con Next.js, React, TypeScript y CSS. Tipografía de gran formato, fotografía conceptual de exploración espacial, una paleta violeta, lavanda y coral con fondos marfil y proyectos en menta, melocotón y lila, una galería de intereses a color, proyectos seleccionados y un administrador privado con persistencia real.

## Ejecutar en local

Requiere Node.js 22.13 o posterior.

```bash
npm ci
npm run admin:setup
npm run dev
```

Abre `http://localhost:3000`. El administrador está en `/admin`. La configuración genera una contraseña aleatoria y la guarda en **`.data/admin-access.txt`**, un archivo privado excluido de Git. No existe una contraseña compartida ni escrita en el código. Si el administrador ya está configurado, el comando conserva su acceso.

Puedes cambiar la contraseña desde Configuración. Si necesitas recuperar el acceso desde el servidor:

```bash
npm run admin:setup -- --reset
```

Este último comando genera otra contraseña e invalida las sesiones anteriores. Los archivos `.env.local` y `.env` también se leen al configurar el administrador.

## La experiencia

- Portada espacial con tipografía Anton y desplazamiento sutil de la imagen.
- Tres proyectos destacados y un archivo completo con búsqueda y filtros por categoría.
- Fichas con contexto, tecnologías, estado real, repositorio y demo cuando está disponible.
- Perfil, habilidades y descarga del CV; intereses organizados por cine, anime, manga, universo, videojuegos, música, fotografía y Fórmula 1.
- Navegación móvil, diálogos nativos accesibles, cierre con Escape y enlaces directos a las secciones.
- Animaciones de entrada y desplazamiento que respetan `prefers-reduced-motion`. Sin misiones, puntos, sonidos ni registro de visitantes.

Los intereses incluyen los gustos compartidos por Diego: Interstellar, Oppenheimer, Your Name, Harry Potter, anime y manga, Maldita Reencarnación, Rocket League, Genshin Impact, ZZZ, Monster Hunter: World, Satisfactory, LoL, F1, Ado, Avicii y openings. La dirección visual toma como referencia la composición editorial y tipográfica del [video compartido](https://www.youtube.com/watch?v=-D9PsHdB8Ck), adaptada a una identidad propia.

## Administrador

El estudio personal combina un fondo marfil con navegación violeta y acentos lavanda, coral y menta. Incluye búsqueda en proyectos e intereses, favoritos y tecnologías como etiquetas, vistas previas de imágenes, carga mediante selección o arrastre y acceso directo al PDF del CV. El botón de guardado permanece visible y espera a que finalicen las subidas.

El panel permite editar y guardar en el servidor:

- Perfil, biografía, contacto, habilidades, avatar y CV.
- Proyectos: crear, editar, borrar, ordenar, destacar, indicar estado y añadir repositorios y demos.
- Intereses: crear, ordenar, editar favoritos, imágenes y descripciones.
- Textos de portada y título de la pestaña.
- Exportación e importación JSON. Una importación es un borrador hasta que se guarda.
- Contraseña del administrador, invalidando otras sesiones al cambiarla.

Las imágenes JPG/PNG/WebP se recodifican a WebP y se limitan a 1920 px. También se admite el CV en PDF. El máximo por archivo es 5 MB. Los archivos subidos se guardan en `DATA_DIR/uploads` y se sirven desde `/media/…`.

El JSON de exportación contiene textos y enlaces; **no contiene los archivos multimedia ni las credenciales**. Para un respaldo completo, copia todo `DATA_DIR`. Los archivos subidos no se eliminan automáticamente al borrar una referencia, para conservar las copias anteriores.

## Contenido y proyectos

El contenido inicial está en `src/lib/seed.ts` y `src/lib/projects.json`. Cuando guardas desde el panel, `DATA_DIR/content.json` pasa a ser la fuente de contenido. Editar el seed después no sustituye una edición guardada.

La selección inicial se revisó sobre los repositorios públicos de [MAKEBUZ](https://github.com/MAKEBUZ):

| Proyecto                                                                     | Qué muestra                                                    |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [WatSolution](https://github.com/MAKEBUZ/watsolution_web)                    | Gestión de acueductos y portal de usuarios; en desarrollo      |
| [Spice & Umami](https://github.com/MAKEBUZ/Spice_Umami)                      | Experiencia web de recetas y asistente culinario               |
| [Energía · LSTM](https://github.com/MAKEBUZ/taller-lstm-demanda-energetica)  | Predicción de demanda energética con una serie temporal        |
| [Racoon: The Game](https://github.com/MAKEBUZ/Racoon-The-Game)               | Juego 2D en Java                                               |
| [RobotLang](https://github.com/MAKEBUZ/compiladores-trabajo-final-RobotLang) | Lenguaje, análisis sintáctico y AST                            |
| [Character Customizer](https://github.com/MAKEBUZ/Patrones-de-software)      | Personalización de personajes en Unity y patrón Decorator      |
| [Algoritmos genéticos](https://github.com/MAKEBUZ/taller_ia_genericos_IA)    | Optimización evolutiva; trabajo en equipo indicado en la ficha |
| [RankStudy](https://github.com/MAKEBUZ/RankStudy)                            | Base de plataforma educativa; en desarrollo                    |

Las demos son los enlaces publicados en los repositorios y dependen de sus servicios externos. No se atribuyen funcionalidades futuras como terminadas ni se presentan como propios proyectos identificados con otro autor.

## Despliegue con persistencia

```bash
npm run build
npm start
```

Esta versión necesita **un proceso Node.js con almacenamiento persistente**, por ejemplo un servidor o contenedor con volumen. Configura `SITE_URL` con el origen HTTPS real y `DATA_DIR` con un directorio privado persistente. `.env.example` muestra las variables. Ejecuta `admin:setup` con el mismo `DATA_DIR` del servidor.

Los contenidos se guardan mediante escritura atómica, una cola por proceso y control de versiones para evitar sobrescribir otra pestaña. El acceso usa scrypt, sesiones firmadas de 12 horas, cookie HttpOnly/SameSite, validación de origen y límites de tamaño. Cinco contraseñas fallidas activan una pausa de diez minutos en ese proceso. En HTTPS la cookie es Secure.

La persistencia y el control de intentos están diseñados para una instancia. Para varias réplicas o funciones serverless con disco efímero, adapta `store.ts` a una base de datos, los archivos a almacenamiento de objetos y el límite de intentos a un almacén compartido. No publiques `.data`, `.env.local` ni la contraseña en un directorio estático.

## Comprobaciones

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run format:check
npm audit --omit=dev
```

Las pruebas de Node verifican contraseñas, firmas, caducidad, rotación de sesiones y validación de contenido. El registro de verificaciones del rediseño está en `docs/browser-verification.json`. El administrador conserva la persistencia, autenticación, CRUD, conflictos, cargas y respaldos comprobados durante la reconstrucción.

La auditoría de dependencias de producción dio **0 vulnerabilidades** durante la reconstrucción. La auditoría completa aún señala avisos en dependencias de desarrollo de ESLint; no se consideran resueltos por excluirlas del informe de producción.

## Estructura

```text
src/app/components/    Portafolio editorial y diálogos
src/app/admin/         Interfaz privada del administrador
src/app/api/admin/     Sesión, contenido, contraseña y subidas
src/app/media/         Entrega de archivos subidos
src/lib/              Contenido inicial, almacenamiento, validación y autenticación
scripts/              Configuración del administrador
tests/                Pruebas de seguridad y validación
public/images/editorial/ Portada espacial original optimizada
docs/                 Dirección de arte y registro de generación
```

Las rutas anteriores `/portfolio`, `/projects`, `/loading` y `/testimonials` redirigen a las secciones del nuevo portafolio. La portada se generó con `image_gen`; consulta `docs/editorial-art.txt`. Los gráficos conceptuales de proyectos se identifican como tales y no se presentan como capturas del producto ni resultados experimentales. Las tipografías Anton e Inter se cargan desde Google Fonts, con fuentes de sistema como alternativa. Los campos históricos `gameEnabled` y `soundEnabled` se mantienen en el formato de respaldo para compatibilidad, pero no activan funciones en el portafolio actual.
