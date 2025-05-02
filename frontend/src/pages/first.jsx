import { FaArrowDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // React Router's hook for navigation

const SleepIntroScreen = () => {
  const navigate = useNavigate();  // Initialize React Router's navigation

  // Handle the next button click (no answer required)
  const handleNextClick = () => {
    navigate('/change');  // Redirect to the next screen (modify as necessary)
  };

  return (
    <div className="min-h-screen bg-[#0a0b1d] flex flex-col justify-between px-6 py-10 text-white">
      {/* Text Section */}
      <div className="mt-20 text-lg space-y-6">
        <p>
          Let's start by calculating your <br />
          <span className="font-semibold">sleep efficiency</span> and examining <br />
          your concerns.
        </p>
        <p>
          Over time, we will work together <br />
          to improve these.
        </p>
      </div>

      {/* Down Arrow Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleNextClick}  // Call handleNextClick when clicked
          className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg"
        >
          <FaArrowDown className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};

export default SleepIntroScreen;
