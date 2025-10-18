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
      <div className="relative z-10 w-full max-w-xl rounded-xl border border-white/10 bg-gray-900 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-white">
          Notes {lecture ? `for: ${lecture.title}` : ''}
        </h3>
        <textarea
          className="mt-3 w-full h-48 rounded-md bg-gray-800 text-gray-100 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-orange-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your notes here..."
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave?.(text)}
            className="px-4 py-2 rounded-md bg-orange-400 text-black hover:bg-orange-500"
          >
            Save Notes
          </button>
        </div>
      </div>
    </div>
  );
}
