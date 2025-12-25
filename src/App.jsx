import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Country from './Pages/Country';
import CountryDetail from './Pages/CountryDetail';

import AppLayout from './Components/Layout/AppLayout';
import ErrorPage from './Pages/ErrorPage';
import Loader from './Components/Loader';

const mainRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/country', element: <Country /> },
      { path: '/country/:code', element: <CountryDetail /> }, // dynamic page
    ],
  },
]);

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <RouterProvider router={mainRouter} />
    </Suspense>
  );
};

export default App;
