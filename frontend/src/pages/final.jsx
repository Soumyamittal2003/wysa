import React from 'react';
import { FaArrowDown } from 'react-icons/fa';

const SleepEfficiencyResult = () => {
  return (
    <div className="min-h-screen bg-[#0a0b1d] text-white flex flex-col justify-between px-6 py-10">
      {/* Text Section */}
      <div className="mt-16 space-y-6 text-lg leading-relaxed">
        <div>
          <p>You seem to have a sleep efficiency of <span className="font-bold">100%</span></p>
          <p>That's great 😎</p>
        </div>
        <p>
          A higher sleep efficiency score means a more refreshing and energizing sleep,
          which can help you move into your day with a sense of lightness and ease.
        </p>
      </div>

      {/* Bottom Arrow Button */}
      <div className="flex justify-center mt-auto mb-4">
        <button className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
          <FaArrowDown className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};

export default SleepEfficiencyResult;
