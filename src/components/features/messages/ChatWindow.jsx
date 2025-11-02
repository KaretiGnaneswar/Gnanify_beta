import React from 'react';

export default function ChatWindow({ currentMsgs, scrollRef }) {
  let lastDay = '';
  const renderDateDivider = (ts) => {
    const d = new Date(ts);
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();
    const yesterday = new Date(Date.now() - 86400000);
    const isYesterday = d.toDateString() === yesterday.toDateString();
    return isToday ? 'Today' : isYesterday ? 'Yesterday' : d.toLocaleDateString();
  };

  return (
    <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-3 bg-neutral-50 dark:bg-neutral-900">
      {currentMsgs.map((m) => {
        const day = renderDateDivider(m.ts);
        const showDivider = day !== lastDay;
        if (showDivider) lastDay = day;
        return (
          <React.Fragment key={m.id}>
            {showDivider && (
              <div className="text-[11px] text-neutral-400 text-center my-1">
                <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10">{day}</span>
              </div>
            )}
            <div className={`max-w-[75%] w-fit ${m.fromMe ? 'ml-auto' : ''}`}>
              <div className={`${m.fromMe ? 'bg-orange-400 text-black' : 'bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white'} rounded-2xl px-3 py-2 border border-neutral-200 dark:border-white/10`}>
                <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                <div className="text-[10px] opacity-70 mt-0.5 flex items-center gap-1 justify-end">
                  {new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {m.fromMe && (m.is_read ? (
                    <span title="Seen" className="text-sky-400">✓✓</span>
                  ) : (
                    <span title="Sent" className="text-neutral-400">✓</span>
                  ))}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
      {currentMsgs.length === 0 && (
        <div className="text-neutral-400 text-sm">No messages yet. Say hi 👋</div>
      )}
    </div>
  );
}
