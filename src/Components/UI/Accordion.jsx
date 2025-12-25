import React from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

const Accordion = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-300 dark:border-gray-700 py-3">
      <button
        className="w-full flex justify-between items-center text-left font-medium text-gray-900 dark:text-gray-100"
        onClick={onClick}
      >
        {question}
        {isOpen ? <FiMinus /> : <FiPlus />}
      </button>
      <div
        className={`mt-2 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className="text-gray-700 dark:text-gray-300">{answer}</p>
      </div>
    </div>
  );
};

export default Accordion;
