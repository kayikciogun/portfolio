'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Player from '@vimeo/player';
import './VimeoShowcase.css';

interface VimeoShowcaseProps {
  vimeoId: string;
  title?: string;
  sectionId?: string;
  className?: string;
}

export default function VimeoShowcase({
  vimeoId,
  className = '',
}: VimeoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const isActiveRef = useRef(false);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Vimeo Player and run Silent Pre-Buffer Warmup
  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous player if any
    if (playerRef.current) {
      playerRef.current.destroy().catch(() => {});
    }

    // Initialize with autopause: false so scrolling/playing other sections never interrupts buffering
    const player = new Player(containerRef.current, {
      id: parseInt(vimeoId, 10) || 824804225,
      controls: false,
      loop: true,
      muted: true,
      autopause: false, // CRITICAL: allows simultaneous preloading without Vimeo pausing background instances
      dnt: true,
      title: false,
      byline: false,
      portrait: false,
    });

    playerRef.current = player;

    player.ready().then(() => {
      // SILENT PRE-BUFFER WARMUP:
      // Trigger play() immediately in background to force the browser's Media Source Extensions (MSE)
      // to download and cache the video chunks right on page load (`buffer a alması`).
      player.play().then(() => {
        // Monitor buffer depth until we have cached video frames
        checkIntervalRef.current = setInterval(async () => {
          try {
            const buffered = await player.getBuffered();
            if (buffered && buffered.length > 0 && buffered[0].end >= 0.5) {
              if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);

              // If the user has not scrolled to this section yet, pause right at time 0
              // so when they scroll down, playback begins instantaneously at 0ms delay (`bekletmeyecek`).
              if (!isActiveRef.current) {
                await player.pause();
                await player.setCurrentTime(0);
                setIsPlaying(false);
              } else {
                setIsPlaying(true);
              }
            }
          } catch {
            // Ignore temporary buffer check errors
          }
        }, 150);
      }).catch(() => {
        // Autoplay policy fallback
      });
    }).catch(err => {
      console.warn('Vimeo player ready error:', err);
    });

    // Listeners for telemetry state
    player.on('play', () => setIsPlaying(true));
    player.on('pause', () => setIsPlaying(false));

    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
      if (playerRef.current) {
        playerRef.current.destroy().catch(() => {});
      }
    };
  }, [vimeoId]);

  // Scroll-Driven Intersection Observer (`aşağı kaydıkça bir diğer play olacak`)
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting && entry.intersectionRatio >= 0.2;
          isActiveRef.current = inView;

          if (!playerRef.current) return;

          if (inView) {
            // Section scrolled into view! Play immediately from preloaded cache.
            playerRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {});
          } else {
            // Scrolled away: smoothly pause to free resources for the active section.
            playerRef.current.pause().then(() => {
              setIsPlaying(false);
            }).catch(() => {});
          }
        });
      },
      {
        threshold: [0.1, 0.25, 0.5, 0.75],
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Overlay Mute/Unmute Handler
  const toggleMute = useCallback(async () => {
    if (!playerRef.current) return;
    try {
      const nextMuted = !isMuted;
      await playerRef.current.setMuted(nextMuted);
      setIsMuted(nextMuted);
    } catch (err) {
      console.error(err);
    }
  }, [isMuted]);

  return (
    <div className={`vimeo-showcase-wrapper ${className} ${isPlaying ? 'is-active' : ''}`}>
      <div className="vimeo-viewport">
        <div ref={containerRef} className="vimeo-iframe-container" />
        
        {/* Subtle glow border inside viewport */}
        <div className="vimeo-glow-overlay" />

        {/* Minimalist Overlay Unmute / Mute Toggle Button */}
        <button 
          onClick={toggleMute} 
          className={`vimeo-unmute-overlay-btn ${!isMuted ? 'audio-active' : ''}`}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          <span className="unmute-icon">{isMuted ? '🔇' : '🔊'}</span>
        </button>
      </div>
    </div>
  );
}
