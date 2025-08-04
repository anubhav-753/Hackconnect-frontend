// src/components/ThreeDObject.jsx
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber"; // Import Canvas and useFrame
import "./ThreeDObject.css"; // Will create this CSS file next

// Component that represents the 3D box itself
function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(() => (mesh.current.rotation.x += 0.01)); // Spin the box
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} /> {/* A standard box geometry */}
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />{" "}
      {/* Material with color */}
    </mesh>
  );
}

// Main component that sets up the 3D canvas
function ThreeDObject() {
  return (
    <div className="three-d-canvas-container">
      <Canvas>
        <ambientLight /> {/* Soft white light */}
        <pointLight position={[10, 10, 10]} /> {/* Light source */}
        <Box position={[-1.2, 0, 0]} /> {/* First box */}
        <Box position={[1.2, 0, 0]} /> {/* Second box */}
      </Canvas>
    </div>
  );
}

export default ThreeDObject;
