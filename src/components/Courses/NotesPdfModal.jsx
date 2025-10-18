import React from 'react';

export default function NotesPdfModal({ open, onClose, pdfUrl, title }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-5xl h-[80vh] rounded-xl border border-white/10 bg-gray-900 shadow-xl flex flex-col">
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="text-white font-semibold truncate">{title || 'Notes (PDF)'}</div>
          <div className="flex items-center gap-2">
            {pdfUrl ? (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-md bg-gray-700 text-white hover:bg-gray-600 text-sm"
              >
                Open in new tab
              </a>
            ) : null}
            <button onClick={onClose} className="px-3 py-1 rounded-md bg-gray-700 text-white hover:bg-gray-600 text-sm">
              Close
            </button>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          {pdfUrl ? (
            <iframe title="Notes PDF" src={pdfUrl} className="w-full h-full" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-300">No notes available.</div>
          )}
        </div>
      </div>
    </div>
  );
}
