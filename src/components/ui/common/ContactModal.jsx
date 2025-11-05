import React, { useState, useEffect } from "react";

const ContactModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form };
    if (onSubmit) {
      onSubmit(data);
    } else {
      console.log("Contact form submitted:", data);
    }
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-xl mx-4 rounded-2xl bg-white text-neutral-800 dark:bg-gray-900 dark:text-gray-100 shadow-2xl border border-neutral-200 dark:border-gray-800">
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-gray-800">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1" htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="How can we help?"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Write your message here..."
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-800">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
