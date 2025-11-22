import React from 'react';
import AdSlot from '@/components/AdSlot';

export default function CompactAd({ slot = 'YOUR_SLOT_ID', className = '' }) {
  return (
    <div className={`rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900 p-3 ${className}`}>
      <div className="text-[11px] text-gray-500 dark:text-gray-400 mb-2">Sponsored</div>
      <AdSlot slot={slot} />
    </div>
  );
}
