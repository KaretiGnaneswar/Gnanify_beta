import React from 'react';
import { FiPaperclip, FiSmile, FiMic, FiSend } from 'react-icons/fi';

export default function ChatComposer({ input, setInput, onSend }) {
  return (
    <div className="p-3 border-t border-neutral-200 dark:border-white/10">
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center" title="Attach"><FiPaperclip /></button>
        <button className="w-9 h-9 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center" title="Emoji"><FiSmile /></button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onSend(); }}
          className="inp flex-1"
          placeholder="Write a message..."
        />
        {input.trim() ? (
          <button className="w-10 h-10 rounded-md bg-orange-400 text-black hover:bg-orange-500 flex items-center justify-center" onClick={onSend} title="Send"><FiSend /></button>
        ) : (
          <button className="w-9 h-9 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center" title="Voice"><FiMic /></button>
        )}
      </div>
    </div>
  );
}
