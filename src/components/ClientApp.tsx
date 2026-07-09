'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Experience = dynamic(() => import('@/components/Experience/Experience'), { ssr: false });
const Overlay = dynamic(() => import('@/components/Overlay/Overlay'), { ssr: false });

export default function ClientApp() {
  return (
    <main>
      <Experience />
      <Overlay />
    </main>
  );
}
