import React from 'react';

export default function BuyPrompt({ open, onClose, onBuy, price, currency = 'INR' }) {
  if (!open) return null;
  const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-gray-900 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-white">Buy this course to continue</h3>
        <p className="mt-2 text-sm text-gray-300">
          Unlock all lectures and watch without limits. Price: {price ? fmt.format(price) : '—'}
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onBuy}
            className="px-4 py-2 rounded-md bg-orange-400 text-black hover:bg-orange-500"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
