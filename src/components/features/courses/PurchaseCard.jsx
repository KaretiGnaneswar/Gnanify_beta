import React from "react";
import ReactPlayer from "react-player";

export default function PurchaseCard({ course, previewUrl, onPrimary }) {
  const isFree = course?.is_free;
  const priceLabel = isFree ? "Free" : (course?.currency ? `${course.currency} ${course.price || 0}` : `$${course?.price || 0}`);
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden lg:sticky lg:top-20">
      <div className="aspect-video bg-black">
        {previewUrl ? (
          <ReactPlayer url={previewUrl} width="100%" height="100%" controls />
        ) : (
          <div className="w-full h-full bg-gray-900" />
        )}
      </div>
      <div className="p-4 space-y-3">
        <div className="text-2xl font-semibold text-gray-900 dark:text-white">{priceLabel}</div>
        <button
          onClick={onPrimary}
          className="w-full px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white"
        >
          {isFree ? "Enroll for Free" : "Buy now"}
        </button>
        <div className="text-sm text-gray-600 dark:text-gray-300">This course includes</div>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>{course?.total_lessons || 0} lessons</li>
          <li>Lifetime access</li>
          <li>Access on mobile and desktop</li>
          <li>Certificate of completion</li>
        </ul>
      </div>
    </div>
  );
}
