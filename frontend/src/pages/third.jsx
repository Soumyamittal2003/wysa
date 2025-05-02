import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import axios from 'axios';  // Import axios for API calls

const SleepDurationScreen = () => {
  const [selected, setSelected] = useState(null);  // Store the selected option
  const navigate = useNavigate();  // Initialize React Router's navigation

  const options = [
    "Less than 2 weeks",
    "2 to 8 weeks",
    "More than 8 weeks"
  ];

  const handleSelect = (option) => {
    setSelected(option);  // Set selected option
  };

  const handleNextClick = async () => {
    if (!selected) {
      alert('Please select a duration before proceeding!');  // Validation: Ensure an option is selected
      return;
    }

    try {
      // Send selected option to the backend via API (use your API endpoint)
      await axios.post('https://wysa-hi43.onrender.com/users/save', {
        nickname: localStorage.getItem('nickname'),  // Get the nickname from localStorage
        answers: {
          sleepDuration: selected,  // Send selected duration to backend
        },
      });

      // After successful API request, navigate to the next screen
      navigate('/bedtime');  // Redirect to the next screen (modify as necessary)
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Failed to submit your answer. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b1d] text-white flex flex-col justify-between px-6 py-10">
      {/* Heading */}
      <div className="mt-10 space-y-4">
        <h1 className="text-2xl font-semibold leading-snug">
          That's a great goal. How long <br /> have you been struggling with <br /> your sleep?
        </h1>
      </div>

      {/* Options Section */}
      <div className="mt-10 space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            className={`w-full text-left px-5 py-4 rounded-xl text-white font-medium transition-all
              ${selected === option
                ? 'bg-cyan-700'
                : index === 0
                ? 'bg-[#3b8a94]'
                : index === 1
                ? 'bg-[#395b9c]'
                : 'bg-[#5246a4]'}`}
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
          disabled={selected === null}  // Disable the button if no option is selected
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SleepDurationScreen;
