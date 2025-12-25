import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';
import footerData from '../../data/FooterAPI.jsx';
import '../../FooterSocial.css';

const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 pt-12">
      {/* Top ReachUs Section */}
      <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-3 gap-6 mb-12">
        {footerData.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-1 hover:shadow-xl transition items-center gap-4"
            >
              {/* Left part: Icon + Title */}
              <div className="flex flex-col items-center justify-center w-1/4 border-r p-4 dark:border-r-cyan-900 border-r-green-300 ">
                <Icon className="text-indigo-500 text-3xl mb-1" />
                <h4 className="font-semibold text-sm text-center">
                  {item.title}
                </h4>
              </div>

              {/* Right part: Detail */}
              <div className="w-3/4 text-sm text-slate-600 dark:text-slate-400">
                {item.detail}
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Links Section */}
      <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h5 className="font-semibold text-lg mb-4">About</h5>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>Our Story</li>
            <li>Team</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold text-lg mb-4">Services</h5>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>Country Info</li>
            <li>Maps & Atlas</li>
            <li>Data Analysis</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold text-lg mb-4">Resources</h5>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>Blog</li>
            <li>Guides</li>
            <li>API</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold text-lg mb-4">Contact</h5>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>Support</li>
            <li>Help Center</li>
            <li>FAQs</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-300 dark:border-slate-700 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} RDWorldAtlas. All rights reserved.
          </p>
          <div className="social-icons">
            <FaFacebookF className="facebook" />
            <FaTwitter className="twitter" />
            <FaLinkedinIn className="linkedin" />
            <FaInstagram className="instagram" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
