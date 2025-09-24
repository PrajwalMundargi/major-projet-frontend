'use client'
import { useState } from 'react';
import {useRouter} from 'next/navigation';
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Sign Up:', { username, email, password });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #A18CFF 0%, #6A4CFF 50%, #5A3ED6 100%)',
          zIndex: -3,
        }}
      />

      {/* Accent shapes */}
      <svg
        className="absolute top-10 left-10 w-80 h-80 opacity-60"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="50" fill="#CBB7FF" stroke="#FFFFFF" strokeWidth="3" />
        <circle cx="140" cy="140" r="50" fill="#4B2E83" stroke="#FFFFFF" strokeWidth="3" />
      </svg>
      <svg
        className="absolute bottom-10 right-10 w-96 h-96 opacity-60"
        viewBox="0 0 250 250"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 50 Q100 15 150 60 T230 70 L230 230 L15 230 Z"
          fill="#472C82"
          stroke="#FFFFFF"
          strokeWidth="2"
          opacity="0.8"
        />
      </svg>

      {/* Signup form container */}
      <div className="flex w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden z-10">
        <div className="w-2/3 flex flex-col justify-center items-center p-10 bg-gradient-to-br from-purple-700 to-purple-400 text-white">
          <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
          <p className="text-center">Create an account to start your journey with us.</p>
        </div>
        <div className="w-1/3 p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h3>
          <form onSubmit={handleSignup} className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <button type="submit" className="w-full py-2 bg-purple-700 text-white font-semibold rounded hover:bg-purple-800 transition">
              Sign Up
            </button>
            <div className="mt-3 text-center text-gray-600 text-sm">
              Already registered?{' '}
            <Link href="/login" className="text-purple-700 font-semibold">
              Sign in now
            </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
