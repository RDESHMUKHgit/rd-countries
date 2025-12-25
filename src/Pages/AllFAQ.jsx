/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState } from 'react';
import faqsData from '../data/faqs.json';
import Accordion from '../Components/UI/Accordion';
import { useNavigate } from 'react-router-dom';

const AllFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState(''); // State for search input
  const navigate = useNavigate();

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Filter FAQs based on search input (case-insensitive)
  const filteredFaqs = faqsData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="relative text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 px-2 py-1 text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            Go Back
          </button>
          All Frequently Asked Questions
        </h2>

        {/* Search bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
          />
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <Accordion
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
                questionClass="text-gray-900 dark:text-gray-100"
                answerClass="text-gray-700 dark:text-gray-300"
                bgClass="bg-gray-50 dark:bg-slate-800"
              />
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              Hmm… we couldn’t find any FAQs matching your search.
              <br /> Try typing something like{' '}
              <span className="font-semibold">“India”</span> or{' '}
              <span className="font-semibold">“Taj Mahal”</span> to explore
              interesting facts!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllFAQ;
