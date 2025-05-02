import React, { useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import axios from 'axios';  // Import axios for making API calls
import { useNavigate } from 'react-router-dom';  // React Router for navigation

const SleepHoursScreen = () => {
  const [selected, setSelected] = useState('8 hrs');  // Default value
  const navigate = useNavigate();  // Use navigate hook to go to the next screen

  const options = ['7 hrs', '8 hrs', '9 hrs'];

  // Handle selection of an option
  const handleOptionClick = (option) => {
    setSelected(option);
  };

  // Handle Next button click and save the selected sleep hours
  const handleNextClick = async () => {
    if (!selected) {
      alert('Please select your typical sleep hours before proceeding!');
      return;
    }

    try {
      // Send the selected sleep hours to the backend
      await axios.post('http://localhost:5000/users/save', {
        nickname: localStorage.getItem('nickname'),  // Get nickname from localStorage
        answers: {
          sleepHours: selected,  // Send the selected sleep hours to the backend
        },
      });

      // After successful API request, navigate to the next screen
      navigate('/result');  // Modify as needed to navigate to the next screen
    } catch (error) {
      console.error('Error submitting sleep hours:', error);
      alert('Failed to submit your sleep hours. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b1d] text-white flex flex-col justify-between px-6 py-10">
      {/* Question */}
      <div className="mt-10">
        <h1 className="text-2xl font-semibold leading-relaxed">
          Ok. How many hours sleep do <br />
          you get in a typical night?
        </h1>
      </div>

      {/* Options */}
      <div className="flex flex-col items-center gap-6 mt-10">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => handleOptionClick(option)}  // Update the selected option
            className="cursor-pointer"
          >
            <div
              className={`text-lg font-medium text-center ${selected === option ? 'text-white' : 'text-gray-400'}`}
            >
              {option}
            </div>
            {selected === option && (
              <div className="mt-1 border-t-2 border-white w-40" />
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleNextClick}  // Trigger next step after selection
          className="px-8 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 disabled:opacity-50"
          disabled={!selected}  // Disable button if no option is selected
        >
          Next
        </button>
      </div>

      {/* Bottom Arrow Button (optional, for navigation) */}
      <div className="flex justify-center mt-auto mb-4">
        <button className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
          <FaArrowDown className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};

export default SleepHoursScreen;
