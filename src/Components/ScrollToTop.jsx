import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      title="Back To Top"
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 z-999
        flex items-center justify-center
        w-12 h-12 rounded-full
        bg-indigo-600 text-white
        shadow-lg
        transition-all duration-300 ease-in-out
        hover:bg-indigo-500 hover:scale-110
        ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }
      `}
    >
      <FaArrowUp className="text-lg" />
    </button>
  );
};

export default ScrollToTop;
