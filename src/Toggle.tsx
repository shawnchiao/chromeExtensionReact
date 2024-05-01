// @ts-nocheck
import React from 'react';

const Toggle = ({ translateMode, onToggle }) => {
  return (
    <div
      className={`w-14 h-8 flex items-center  rounded-full p-1 cursor-pointer 
                  ${translateMode ? 'bg-blue-500' : 'bg-gray-300'}`}
      onClick={onToggle}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out 
                    ${translateMode ? 'translate-x-6' : 'translate-x-0'}`}
      ></div>
    </div>
  );
};

export default Toggle;
