/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import faqsData from '../data/faqs.json';
import Accordion from './UI/Accordion';

const HomeFAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // tracks which accordion is open
  const navigate = useNavigate();

  const getRandomFaqs = () => {
    const shuffled = [...faqsData].sort(() => 0.5 - Math.random());
    setFaqs(shuffled.slice(0, 7));
    setOpenIndex(null); // close all when refreshed
  };

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    getRandomFaqs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={getRandomFaqs}
          className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
        >
          Refresh FAQs
        </button>

        <button
          onClick={() => navigate('/faqs')}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default HomeFAQ;
