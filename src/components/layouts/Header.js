import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../../store/userSlice';
import {onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth} from "../../utils/firebase"
import netflixLogo from '../../assets/images/netflix-logo.jpg'; 
import netflixLogoInitial from '../../assets/images/n-logo.png';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((userData => userData.user));

  const handleSignOutBtn = () => {

    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      navigate("/error");
    });

    dispatch(removeUser());
    navigate('/');
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {displayName, email, uid} = user;
        dispatch(addUser({ displayName: displayName, email: email, uid: uid}));
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
    }
    });

    //Unsubscribe when component unmounts.
    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <header className="bg-black shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo on the left */}
        <div className="flex items-center">
          <img
            src={netflixLogo} // Replace with your logo path
            alt="Logo"
            className="h-14 w-auto"
          />
        </div>

        {/* Image and Sign-out button on the right */}
        {user && <div className="flex items-center space-x-4">
          <img
            src={netflixLogoInitial} // Replace with your image path
            alt="User"
            className="h-10 w-20 rounded-3xl"
          />
          <button onClick={handleSignOutBtn} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
            Sign Out
          </button>
        </div>
        }
      </div>
    </header>
  );
};

export default Header;