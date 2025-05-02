import React, { useState, useRef } from 'react';
import { FaChevronRight, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';  

const WakeUpTimeScreen = () => {
  const [wakeTime, setWakeTime] = useState('06:00');  
  const inputRef = useRef(null);
  const navigate = useNavigate();  

  
  const handleTimeChange = (e) => {
    setWakeTime(e.target.value);  
  };

  
  const handleTimeClick = () => {
    inputRef.current.showPicker?.();  
    inputRef.current.click();         
  };

  const handleNextClick = async () => {
    if (!wakeTime) {
      alert('Please select a wake-up time before proceeding!');
      return;
    }

    try {
      // Send selected wake-up time to the backend (API call)
      await axios.post('https://wysa-hi43.onrender.com/users/save', {
        nickname: localStorage.getItem('nickname'),  // Retrieve nickname from localStorage
        answers: {
          wakeUpTime: wakeTime,  // Save the wake-up time to the backend
        },
      });

      // After successful API request, navigate to the next screen
      navigate('/sleep-hours');  // Modify as necessary (for the next screen)
    } catch (error) {
      console.error('Error submitting wake-up time:', error);
      alert('Failed to submit your wake-up time. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b1d] text-white flex flex-col justify-between px-6 py-10">
      {/* Heading */}
      <div className="mt-10">
        <h1 className="text-2xl font-semibold leading-relaxed">
          What time do you get out of bed <br /> to start your day?
        </h1>
      </div>

      {/* Time Selector Button */}
      <div className="mt-10">
        <button
          onClick={handleTimeClick}  // Trigger the time input picker
          className="flex items-center justify-between w-full max-w-md bg-[#5246a4] text-white px-5 py-4 rounded-xl shadow-md text-base font-medium"
        >
          <span>
            {new Date(`1970-01-01T${wakeTime}`).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          <FaChevronRight />
        </button>

        {/* Hidden Native Time Input */}
        <input
          ref={inputRef}
          type="time"
          value={wakeTime}
          onChange={handleTimeChange}  // Update state on time change
          className="hidden"
        />
      </div>

      {/* Next Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleNextClick}  // Handle next button click
          className="px-8 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 disabled:opacity-50"
          disabled={!wakeTime}  // Disable button if no time is selected
        >
          Next
        </button>
      </div>

      {/* Bottom Arrow Button (optional, if you want to use it for navigation) */}
      <div className="flex justify-center mt-auto mb-4">
        <button className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
          <FaArrowDown className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};

export default WakeUpTimeScreen;
