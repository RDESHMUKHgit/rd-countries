import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import FeaturedCountries from '../Components/FeaturedCountries';
import HomeFAQ from '../Components/HomeFAQ';

const Home = () => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              Discover the world with{' '}
              <span className="text-indigo-600 dark:text-indigo-400">RD</span>
              <span className="text-slate-900 dark:text-slate-100">World</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                Atlas
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-400">
              Explore countries, cultures, populations, and geographical
              insights — all in one beautifully crafted platform designed for
              curious minds.
            </p>

            {/* CTA */}
            <div className="mt-8 flex gap-4">
              <button className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
                <NavLink to="/country">Explore Countries</NavLink>
              </button>

              <button className="group rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer">
                <span className="flex items-center gap-2">
                  Learn More
                  <FaArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center">
            <div className="absolute -inset-6 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10" />

            <img
              src="https://images.unsplash.com/photo-1589519160732-57fc498494f8?q=80&w=800&auto=format&fit=crop"
              alt="World Map"
              className="relative z-10 w-full max-w-md rounded-2xl shadow-xl"
            />
          </div>
        </div>
        <div className="py-20">
          <FeaturedCountries />
        </div>
        <div className="py-20">
          <HomeFAQ />
        </div>
      </div>
    </section>
  );
};

export default Home;
