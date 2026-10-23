import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContent } from '../src/lib/validation.mjs';
const fixture = () => ({
  version: 1,
  profile: {
    name: 'Diego',
    role: 'Developer',
    intro: 'Hello',
    biography: 'Bio',
    location: 'Colombia',
    email: 'test@example.com',
    github: 'https://github.com/MAKEBUZ',
    linkedin: '',
    avatar: '/images/avatars/avatar1.jpg',
    cvUrl: '/cv-diego-ocampo.pdf',
    availability: 'Available',
    skills: ['React'],
  },
  settings: {
    siteTitle: 'Cinema',
    heroLine: 'Code',
    heroAccent: 'Stories',
    heroDescription: 'Explore',
    gameEnabled: true,
    soundEnabled: true,
  },
  projects: [
    {
      id: 'demo',
      title: 'Demo',
      tagline: 'A project',
      description: 'Details',
      category: 'web',
      technologies: ['React'],
      image: '',
      repositoryUrl: 'https://github.com/MAKEBUZ',
      demoUrl: '',
      year: '2026',
      featured: true,
      status: 'released',
    },
  ],
  interests: [],
});
test('validates public content and strips unrelated keys', () => {
  const source = fixture();
  source.secret = 'must-not-persist';
  assert.equal(validateContent(source).profile.name, 'Diego');
  assert.equal('secret' in validateContent(source), false);
});
test('rejects executable links, unsafe media and malformed categories', () => {
  for (const value of ['javascript:alert(1)', 'data:text/html,bad', 'file:///etc/passwd']) {
    const source = fixture();
    source.projects[0].demoUrl = value;
    assert.throws(() => validateContent(source));
  }
  const source = fixture();
  source.profile.avatar = '/media/../../secret';
  assert.throws(() => validateContent(source));
  source.profile.avatar = '/images/avatar.png';
  source.projects[0].category = 'invalid';
  assert.throws(() => validateContent(source));
});
test('rejects duplicate IDs, excessive input and malformed versions', () => {
  const duplicate = fixture();
  duplicate.projects.push({ ...duplicate.projects[0] });
  assert.throws(() => validateContent(duplicate));
  const oversized = fixture();
  oversized.profile.biography = 'x'.repeat(4001);
  assert.throws(() => validateContent(oversized));
  const invalid = fixture();
  invalid.version = -1;
  assert.throws(() => validateContent(invalid));
});
