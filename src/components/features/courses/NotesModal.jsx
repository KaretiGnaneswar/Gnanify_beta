import React, { useEffect, useState } from 'react';

export default function NotesModal({ open, onClose, onSave, lecture, initialText = '' }) {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText || '');
  }, [initialText, lecture?.id]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Notes {lecture ? `for: ${lecture.title}` : ''}
        </h3>
        <textarea
          className="mt-3 w-full h-48 rounded-md bg-gray-50 text-gray-900 border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:text-gray-100 dark:border-white/10"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your notes here..."
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave?.(text)}
            className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
          >
            Save Notes
          </button>
        </div>
      </div>
    </div>
  );
}
