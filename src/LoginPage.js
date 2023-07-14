import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // You can implement your login logic here
    // For simplicity, we'll just check if the username and password are not empty
    if (username !== '' && password !== '') {
      setLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/job-list" />;
  }

  return (
    <div className="bg-purple-500 bg-opacity-10 flex items-center justify-center h-screen">
      <div className="bg-[#6a4cc6] shadow-lg rounded p-12 w-full max-w-md sm:mx-4">
        <div class="text-center">
          <h5 class="text-[18.5px] font-bold text-white">Welcome Back !</h5>
          <p class="mt-3 text-white/80">Sign in to continue to JobSearch.</p>
        </div>
        <form className="mt-8">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm  mb-2 text-white"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full mt-1 bg-violet-400/40 p-3 rounded border-transparent placeholder:text-sm placeholder:text-gray-50 text-white focus:outline-0"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm mb-2 text-white"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full mt-1 bg-violet-400/40 p-3 rounded border-transparent placeholder:text-sm placeholder:text-gray-50 text-white focus:outline-0"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="btn border-0 p-3 rounded w-full bg-white text-gray-900 font-medium border-transparent hover:-translate-y-1.5 duration-500 ease"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;