import React from 'react';
import countries from '../data/featuredCountries.json';

const FeaturedCountries = () => {
  return (
    <div>
      <div>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 text-center">
          Featured Countries
        </h3>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {countries.slice(0, 10).map((country) => (
            <div
              key={country.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Accent Glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-br from-indigo-500/10 via-transparent to-emerald-500/10" />

              {/* Flag Header */}
              <div className="relative h-28 w-full overflow-hidden">
                <img
                  src={country.flag}
                  alt={country.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="relative p-6">
                <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {country.name}
                </h4>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {country.description}
                </p>

                <div className="mt-4 space-y-1 text-sm text-slate-500 dark:text-slate-400">
                  <p>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Capital:
                    </span>{' '}
                    {country.capital}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Region:
                    </span>{' '}
                    {country.region}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Population:
                    </span>{' '}
                    {country.population}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCountries;
