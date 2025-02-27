import React, { useRef, useState } from 'react'
import lang from '../utils/Constants/languageConstants';
import { useSelector } from 'react-redux';

const SearchPage = () => {

    const langKey = useSelector((store => store.config.lang));
    const searchText = useRef(null);
    const [submittedText, setSubmittedText] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSubmittedText(searchText.current.value);
      }

    return (
    <div>
        <div className="bg-gradient-to-r from-red-500 to-black h-screen flex items-center justify-center">
            <div className="bg-black p-2 shadow-lg w-full sm:w-96">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center space-x-4">
                <input ref={searchText} type="text" name="query" placeholder={lang[langKey].placeholder} className="w-full p-3 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                <button onClick={handleSearchSubmit} className="bg-red-800 text-white p-3 shadow-md hover:bg-gray-800 transition duration-200">
                    {lang[langKey].search}
                </button>
            </form>

            {submittedText && (
            <p className="mt-4 text-white">You searched for: <strong>{submittedText}</strong></p>
          )}
            </div>
        </div>
    </div>
  )
}

export default SearchPage;