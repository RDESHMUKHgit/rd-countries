import React from 'react';
import { Form } from 'react-router-dom';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    console.log('Contact Form Data:', data);
    e.target.reset();
    alert('Message sent successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 py-16 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -inset-6 bg-indigo-500/10 blur-3xl rounded-3xl pointer-events-none" />

        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 relative z-10">
          Get in Touch
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mt-2 relative z-10">
          Fill out the form below and I’ll get back to you as soon as possible.
        </p>

        <Form
          onSubmit={handleSubmit}
          className="mt-8 relative z-10 flex flex-col gap-6"
        >
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder=" "
              className="peer w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 pt-6 pb-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-2 text-slate-500 dark:text-slate-400 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-500"
            >
              Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder=" "
              className="peer w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 pt-6 pb-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-slate-500 dark:text-slate-400 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-500"
            >
              Email
            </label>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              name="message"
              id="message"
              rows={5}
              required
              placeholder=" "
              className="peer w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 pt-6 pb-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            />
            <label
              htmlFor="message"
              className="absolute left-4 top-2 text-slate-500 dark:text-slate-400 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-500"
            >
              Message
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white shadow-lg hover:bg-indigo-600 transition relative z-10 cursor-pointer"
          >
            Send Message
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
