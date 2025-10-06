'use client'
import { useState, Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// 3D Laptop Model
function Model({ open }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/mac-draco.glb')

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      open ? Math.cos(t / 10) / 10 + 0.25 : 0,
      0.1
    )
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      open ? Math.sin(t / 10) / 4 : 0,
      0.1
    )
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      open ? Math.sin(t / 10) / 10 : 0,
      0.1
    )
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      open ? (-2 + Math.sin(t)) / 3 : -4.3,
      0.1
    )
  })

  return (
    <group ref={group}>
      <group rotation-x={open ? -0.425 : 1.575} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
          <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
          <mesh material={materials['screen.001']} geometry={nodes['Cube008_2'].geometry} />
        </group>
      </group>
      <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
        <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
      </group>
      <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
    </group>
  )
}

// Main Page
export default function SignupPage() {
   const [open] = useState(true)
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-sm"
        style={{ background: 'linear-gradient(135deg, #24292e 50%, #fafbfc 10%)', zIndex: -3 }}
      />

      {/* Accent circles */}
      <svg className="absolute top-10 left-10 w-80 h-80 rounded-full bg-green-500/20 blur-3xl animate-pulse" viewBox="0 0 200 200">
        <circle cx="140" cy="140" r="50" fill="#079e5fff" stroke="#FFFFFF" strokeWidth="3" />
      </svg>
      <svg className="absolute top-20 left-20 w-72 h-72 rounded-full bg-green-500/20 blur-3xl animate-pulse" viewBox="0 0 250 250">
        <circle cx="140" cy="140" r="100" fill="#06b25cff" stroke="#060000ff" strokeWidth="4" />
      </svg>
      <svg className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-green-500/20 blur-3xl animate-pulse" viewBox="0 0 250 250">
        <circle cx="140" cy="140" r="50" fill="#03c220ff" stroke="#029a1bff" strokeWidth="4" />
      </svg>

      {/* Container */}
      <div className="flex w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden z-10">
        {/* Left: Laptop */}
        <div className="relative w-2/3 flex flex-col justify-center items-center p-10 rounded-lg overflow-hidden">
          <div className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-r from-green-200 via-green-500 to-green-700 animate-border">
            <div className="w-full h-full bg-zinc-900 rounded-lg"></div>
          </div>

          <div className="z-10 mb-4 text-center">
            <h2 className="text-3xl font-bold text-white">Welcome!</h2>
            <p className="text-white text-sm">Let's Prepare for the Summer!!</p>
          </div>

          <Canvas className="w-full h-96 z-10">
            <Suspense fallback={null}>
              <group scale={[0.65, 0.65, 0.2]}>
                <Model open={open} />
              </group>
              <Environment preset="city" />
              <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={1.75} far={4.5} />
            </Suspense>
          </Canvas>
        </div>

        {/* Right: GitHub Auth Card */}
        <div
          className="relative w-1/3 p-10 rounded-lg overflow-hidden flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-r from-green-200 via-green-500 to-green-700 animate-border">
            <div className="w-full h-full bg-white rounded-lg"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* GitHub Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="black"
              className="mb-4"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.112.82-.262.82-.582 
              0-.288-.01-1.05-.016-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.385-1.334-1.754-1.334-1.754-1.09-.744.084-.729.084-.729 
              1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.42-1.305.763-1.605-2.665-.3-5.467-1.334-5.467-5.932 
              0-1.31.468-2.382 1.235-3.222-.123-.302-.535-1.52.117-3.176 0 0 1.008-.323 3.3 1.23a11.47 11.47 0 013.003-.404c1.02.005 
              2.047.137 3.003.404 2.29-1.553 3.297-1.23 3.297-1.23.653 1.656.242 2.874.12 3.176.77.84 
              1.234 1.912 1.234 3.222 0 4.61-2.807 5.628-5.48 5.922.43.37.823 1.102.823 2.222 
              0 1.606-.015 2.9-.015 3.293 0 .322.217.7.825.58C20.565 21.796 24 17.297 24 12 
              24 5.37 18.63 0 12 0z" />
            </svg>

            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
              Authorize with GitHub
            </h3>

            <button
              onClick={() => window.location.href = "http://127.0.0.1:5000/authorize"}
              className="w-full py-2 bg-black text-white font-semibold rounded hover:bg-gray-800 transition"
            >
              Authenticate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
