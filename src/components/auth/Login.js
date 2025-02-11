import React, { useRef, useState } from 'react';
import { validateData } from '../../utils/validation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {auth} from "../../utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/userSlice';
import Header from '../layouts/Header';
import netflixBgImage from '../../assets/images/netflix-main-bg-img.jpg';

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const name = useRef(null);
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

           updateProfile(user, {
             displayName: name.current.value
           }).then(() => {
              const {displayName, email, uid} = auth.currentUser;
              dispatch(addUser({ displayName: displayName, email: email, uid: uid}));
           // Profile updated successfully
          }).catch((error) => {
            setErrorMsg(error.message);
        })
        }).catch((error) => {
          setErrorMsg(error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
        })
        .catch((error) => {
          setErrorMsg(error.message);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <img
          src={netflixBgImage} // Path to the image in the public folder
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
              ref={name}
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
    </div>
  );
};

export default Login;
