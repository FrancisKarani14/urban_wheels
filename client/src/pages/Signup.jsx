import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function Signup() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.access_token); // ✅ store token via context
        setSuccess('Account created successfully!');
        setTimeout(() => navigate('/dashboard'), 1000); // redirect after 1s
      } else {
        setError(data.message || 'Failed to register');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Network error — please try again later');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Centered form container */}
      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:py-16 md:py-20">
        <form 
          onSubmit={handleSubmit}
          className="bg-gray-800 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-700"
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-[#FFD230] mb-6">
            Create an Account
          </h1>

          <div className="flex flex-col space-y-4">
            <input 
              type="text" 
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD230]"
            />
            <input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD230]"
            />
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 pr-12 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD230]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 pr-12 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD230]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button 
              type="submit" 
              className="mt-2 bg-[#05DF72] text-gray-900 font-semibold py-2 rounded-lg hover:bg-[#04c564] transition-all"
            >
              Sign Up
            </button>
          </div>

          {/* Success/Error messages */}
          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
          {success && <p className="text-green-400 text-center mt-4">{success}</p>}

          {/* Login link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-[#FFD230] hover:text-[#05DF72] font-medium transition-all"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}
