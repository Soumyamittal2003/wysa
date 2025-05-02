import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import axios from 'axios';  // Import axios for API calls

const SleepChangeScreen = () => {
  const [selected, setSelected] = useState([]); // Store selected options
  const navigate = useNavigate();

  const options = [
    "I would go to sleep easily",
    "I would sleep through the night",
    "I'd wake up on time, refreshed",
  ];

  // Toggle selection of an option
  const toggleSelect = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option) // Deselect the option if it's already selected
        : [...prev, option] // Add the option if it's not already selected
    );
  };

  // Handle Next button click and save answers to the backend
  const handleNextClick = async () => {
    if (selected.length === 0) {
      alert('Please select at least one option before proceeding!');  // Validation: Check if any option is selected
      return;
    }

    try {
      // Send selected options to the backend via API (use your API endpoint)
      const response = await axios.post('https://wysa-hi43.onrender.com/users/save', {
        nickname: localStorage.getItem('nickname'),
        answers: {
          sleepChange: selected,  // Send the selected options to the backend
        },
      });

      // After successful API request, navigate to the next screen
      navigate('/duration');  // Redirect to the next screen (modify as necessary)
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Failed to submit your answers. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b1d] text-white flex flex-col justify-between px-6 py-10">
      {/* Text Section */}
      <div className="mt-10 space-y-4">
        <h1 className="text-2xl font-semibold">
          Let's say in a few weeks, you're <br /> sleeping well. What would change?
        </h1>
        <p className="text-sm text-gray-300">
          Select all the changes you would like to see
        </p>
      </div>

      {/* Options Section */}
      <div className="mt-10 space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => toggleSelect(option)}
            className={`w-full text-left px-5 py-4 rounded-xl text-white font-medium transition-all
              ${selected.includes(option)
                ? 'bg-cyan-700'
                : index === 0
                ? 'bg-[#3b8a94]'
                : index === 1
                ? 'bg-[#395b9c]'
                : 'bg-[#5246a4]'}
            `}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleNextClick}  // Call handleNextClick when clicked
          className="px-8 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 disabled:opacity-50"
          disabled={selected.length === 0}  // Disable the button if no options are selected
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SleepChangeScreen;
