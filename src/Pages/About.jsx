import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import FeaturedCountries from '../Components/FeaturedCountries';

const About = () => {
  return (
    <section className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-20 space-y-24">
        {/* ABOUT INTRO */}
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">
              About{' '}
              <span className="text-indigo-600 dark:text-indigo-400">RD</span>
              <span className="text-slate-900 dark:text-slate-100">World</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                Atlas
              </span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              RDWorldAtlas is a thoughtfully designed platform for curious minds
              who love to explore the world beyond borders. From countries and
              cultures to population insights and geography, this project
              transforms raw data into a visually engaging and
              easy-to-understand experience.
            </p>

            <div className="mt-8 rounded-2xl bg-slate-100 p-6 text-center dark:bg-slate-900 transition-colors duration-300">
              <p className="text-lg font-medium text-slate-800 dark:text-slate-200">
                “More than a project. More than data.”
              </p>

              <p className="mt-3 text-slate-600 dark:text-slate-400">
                RDWorldAtlas is a learning journey built on modern web
                technologies, thoughtful design, and the belief that exploring
                the world should feel intuitive, engaging, and meaningful.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative group">
            {/* Glow */}
            <div className="absolute -inset-6 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10" />

            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true }}
              loop
              className="relative z-10 max-w-md rounded-2xl shadow-xl"
            >
              {[
                {
                  src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=900',
                  title: 'Global Cartography',
                  desc: "Explore the world's geography through detailed maps and borders.",
                },
                {
                  src: 'https://images.unsplash.com/photo-1502920514313-52581002a659?q=80&w=900',
                  title: 'Planet Earth',
                  desc: 'A living system of continents, oceans, and cultures.',
                },
                {
                  src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=900',
                  title: 'Connected World',
                  desc: 'How nations, trade, and technology intertwine globally.',
                },
                {
                  src: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=900',
                  title: 'Beyond Borders',
                  desc: 'Satellites revealing Earth from a new perspective.',
                },
                {
                  src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=900',
                  title: 'Natural Landscapes',
                  desc: 'Mountains, forests, and the untouched beauty of Earth.',
                },
              ].map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative overflow-hidden rounded-2xl">
                    {/* Image */}
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Text content */}
                    <div
                      className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-4 p-5 text-white opacity-0 transition-all duration-600 ease-out
 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <p className="mt-1 text-sm text-white/80">{item.desc}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* VISION SECTION */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Our Vision
          </h3>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
            To make global knowledge accessible, interactive, and enjoyable —
            where learning geography feels less like memorization and more like
            exploration.
          </p>
        </div>

        {/* FEATURED COUNTRIES */}
        <FeaturedCountries />
      </div>
    </section>
  );
};

export default About;
