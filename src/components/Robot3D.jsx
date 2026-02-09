import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

const TIPS = [
  "Need a teammate? Click me!",
  "Browse 50+ Hackathons!",
  "Build your dream team now."
];

const Robot = () => {
  const headRef = useRef();
  const groupRef = useRef();
  const rightArmRef = useRef();
  const navigate = useNavigate();
  const { viewport } = useThree();
  
  const [hovered, setHovered] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [isWaving, setIsWaving] = useState(false);

  // Responsive Scale Calculation
  // Base scale on viewport width to fit smaller screens
  const scale = viewport.width < 5 ? 0.7 : 0.9;
  // Lower the robot slightly to ensure speech bubble is visible
  const positionY = -1.0; 

  // Cycle tips
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Listen for global clicks to trigger wave
  useEffect(() => {
    const handleGlobalClick = () => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2000);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Floating animation
    if (groupRef.current) {
        // Apply responsive position + float
       groupRef.current.position.y = positionY + Math.sin(t * 1) * 0.1;
    }

    // Head tracking mouse
    if (headRef.current) {
        const targetX = state.mouse.x * 0.3;
        const targetY = state.mouse.y * 0.3;
        
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY, 0.1);
    }

    // Waving Animation (Right Arm)
    if (rightArmRef.current) {
        if (isWaving) {
            const waveAngle = Math.sin(t * 15) * 0.6; 
            const targetZ = 2.2 + waveAngle; 
            rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, targetZ, 0.1);
        } else {
            rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.3, 0.1);
        }
    }
  });

  // Materials
  const whiteMaterial = <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />;
  const blueMaterial = <meshStandardMaterial color="#2563eb" roughness={0.2} metalness={0.3} />;
  const blackMaterial = <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />;
  const glowMaterial = <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={3} toneMapped={false} />;

  return (
    <group 
        ref={groupRef} 
        dispose={null}
        scale={scale} // Apply responsive scale
        position={[0, positionY, 0]} // Apply lowered position
        onClick={(e) => {
            e.stopPropagation();
            navigate('/teammaker');
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
    >
      {/* Speech Bubble */}
      <Html position={[0, 2.4, 0]} center className="pointer-events-none">
        <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '10px 20px',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#1e293b',
            transform: `scale(${hovered ? 1.1 : 1})`,
            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            pointerEvents: 'none',
            border: '2px solid #3b82f6'
        }}>
            {isWaving ? "Hello there! 👋" : TIPS[tipIndex]}
            <div style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid #3b82f6'
            }} />
        </div>
      </Html>

      {/* --- HEAD GROUP --- */}
      <group ref={headRef} position={[0, 1.45, 0]}>
        {/* Main Head Shape - Slightly wider and smoother */}
        <RoundedBox args={[1.3, 1.0, 1.0]} radius={0.3} smoothness={8}>
            {whiteMaterial}
        </RoundedBox>

        {/* Headphones Band */}
        <mesh position={[0, 0.55, 0]}>
            <torusGeometry args={[0.7, 0.08, 16, 48, Math.PI]} />
            {blueMaterial}
        </mesh>
        
        {/* Ear Cups - Cleaner Cylinder */}
        <mesh position={[-0.75, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.15, 32]} />
            <meshStandardMaterial color="#1e293b" />
        </mesh>
         <mesh position={[-0.83, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
            {glowMaterial}
        </mesh>

        <mesh position={[0.75, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.15, 32]} />
            <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0.83, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
             <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
             {glowMaterial}
        </mesh>


        {/* Face Screen - Moved forward to prevent glitching */}
        <mesh position={[0, 0, 0.51]}>
             <planeGeometry args={[0.9, 0.6]} />
             {blackMaterial}
        </mesh>
        
        {/* Face Bezel/Frame (Optional depth) */}
        <mesh position={[0, 0, 0.505]}>
             <boxGeometry args={[0.95, 0.65, 0.01]} />
             <meshStandardMaterial color="#000" />
        </mesh>

        {/* Eyes - Brighter and larger */}
        <mesh position={[-0.25, 0.05, 0.52]}>
            <capsuleGeometry args={[0.09, 0.18, 4, 16]} />
            {glowMaterial}
        </mesh>
        <mesh position={[0.25, 0.05, 0.52]}>
             <capsuleGeometry args={[0.09, 0.18, 4, 16]} />
            {glowMaterial}
        </mesh>
        
        {/* Smile - Simpler */}
        <mesh position={[0, -0.18, 0.52]} rotation={[0,0,Math.PI/2]}>
             <capsuleGeometry args={[0.03, 0.1, 4, 8]} />
             {glowMaterial}
        </mesh>
      </group>

      {/* --- BODY --- */}
      <group position={[0, 0, 0]}>
         {/* Main Torso - Cleaner Capsule */}
         <mesh position={[0, 0.2, 0]}>
             <capsuleGeometry args={[0.6, 0.75, 8, 32]} /> 
             {whiteMaterial}
         </mesh>

         {/* Blue Stripe - Slightly thicker and distinct */}
         <mesh position={[0, 0.15, 0]}>
             <cylinderGeometry args={[0.61, 0.61, 0.2, 32]} />
             {blueMaterial}
         </mesh>
         
         {/* Neck */}
         <mesh position={[0, 0.8, 0]}>
             <cylinderGeometry args={[0.3, 0.3, 0.4]} />
             <meshStandardMaterial color="#333" />
         </mesh>
         
         {/* Bottom Thruster */}
         <mesh position={[0, -0.45, 0]}>
             <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
             {blueMaterial}
         </mesh>
         <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.1, 0.0, 0.3, 16]} />
            {glowMaterial} 
         </mesh>
      </group>

      {/* --- ARMS --- */}
      
      {/* Left Arm (Idle) */}
      <group position={[-0.85, 0.35, 0]} rotation={[0, 0, 0.2]}>
         <mesh position={[0, 0, 0]}>
             <sphereGeometry args={[0.18]} />
             {blueMaterial}
         </mesh>
         <mesh position={[-0.1, -0.4, 0]} rotation={[0, 0, -0.1]}>
             <capsuleGeometry args={[0.08, 0.6, 4, 16]} />
             {blackMaterial}
         </mesh>
         <mesh position={[-0.2, -0.75, 0]} rotation={[0, 0, -0.1]}>
             <cylinderGeometry args={[0.14, 0.16, 0.2]} />
             {blueMaterial}
         </mesh>
         <mesh position={[-0.22, -0.9, 0]}>
             <sphereGeometry args={[0.14]} />
             {whiteMaterial}
         </mesh>
      </group>

      {/* Right Arm (Waving) */}
      <group ref={rightArmRef} position={[0.85, 0.35, 0]} rotation={[0, 0, -0.2]}>
         <mesh position={[0, 0, 0]}>
             <sphereGeometry args={[0.18]} />
             {blueMaterial}
         </mesh>
         
         <group position={[0, 0, 0]}> 
            <mesh position={[0.1, -0.4, 0]} rotation={[0, 0, 0.1]}>
                <capsuleGeometry args={[0.08, 0.6, 4, 16]} />
                {blackMaterial}
            </mesh>
            <mesh position={[0.2, -0.75, 0]} rotation={[0, 0, 0.1]}>
                <cylinderGeometry args={[0.14, 0.16, 0.2]} />
                {blueMaterial}
            </mesh>
            <mesh position={[0.22, -0.9, 0]}>
                <sphereGeometry args={[0.14]} />
                {whiteMaterial}
            </mesh>
         </group>
      </group>

    </group>
  );
};


const Robot3D = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        
        {/* Brighter Lighting Setup */}
        <ambientLight intensity={0.9} /> {/* Increased baseline brightness */}
        <spotLight 
            position={[10, 10, 10]} 
            angle={0.25} 
            penumbra={1} 
            intensity={1.5} 
            castShadow 
            shadow-bias={-0.0001}
        />
        <directionalLight position={[-5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[0, -2, 2]} intensity={0.5} color="blue" /> {/* Up-lighting */}
        
        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* The Robot Model */}
        <Robot />
        
        {/* Shadows */}
        <ContactShadows position={[0, -1.8, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#000000" />
        
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/2.5} maxPolarAngle={Math.PI/2} />
      </Canvas>
    </div>
  );
};

export default Robot3D;
