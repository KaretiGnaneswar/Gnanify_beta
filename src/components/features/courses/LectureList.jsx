import React from 'react';

export default function LectureList({ lectures, currentId, onSelect, lockedIds = new Set(), onOpenNotes, renderBelow }) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-white/10 rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-transparent">
      {lectures.map((lec) => {
        const isActive = lec.id === currentId;
        const isLocked = lockedIds.has(lec.id);
        return (
          <div key={lec.id}>
            <div
              className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                isActive ? 'bg-gray-100 dark:bg-gray-800/70' : 'bg-white hover:bg-gray-50 dark:bg-gray-900/40 dark:hover:bg-gray-800/40'
              } ${isLocked ? 'opacity-60' : ''}`}
            >
              <button
                onClick={() => onSelect?.(lec)}
                className={`flex-1 text-left min-w-0 ${isLocked ? 'cursor-not-allowed' : ''}`}
                aria-disabled={isLocked}
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{lec.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{lec.duration} {lec.freePreview ? '• Preview' : ''}</div>
              </button>
              {isLocked ? (
                <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">Locked</span>
              ) : null}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenNotes?.(lec);
                }}
                className="ml-2 text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-white/10"
                title="Notes"
                aria-label="Open notes"
              >
                📝
              </button>
            </div>
            {typeof renderBelow === 'function' ? (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 dark:bg-gray-900/30 dark:border-white/10">
                {renderBelow(lec, { isActive, isLocked })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
