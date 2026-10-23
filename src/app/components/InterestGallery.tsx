'use client';
/* eslint-disable @next/next/no-img-element */
import { useState, type CSSProperties } from 'react';
import {
  ArrowUpRight,
  Asterisk,
  BookOpen,
  Camera,
  Clapperboard,
  Flag,
  Gamepad2,
  Headphones,
  Orbit,
  Sparkles,
} from 'lucide-react';
import type { Interest } from '@/lib/types';
import './interest-gallery.css';

const categories = {
  film: { name: 'Cine', icon: Clapperboard, accent: '#a6462c', wash: '#fff0e6' },
  anime: { name: 'Anime', icon: Sparkles, accent: '#7548b1', wash: '#f2eaff' },
  book: { name: 'Manga & novelas', icon: BookOpen, accent: '#806127', wash: '#faf1dd' },
  stars: { name: 'Universo', icon: Orbit, accent: '#3a67af', wash: '#e9f0ff' },
  gamepad: { name: 'Gaming', icon: Gamepad2, accent: '#286e58', wash: '#e5f3e9' },
  music: { name: 'Música', icon: Headphones, accent: '#a43c67', wash: '#ffedf3' },
  camera: { name: 'Fotografía', icon: Camera, accent: '#2c6c78', wash: '#e7f3f5' },
  flag: { name: 'Fórmula 1', icon: Flag, accent: '#ae4436', wash: '#ffebe5' },
};

export default function InterestGallery({
  interests,
  onOpen,
}: {
  interests: Interest[];
  onOpen: (interest: Interest) => void;
}) {
  const [active, setActive] = useState(0);
  const interest = interests[active] || interests[0];
  if (!interest) return null;
  const category = categories[interest.icon];
  const CategoryIcon = category.icon;
  return (
    <section
      className="universe-gallery"
      id="universo"
      style={
        { '--interest-accent': category.accent, '--interest-wash': category.wash } as CSSProperties
      }
    >
      <div className="section-shell">
        <div className="universe-eyebrow" data-reveal>
          <span>03 / FUERA DEL EDITOR</span>
          <span>
            <span className="universe-status-dot" /> LO QUE ME MUEVE
          </span>
        </div>
        <div className="universe-heading" data-reveal>
          <h2>
            OTROS
            <br />
            <span>UNIVERSOS.</span>
            <Asterisk aria-hidden="true" />
          </h2>
          <div className="universe-heading-note">
            <span>NO TODO ES CÓDIGO.</span>
            <p>
              Historias que me atrapan.
              <br />
              Canciones en bucle. Una partida más.
            </p>
            <small>Un poco más de lo que soy.</small>
          </div>
        </div>
        <div className="universe-category-list" aria-label="Explorar mis intereses">
          {interests.map((item, index) => {
            const detail = categories[item.icon];
            const Icon = detail.icon;
            return (
              <button
                key={item.id}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
                style={
                  { '--tab-accent': detail.accent, '--tab-wash': detail.wash } as CSSProperties
                }
              >
                <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                <span>{detail.name}</span>
              </button>
            );
          })}
        </div>
        <div className={`universe-feature universe-feature-${interest.icon}`} key={interest.id}>
          <div className="universe-art">
            {interest.image && <img src={interest.image} alt={interest.title} loading="lazy" />}
            <span className="universe-art-stamp">
              <CategoryIcon size={17} /> EN MI ÓRBITA
            </span>
            <div className="universe-art-title" aria-hidden="true">
              <span>VOL. {String(active + 1).padStart(2, '0')}</span>
              <strong>{category.name}</strong>
            </div>
          </div>
          <div className="universe-story">
            <span className="universe-story-label">
              <CategoryIcon size={16} aria-hidden="true" /> MI SELECCIÓN PERSONAL
            </span>
            <h3>{interest.title}</h3>
            <p>{interest.description}</p>
            <ul className="universe-favorites">
              {interest.favorites.slice(0, 4).map((favorite, index) => (
                <li key={favorite}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{favorite}</strong>
                </li>
              ))}
            </ul>
            <button className="universe-open" onClick={() => onOpen(interest)}>
              Ver mis favoritos <span>{String(interest.favorites.length).padStart(2, '0')}</span>
              <ArrowUpRight size={19} />
            </button>
          </div>
        </div>
        <div className="universe-footnote">
          <span>GUSTOS DISTINTOS. LA MISMA CURIOSIDAD.</span>
          <span>
            {String(active + 1).padStart(2, '0')}{' '}
            <span>/ {String(interests.length).padStart(2, '0')}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
