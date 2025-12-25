/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState, useTransition } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import api, { getAllCountries } from '../api/CountryAPI';

// Skeelton Loading
const CountryDetailSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 animate-pulse">
      {/* Flag */}
      <div className="lg:w-1/3 h-72 rounded-xl bg-slate-300 dark:bg-slate-700"></div>

      {/* Details */}
      <div className="lg:w-2/3 space-y-6">
        <div className="h-10 w-1/2 bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-5 w-3/4 bg-slate-300 dark:bg-slate-700 rounded"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-full bg-slate-300 dark:bg-slate-700 rounded"
            />
          ))}
        </div>

        {/* Borders */}
        <div className="flex gap-2 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-16 bg-slate-300 dark:bg-slate-700 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Skeleton for View More
const CountryCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-4 animate-pulse">
      <div className="h-28 w-full bg-slate-300 dark:bg-slate-700 rounded mb-4"></div>
      <div className="h-5 w-3/4 bg-slate-300 dark:bg-slate-700 rounded mb-2"></div>
      <div className="h-4 w-full bg-slate-300 dark:bg-slate-700 rounded mb-1"></div>
      <div className="h-4 w-2/3 bg-slate-300 dark:bg-slate-700 rounded"></div>
    </div>
  );
};

const CountryDetail = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [allCountries, setAllCountries] = useState([]);
  const [randomCountries, setRandomCountries] = useState([]);

  // Fetch main country
  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await api.get(`/alpha/${code}`);
        setCountry(response.data[0]);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch country details.');
      }
    });
  }, [code]);

  // Fetch all countries for "View More"
  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await getAllCountries();
        setAllCountries(data);
      } catch (err) {
        console.error(err);
      }
    });
  }, []);

  // Pick 4 random countries different from current one
  useEffect(() => {
    if (allCountries.length > 0 && country) {
      const filtered = allCountries.filter((c) => c.cca3 !== country.cca3);
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      setRandomCountries(shuffled.slice(0, 4));
    }
  }, [allCountries, country]);

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  // if (isPending || !country)
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <p className="text-gray-600 dark:text-gray-300 text-lg animate-pulse">
  //         Loading country details...
  //       </p>
  //     </div>
  //   );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 lg:p-12">
      {/* Back Button */}
      <Link
        to="/country"
        className="inline-flex items-center gap-2 mb-8 text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 transition"
      >
        <FaArrowLeft /> Back to Countries
      </Link>
      {/* Main Country Info */}
      {isPending || !country ? (
        <CountryDetailSkeleton />
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Flag */}
          <div className="lg:w-1/3 rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="lg:w-2/3 space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              {country.name.common}
            </h1>
            <h2 className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              {country.name.official}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-semibold">Capital:</span>{' '}
                {country.capital ? country.capital.join(', ') : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Subregion:</span>{' '}
                {country.subregion}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{' '}
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Area:</span>{' '}
                {country.area.toLocaleString()} km²
              </p>
              <p>
                <span className="font-semibold">Timezones:</span>{' '}
                {country.timezones.join(', ')}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{' '}
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((c) => `${c.name} (${c.symbol})`)
                      .join(', ')
                  : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{' '}
                {country.languages
                  ? Object.values(country.languages).join(', ')
                  : 'N/A'}
              </p>
            </div>

            {country.borders?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="font-semibold mr-2">Borders:</span>
                {country.borders.map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm shadow-sm hover:bg-indigo-500 transition"
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* View More Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          View More
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {isPending
            ? Array.from({ length: 4 }).map((_, i) => (
                <CountryCardSkeleton key={i} />
              ))
            : randomCountries.map((c) => (
                <Link
                  key={c.cca3}
                  to={`/country/${c.cca3}`}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative h-28 w-full overflow-hidden rounded-md shadow mb-4">
                    <img
                      src={c.flags.svg}
                      alt={c.name.common}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-semibold text-sm">
                      View Flag
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {c.name.common}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Capital: {c.capital ? c.capital[0] : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Population: {c.population.toLocaleString()}
                  </p>
                  <button className="mt-2 flex items-center gap-2 text-indigo-500 font-semibold hover:gap-3 transition">
                    Learn More <FaArrowRight />
                  </button>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
