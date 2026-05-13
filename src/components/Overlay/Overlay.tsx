'use client';

import React from 'react';

const sections = [
  { 
    id: 'hero', 
    type: 'hero',
    title: 'OGÜN KAYIKÇI', 
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
    align: 'right'
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
    align: 'left'
  },
  { 
    id: 'work-3', 
    type: 'project',
    tag: 'SECTION 05 — ATM DESIGN',
    number: '03 / ATM DESIGN',
    title: 'SOUND DESIGN, AUTOMATED — 2025', 
    description: 'Your library, indexed by meaning. Vision models watch the scene. CLAP embeddings recall the right sound. Export to your DAW.',
    tech: 'CLAP · FAISS · OpenRouter · AAF/OTIO',
    align: 'right'
  },
  { 
    id: 'work-4', 
    type: 'project',
    tag: 'SECTION 06 — ECHOES OF EMBRACE',
    number: '04 / ECHOES OF EMBRACE',
    title: 'INTERACTIVE INSTALLATION', 
    description: 'Presence becomes composition. Sensors track touch and proximity. A generative score responds — never the same piece twice.',
    tech: 'TouchDesigner · ESP32 · Generative Audio',
    align: 'left'
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
          className={`section ${section.align} type-${section.type}`}
        >
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
        </section>
      ))}
    </div>
  );
}
