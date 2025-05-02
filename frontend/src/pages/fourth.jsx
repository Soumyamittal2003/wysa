import React, { useState, useRef } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import axios from 'axios';  // Import axios for making API calls
import { useNavigate } from 'react-router-dom';

const BedtimeScreen = () => {
  const [selectedTime, setSelectedTime] = useState('');
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Handle time input change
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);  // Update selected time state
  };

  // Handle Next button click and save the selected time to the backend
  const handleNextClick = async () => {
    if (!selectedTime) {
      alert('Please select a bedtime before proceeding!');  // Validation: Ensure a time is selected
      return;
    }

    try {
      // Send selected time to the backend via API
      await axios.post('http://localhost:5000/users/save', {
        nickname: localStorage.getItem('nickname'),  // Retrieve the nickname from localStorage
        answers: {
          bedtime: selectedTime,  // Send the selected bedtime to backend
        },
      });

      // After successful API request, navigate to the next screen
      navigate('/wake-up');  // Modify the next screen route as needed
    } catch (error) {
      console.error('Error submitting bedtime:', error);
      alert('Failed to submit your bedtime. Please try again.');
    }
  };

  // Handle button click to show the time picker
  const handleButtonClick = () => {
    setIsTimePickerVisible(true);  // Show the time picker when the button is clicked
  };

  return (
    <div className="min-h-screen bg-[#0a0b1d] text-white flex flex-col justify-between px-6 py-10">
      {/* Heading */}
      <div className="mt-10 mb-8">
        <h1 className="text-2xl font-semibold leading-relaxed">
          What time do you go to bed for sleep?
        </h1>
      </div>

      {/* Time Display Button */}
      <button
        onClick={handleButtonClick}  // Trigger the input time picker
        className="flex items-center justify-between w-full max-w-md bg-[#5246a4] text-white px-5 py-4 rounded-xl shadow-md text-base font-medium"
      >
        <span>{selectedTime ? selectedTime : 'Select time'}</span>  {/* Display the selected time or 'Select time' */}
        <FaChevronRight />
      </button>

      {/* Time Picker (Conditionally visible) */}
      {isTimePickerVisible && (
        <div className="mt-6">
          <input
            ref={inputRef}
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}  // Update state on time change
            className="w-full py-3 px-4 bg-[#333] text-white rounded-xl"
          />
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleNextClick}  // Call handleNextClick when clicked
          className="px-8 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 disabled:opacity-50"
          disabled={selectedTime === ''}  // Disable the button if no time is selected
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BedtimeScreen;
