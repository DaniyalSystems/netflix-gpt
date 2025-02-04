import React, { useState } from 'react';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <img
        src="images/netflix-main-bg-img.jpg" // Path to the image in the public folder
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
  
      {/* Overlay to make the form more readable */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  
      {/* Form Container */}
      <div className="relative z-10 bg-black bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
  
        { !isSignInForm && ( <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-white">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="mt-1 block w-full px-4 py-2 border border-white shadow-sm bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
  
        <p
          onClick={toggleForm}
          className="mt-4 text-center text-sm text-white cursor-pointer hover:underline"
        >
          {isSignInForm ? "Don't have an account? Sign up" : "Already registered? Sign In"}
        </p>
      </div>
    </div>
  );  
};

export default Login;