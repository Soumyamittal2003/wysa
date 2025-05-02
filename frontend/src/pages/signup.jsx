import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate for navigation
import axios from 'axios';  // Importing axios for making API calls

const NicknameScreen = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);  // State to manage loading
  const [showPassword, setShowPassword] = useState(false);  // Toggle password visibility
  const navigate = useNavigate();

  // Handle the change in the nickname input
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // Handle the change in the password input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle signup
  const handleContinue = async () => {
    if (!nickname || !password) {
      setMessage('Please enter both nickname and password.');
      return;
    }

    setLoading(true);  // Set loading state to true while the request is in progress
    setMessage('');  // Clear previous error message

    try {
      // Send nickname and password to the backend for signup
      const response = await axios.post('http://localhost:5000/users/signup', { nickname, password },{ withCredentials: true } );
      setMessage(response.data.message);
      
      // After successful signup, store the nickname in localStorage
      localStorage.setItem('nickname', nickname);

      // Navigate to the next screen
      navigate('/intro');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error during signup');
    } finally {
      setLoading(false);  // Set loading state back to false once the request is complete
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b1d] text-white flex flex-col justify-between px-6 py-8">
      {/* Main Content */}
      <div className="mt-20 flex flex-col items-center space-y-6 text-center">
        <h1 className="text-2xl font-semibold">
          Hey! I'm <span className="text-cyan-400 font-bold">wysa</span>
        </h1>

        <p className="text-base text-white max-w-md">
          Our conversations are private & anonymous, so there is no login.
          <br />
          Just choose a nickname and set a password to get started.
        </p>

        {/* Nickname Input */}
        <div className="relative mt-8 w-full max-w-md">
          <input
            type="text"
            placeholder="Choose a nickname..."
            value={nickname}
            onChange={handleNicknameChange}  // Update nickname state on change
            className="w-full pl-16 pr-4 py-3 rounded-full bg-gray-100 text-gray-700 focus:outline-none placeholder-gray-500 shadow"
          />
        </div>

        {/* Password Input */}
        <div className="relative mt-4 w-full max-w-md">
          <input
            type={showPassword ? 'text' : 'password'}  // Toggle password visibility
            placeholder="Set a password..."
            value={password}
            onChange={handlePasswordChange}  // Update password state on change
            className="w-full pl-16 pr-4 py-3 rounded-full bg-gray-100 text-gray-700 focus:outline-none placeholder-gray-500 shadow"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}  // Toggle password visibility
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}  // Handle continue button click
          className="mt-6 px-8 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500"
          disabled={loading}  // Disable the button while loading
        >
          {loading ? 'Loading...' : 'Continue'}
        </button>

        {/* Display message or errors */}
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>

      {/* Footer Legal Text */}
      <p className="text-center text-sm text-gray-300 px-4 leading-relaxed">
        By continuing, I confirm I am 13 or older and accept the{' '}
        <span className="text-cyan-300 underline cursor-pointer">
          Terms of Service
        </span>{' '}
        and{' '}
        <span className="text-cyan-300 underline cursor-pointer">
          Privacy Policy
        </span>
        .
      </p>
    </div>
  );
};

export default NicknameScreen;
