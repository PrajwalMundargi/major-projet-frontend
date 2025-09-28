'use client'
import { useState, Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF, ContactShadows } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a as three } from '@react-spring/three'
import Link from 'next/link'
import * as THREE from 'three'

// 3D Laptop Model
function Model({ open, hinge }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/mac-draco.glb')
  const [hovered, setHovered] = useState(false)

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
    <group
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <three.group rotation-x={hinge} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
          <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
          <mesh material={materials['screen.001']} geometry={nodes['Cube008_2'].geometry} />
        </group>
      </three.group>
      <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
        <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
      </group>
      <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
    </group>
  )
}

// Main Signup Page
export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)
  const props = useSpring({ open: Number(open) })

  const handleSignup = (e) => {
    e.preventDefault()
    console.log('Sign Up:', { username, email, password })
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-sm"
        style={{ background: 'linear-gradient(135deg, #24292e 50%, #fafbfc 10%)', zIndex: -3 }}
      />

      {/* Accent shapes */}
      <svg className="absolute top-10 left-10 w-80 h-80 rounded-full bg-green-500/20 blur-3xl animate-pulse" viewBox="0 0 200 200">
        <circle cx="140" cy="140" r="50" fill="#079e5fff" stroke="#FFFFFF" strokeWidth="3" />
      </svg>
      <svg className="absolute top-20 left-20 w-72 h-72 rounded-full bg-green-500/20 blur-3xl animate-pulse" viewBox="0 0 250 250">
        <circle cx="140" cy="140" r="100" fill="#06b25cff" stroke="#060000ff" strokeWidth="4" />
      </svg>
      <svg className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-green-500/20 blur-3xl animate-pulse" viewBox="0 0 250 250">
        <circle cx="140" cy="140" r="50" fill="#03c220ff" stroke="#029a1bff" strokeWidth="4" />
      </svg>

      {/* Signup form container */}
      <div className="flex w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden z-10">
        {/* Left-side 3D Laptop */}
        <div className="relative w-2/3 flex flex-col justify-center items-center p-10 rounded-lg overflow-hidden">
          <div className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-r from-green-200 via-green-500 to-green-700 animate-border">
            <div className="w-full h-full bg-zinc-900 rounded-lg"></div>
          </div>

          {/* Welcome Message */}
          <div className="z-10 mb-4 text-center">
            <h2 className="text-3xl font-bold text-white">Welcome!</h2>
            <p className="text-white text-sm">Let's Prepare for the summer!!</p>
          </div>

          <Canvas className="w-full h-96 z-10">
            <Suspense fallback={null}>
              <group scale={[0.65, 0.65, 0.2]}>
                <Model open={open} hinge={props.open.to([0, 1], [1.575, -0.425])} />
              </group>
              <Environment preset="city" />
              <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={1.75} far={4.5} />
            </Suspense>
          </Canvas>
        </div>

        {/* Form div with animated border */}
        <div
          className="relative w-1/3 p-10 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => setOpen(true)} // laptop opens permanently
        >
          <div className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-r from-green-200 via-green-500 to-green-700 animate-border">
            <div className="w-full h-full bg-white rounded-lg"></div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center z-10 relative">Sign Up</h3>
          <form onSubmit={handleSignup} className="space-y-5 relative z-10">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="text-black border-black w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black-600 transition duration-300 ease-in-out"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="text-black border-black w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black-600"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="text-black border-black w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black-600"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-green-700 text-white font-semibold rounded hover:bg-green-800 hover:text-white transition"
            >
              Sign Up
            </button>
            <div className="mt-3 text-center text-gray-600 text-sm">
              Already registered?{' '}
              <Link href="/login" className="text-zinc-900 font-semibold">
                Sign in now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
