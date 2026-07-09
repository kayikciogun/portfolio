'use client';

import React from 'react';
import VimeoShowcase from '@/components/VimeoShowcase/VimeoShowcase';

interface SectionItem {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  description: string;
  align: string;
  tag?: string;
  number?: string;
  tech?: string;
  note?: string;
  link?: string;
  extra?: string;
  links?: string[];
  footer?: string;
  vimeoId?: string;
  videoTitle?: string;
}

const sections: SectionItem[] = [
  {
    id: 'hero',
    type: 'hero',
    title: 'OGUN KAYIKCI',
    subtitle: 'Interaction ARTIST & COMPOSER',
    description: 'Building at the intersection of touch, sound, and machine.',
    align: 'center'
  },
  {
    id: 'work-intro',
    type: 'intro',
    tag: 'SECTION 02 — WORK',
    title: 'SELECTED WORKS',
    description: 'Installations, instruments, and intelligent systems.',
    align: 'left'
  },
  {
    id: 'work-1',
    type: 'project',
    tag: 'SECTION 03 — A DOKUNMA',
    number: '01 / A DOKUNMA',
    title: 'CAPACITIVE CASHMERE — 2024',
    description: 'A curtain that listens through skin. Conductive thread woven into cashmere becomes an instrument. Touch the fabric, shape the sound.',
    tech: 'ESP32-S3 · MPR121 · Ableton Live · OSC',
    note: 'Commissioned by Selpak',
    align: 'right',
    vimeoId: '824804225',
    videoTitle: 'CAPACITIVE CASHMERE // SELPAK INSTALLATION'
  },
  {
    id: 'work-2',
    type: 'project',
    tag: 'SECTION 04 — IO-CAM',
    number: '02 / IO-CAM',
    title: 'AI-NATIVE CAM — ONGOING',
    description: 'Natural language to G-code. A web-based CAM platform that turns intent into machine paths. Fanuc and Heidenhain, spoken in plain English.',
    tech: 'Next.js · WASM · LLM · CNC',
    link: 'iocam.digital',
    align: 'left',
    vimeoId: '76979871',
    videoTitle: 'AI-NATIVE CAM // PATH GENERATION ENGINE'
  },
  {
    id: 'work-3',
    type: 'project',
    tag: 'SECTION 05 — ATM DESIGN',
    number: '03 / ATM DESIGN',
    title: 'SOUND DESIGN, AUTOMATED — 2025',
    description: 'Your library, indexed by meaning. Vision models watch the scene. CLAP embeddings recall the right sound. Export to your DAW.',
    tech: 'CLAP · FAISS · OpenRouter · AAF/OTIO',
    align: 'right',
    vimeoId: '347119375',
    videoTitle: 'ATM // AUDIO EMBEDDINGS & CLAP PIPELINE'
  },
  {
    id: 'work-4',
    type: 'project',
    tag: 'SECTION 06 — ECHOES OF EMBRACE',
    number: '04 / ECHOES OF EMBRACE',
    title: 'INTERACTIVE INSTALLATION',
    description: 'Presence becomes composition. Sensors track touch and proximity. A generative score responds — never the same piece twice.',
    tech: 'TouchDesigner · ESP32 · Generative Audio',
    align: 'left',
    vimeoId: '148751763',
    videoTitle: 'ECHOES // GENERATIVE AUDIO & TOUCHDESIGNER'
  },
  {
    id: 'about',
    type: 'about',
    tag: 'SECTION 07 — ABOUT',
    title: 'ABOUT',
    description: 'I build things that blur the line between fabric and firmware, score and software. Trained in sound, fluent in silicon — based in Istanbul.',
    extra: 'Available for installations, commissions, and technical collaborations.',
    align: 'center'
  },
  {
    id: 'contact',
    type: 'contact',
    tag: 'SECTION 08 — CONTACT',
    title: "LET'S BUILD",
    description: 'hello@[domain].com',
    links: ['INSTAGRAM', 'GITHUB', 'LINKEDIN'],
    footer: '© 2026 OGÜN Kayıkçı',
    align: 'center'
  },
];

export default function Overlay() {
  return (
    <div className="overlay">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`section ${section.align} type-${section.type} ${section.vimeoId ? 'has-video' : ''}`}
        >
          {/* If there's a video and align is right, place Vimeo card on the left side of flex */}
          {section.vimeoId && section.align === 'right' && (
            <VimeoShowcase
              vimeoId={section.vimeoId}
              title={section.videoTitle || section.title}
              sectionId={section.id}
              className="section-video-card align-left-video"
            />
          )}

          <div className="content-card">
            {section.tag && <span className="tag">{section.tag}</span>}
            {section.number && <div className="project-number">{section.number}</div>}
            <h1>{section.title}</h1>
            {section.subtitle && <h2>{section.subtitle}</h2>}
            <p className="description">{section.description}</p>

            {section.tech && (
              <div className="tech-stack">
                {section.tech}
              </div>
            )}

            {section.note && <div className="note">{section.note}</div>}
            {section.link && <div className="project-link">{section.link}</div>}
            {section.extra && <p className="extra-text">{section.extra}</p>}

            {section.type === 'hero' && (
              <div className="scroll-hint">SCROLL TO EXPLORE</div>
            )}

            {section.links && (
              <div className="social-links">
                {section.links.map(l => <span key={l}>{l}</span>)}
              </div>
            )}

            {section.footer && (
              <div className="footer-text">
                {section.footer}
              </div>
            )}
          </div>

          {/* If there's a video and align is left/center, place Vimeo card on the right side of flex */}
          {section.vimeoId && section.align !== 'right' && (
            <VimeoShowcase
              vimeoId={section.vimeoId}
              title={section.videoTitle || section.title}
              sectionId={section.id}
              className="section-video-card align-right-video"
            />
          )}
        </section>
      ))}
    </div>
  );
}
