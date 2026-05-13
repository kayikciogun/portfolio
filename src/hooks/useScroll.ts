'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScroll() {
  const scrollRef = useRef({ offset: 0 });

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollRef.current.offset = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return scrollRef.current;
}
