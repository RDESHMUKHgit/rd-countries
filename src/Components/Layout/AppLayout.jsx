import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../UI/Header';
import Footer from '../UI/Footer';
import CustomCursor from '../UI/CustomCursor';
import ScrollToTop from '../ScrollToTop';

import Loader from '../Loader';

const AppLayout = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Simulate initial app boot time
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1200); // tweak duration if needed

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-900 z-9999">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default AppLayout;
