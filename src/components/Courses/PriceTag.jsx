import React from 'react';

export default function PriceTag({ price, currency = 'INR' }) {
  if (!price || price === 0) {
    return <span className="text-green-400 font-semibold">Free</span>;
  }
  const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency });
  return <span className="text-orange-300 font-semibold">{fmt.format(price)}</span>;
}
