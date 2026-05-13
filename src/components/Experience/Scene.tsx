'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@/hooks/useScroll';
import { 
  PerspectiveCamera, 
  Float, 
  Stars, 
  MeshDistortMaterial, 
  Environment,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';

export default function Scene() {
  const scroll = useScroll();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mainMeshRef = useRef<THREE.Mesh>(null);
  
  const smoothScroll = useRef(0);

  // Floating particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particlesRef = useRef<THREE.InstancedMesh>(null);

  useFrame((state) => {
    smoothScroll.current = THREE.MathUtils.lerp(
      smoothScroll.current,
      scroll.offset,
      0.05
    );

    const offset = smoothScroll.current;
    const time = state.clock.getElapsedTime();
    
    // Dynamic Camera
    if (cameraRef.current) {
      cameraRef.current.position.z = THREE.MathUtils.lerp(50, 8, offset);
      cameraRef.current.position.y = Math.sin(time * 0.2) * 2 + (offset * -10);
      cameraRef.current.position.x = Math.cos(time * 0.2) * 5;
      cameraRef.current.lookAt(0, offset * -5, 0);
    }

    // Main Mesh Animation
    if (mainMeshRef.current) {
      mainMeshRef.current.rotation.x = time * 0.2;
      mainMeshRef.current.rotation.y = time * 0.3;
      mainMeshRef.current.position.y = Math.sin(time * 0.5) * 0.5;
      
      // Scale pulse based on scroll
      const s = 1 + Math.sin(offset * Math.PI) * 0.5;
      mainMeshRef.current.scale.set(s, s, s);

      // Color lerp
      const colorA = new THREE.Color('#ffffff');
      const colorB = new THREE.Color('#6366f1');
      const colorC = new THREE.Color('#ff0055');
      
      let finalColor = colorA;
      if (offset < 0.5) {
        finalColor = colorA.lerp(colorB, offset * 2);
      } else {
        finalColor = colorB.lerp(colorC, (offset - 0.5) * 2);
      }
      
      if (mainMeshRef.current.material instanceof THREE.MeshStandardMaterial) {
        mainMeshRef.current.material.color.copy(finalColor);
      }
    }

    // Animate Particles (Wave/Frequency Effect)
    particles.forEach((particle, i) => {
      const { speed, xFactor, yFactor, zFactor } = particle;
      particle.t += speed / 2;
      const t = particle.t;
      
      // Wave motion
      const wave = Math.sin(t + xFactor * 0.1) * (1 + offset * 5);
      
      dummy.position.set(
        xFactor,
        yFactor + wave,
        zFactor + Math.cos(t + yFactor * 0.1) * 2
      );
      
      const s = (Math.cos(t) + 1.5) * 0.5;
      dummy.scale.set(s, s, s);
      dummy.rotation.set(t, t, t);
      dummy.updateMatrix();
      if (particlesRef.current) particlesRef.current.setMatrixAt(i, dummy.matrix);
    });
    if (particlesRef.current) particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 20]} fov={40} />
      
      <Environment preset="city" />
      <ambientLight intensity={0.1} />
      <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" castShadow intensity={2} />
      <pointLight position={[-20, -20, -20]} color="red" intensity={3} />
      <pointLight position={[0, 10, 0]} color="blue" intensity={2} />

      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh ref={mainMeshRef} castShadow>
            <torusKnotGeometry args={[2, 0.6, 256, 32]} />
            <MeshDistortMaterial
              color="#ffffff"
              speed={2}
              distort={0.4}
              radius={1}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>

        <instancedMesh ref={particlesRef} args={[undefined, undefined, 100]}>
          <dodecahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={2} />
        </instancedMesh>
      </group>

      <Stars radius={150} depth={50} count={7000} factor={6} saturation={0} fade speed={2} />
      
      <ContactShadows 
        position={[0, -10, 0]} 
        opacity={0.4} 
        scale={40} 
        blur={2} 
        far={15} 
        resolution={256} 
        color="#000000" 
      />
    </>
  );
}
