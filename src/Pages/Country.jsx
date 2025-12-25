/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useTransition } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { getAllCountries } from '../api/CountryAPI';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Skeleton Component
const CountrySkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-lg p-4 animate-pulse">
      {/* Flag skeleton */}
      <div className="h-28 w-full rounded-md bg-slate-300 dark:bg-slate-700 mb-4"></div>

      {/* Name */}
      <div className="h-5 w-3/4 bg-slate-300 dark:bg-slate-700 rounded mb-3"></div>

      {/* Details */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-4 w-5/6 bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-4 w-2/3 bg-slate-300 dark:bg-slate-700 rounded"></div>
      </div>

      {/* Button */}
      <div className="h-4 w-1/3 bg-slate-300 dark:bg-slate-700 rounded mt-4"></div>
    </div>
  );
};

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition(); // React 18 transition

  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [regionFilter, setRegionFilter] = useState('All');

  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 20;

  const filteredCountries = countries
    .filter((c) => c.name.common.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => (regionFilter === 'All' ? true : c.region === regionFilter))
    .sort((a, b) => {
      switch (sortOrder) {
        case 'pop-asc':
          return a.population - b.population;
        case 'pop-desc':
          return b.population - a.population;
        case 'name-asc':
          return a.name.common.localeCompare(b.name.common);
        case 'name-desc':
          return b.name.common.localeCompare(a.name.common);
        default:
          return 0;
      }
    });

  // Calculate indexes for slicing
  const indexOfLast = currentPage * countriesPerPage;
  const indexOfFirst = indexOfLast - countriesPerPage;

  const currentCountries = filteredCountries.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
      } catch (err) {
        setError('Failed to fetch countries. Please try again later.');
        console.error(err);
      }
    });
  }, []);

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  // if (isPending)
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <p className="text-slate-600 dark:text-slate-400 text-lg animate-pulse">
  //         Loading countries...
  //       </p>
  //     </div>
  //   );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8"></div>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 text-center">
        Countries of the World
      </h2>

      {/* Search, Filter, etc  */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 px-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search country..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-1/3"
        />

        <span className="px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-semibold shadow-md">
          {filteredCountries.length} Countries
        </span>

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="pop-asc">Population Ascending</option>
          <option value="pop-desc">Population Descending</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
        </select>

        {/* Region Filter */}
        <select
          value={regionFilter}
          onChange={(e) => {
            setRegionFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/* CARDS */}
      <motion.div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-10">
        <AnimatePresence>
          {isPending
            ? // Show skeletons while loading
              Array.from({ length: countriesPerPage }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <CountrySkeleton />
                </motion.div>
              ))
            : // Show actual country cards
              currentCountries.map((country, i) => (
                <motion.div
                  key={country.cca3}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1, // stagger each card by 0.1s
                    type: 'spring',
                    stiffness: 120,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-indigo-400/5 via-transparent to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Flag */}
                  <div className="relative h-28 w-full overflow-hidden rounded-md shadow mb-4">
                    <Link
                      to={`/country/${country.cca3}`}
                      className="relative h-28 w-full overflow-hidden rounded-md shadow mb-4 group"
                    >
                      <img
                        src={country.flags.svg}
                        alt={country.name.common}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-semibold text-sm">
                        View Flag
                      </div>
                    </Link>
                  </div>

                  {/* Name */}
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {country.name.common}
                  </h4>

                  {/* Details */}
                  <div className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                    <p>
                      <span className="font-medium">Capital:</span>{' '}
                      {country.capital ? country.capital[0] : 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Region:</span>{' '}
                      {country.region}
                    </p>
                    <p>
                      <span className="font-medium">Population:</span>{' '}
                      {country.population.toLocaleString()}
                    </p>
                  </div>

                  {/* Learn More Button */}
                  <Link
                    to={`/country/${country.cca3}`}
                    className="mt-4 flex items-center gap-2 text-indigo-500 font-semibold hover:gap-3 transition"
                  >
                    Learn More <FaArrowRight />
                  </Link>
                </motion.div>
              ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination  */}
      <div className="flex justify-center mt-10 pb-8 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded transition ${
              currentPage === i + 1
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-300 hover:bg-indigo-400 hover:text-white'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Country;
