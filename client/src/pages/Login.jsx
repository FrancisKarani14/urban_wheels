import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Centered form container */}
      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:py-16 md:py-20">
        <form 
          className="bg-gray-800 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-700"
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-[#FFD230] mb-6">
            Login to your Account
          </h1>

          <div className="flex flex-col space-y-4">
            <input 
              type="text" 
              placeholder="Username"
              className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD230]"
            />
            <input 
              type="password" 
              placeholder="Password"
              className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD230]"
            />
            <button 
              type="submit" 
              className="mt-2 bg-[#05DF72] text-gray-900 font-semibold py-2 rounded-lg hover:bg-[#04c564] transition-all"
            >
              Login
            </button>
          </div>

          {/* Signup link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link 
              to="/signup" 
              className="text-[#FFD230] hover:text-[#05DF72] font-medium transition-all"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  )
}
