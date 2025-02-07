import React, { useRef, useState } from 'react';
import { validateData } from '../../utils/validation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../utils/firebase";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const email = useRef(null);
  const password = useRef(null);

  const submitForm = () => {
    const validationResponse = validateData(email.current.value, password.current.value);
    setErrorMsg(validationResponse);

    if (validationResponse) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMsg(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMsg(errorMessage);
        });
    }
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

        { !isSignInForm && (<div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-white">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            ref={email}
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            ref={password}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <p className='text-red-800 font-bold mb-2'>{errorMsg}</p>

        <button
          onClick={submitForm}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>

        <p
          onClick={toggleForm}
          className="mt-4 text-center text-sm text-white cursor-pointer hover:underline"
        >
          {isSignInForm ? "Don't have an account? Sign up" : 'Already registered? Sign In'}
        </p>
      </div>
    </div>
  );
};

export default Login;
