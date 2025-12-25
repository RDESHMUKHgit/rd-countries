import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Header = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const navLinkStyle = ({ isActive }) =>
    `block px-4 py-2 text-sm transition
     ${
       isActive
         ? 'text-indigo-500 dark:text-emerald-400'
         : 'text-slate-700 dark:text-slate-300 hover:text-indigo-500'
     } font-medium `;

  return (
    <header className="transition-colors duration-300 sticky top-0 z-50 border-b border-slate-200 bg-white backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="text-xl font-extrabold tracking-tight">
          <span className="text-indigo-600 dark:text-indigo-400">RD</span>
          <span className="text-slate-900 dark:text-slate-100">World</span>
          <span className="text-emerald-600 dark:text-emerald-400">Atlas</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 tracking-wider uppercase cursor-pointer">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>
          <NavLink to="/country" className={navLinkStyle}>
            Country
          </NavLink>
          <NavLink to="/contact" className={navLinkStyle}>
            Contact
          </NavLink>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
            }
            className="cursor-pointer rounded-lg border border-slate-300 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-amber-500 " />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden rounded-lg border border-slate-300 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay (Animated, No Layout Shift) */}
      <div
        className={`md:hidden absolute left-0 top-16 w-full origin-top
          transform transition-all duration-300 ease-out
          ${
            menuOpen
              ? 'scale-y-100 opacity-100'
              : 'scale-y-0 opacity-0 pointer-events-none'
          }
          bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={navLinkStyle}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={navLinkStyle}
          >
            About
          </NavLink>
          <NavLink
            to="/country"
            onClick={() => setMenuOpen(false)}
            className={navLinkStyle}
          >
            Country
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={navLinkStyle}
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
