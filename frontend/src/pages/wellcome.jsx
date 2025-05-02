import { FaArrowDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate from React Router


const WelcomeScreen = () => {
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleArrowClick = () => {
    navigate('/nickname');  // Navigate to the /nickname screen when the button is clicked
  };

  return (
    <div className="min-h-screen bg-[#0a0b1d] flex flex-col justify-between items-center px-6 py-10 text-white">
      {/* Top Section: Image + Intro */}
      <div className="mt-20 flex flex-col items-center space-y-6">
        {/* Penguin Image */}
       

        {/* Heading Text */}
        <h1 className="text-2xl font-semibold text-center">
          Hey! I'm <span className="text-cyan-400 font-bold">wysa</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base text-center">
          I'm here to help you sleep better
        </p>
      </div>

      {/* Yellow Down Arrow Button */}
      <div className="mb-4">
        <button
          onClick={handleArrowClick}  // Call handleArrowClick when the button is clicked
          className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg"
        >
          <FaArrowDown className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
