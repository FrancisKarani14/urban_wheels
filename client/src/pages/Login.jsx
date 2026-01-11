import React, { useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../components/AuthContext'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (res.ok) {
        // ✅ Save token and user info
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('user_email', username) // Store username as email

        // ✅ Update auth context (if used)
        login(data.access_token)

        // ✅ Redirect after successful login
        navigate('/dashboard')
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Something went wrong. Try again.')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:py-16 md:py-20">
        <form 
          onSubmit={handleSubmit}
          className="bg-gray-800 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-700"
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-[#FFD230] mb-6">
            Login to your Account
          </h1>

          <div className="flex flex-col space-y-4">
            <input 
              type="text" 
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD230]"
              required
            />
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-12 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD230]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button 
              type="submit" 
              className="mt-2 bg-[#05DF72] text-gray-900 font-semibold py-2 rounded-lg hover:bg-[#04c564] transition-all"
            >
              Login
            </button>

            {/* Error message */}
            {error && (
              <p className="text-center text-red-400 text-sm mt-2">{error}</p>
            )}
          </div>

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
