import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiPhone, FiVideo, FiInfo, FiPaperclip, FiSmile, FiMic, FiSend } from 'react-icons/fi';

export default function MessagesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all | unread
  const [selectedId, setSelectedId] = useState(null);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const [conversations, setConversations] = useState([
    {
      id: 'c_1',
      name: 'Aarav Patel',
      avatar: 'https://i.pravatar.cc/100?img=15',
      last: 'Let\'s push by tonight',
      time: Date.now() - 5 * 60 * 1000,
      unread: 2,
    },
    {
      id: 'c_2',
      name: 'Neha Sharma',
      avatar: 'https://i.pravatar.cc/100?img=32',
      last: 'Deployed successfully \u2705',
      time: Date.now() - 60 * 60 * 1000,
      unread: 0,
    },
    {
      id: 'c_3',
      name: 'Karthik R',
      avatar: 'https://i.pravatar.cc/100?img=5',
      last: 'Share the schema?',
      time: Date.now() - 2 * 60 * 60 * 1000,
      unread: 1,
    },
  ]);

  const [messagesById, setMessagesById] = useState({
    c_1: [
      { id: 'm1', fromMe: false, text: 'Hey, did you see the PR?', ts: Date.now() - 40 * 60 * 1000 },
      { id: 'm2', fromMe: true, text: 'Yup, looks good. Few nits only.', ts: Date.now() - 35 * 60 * 1000 },
      { id: 'm3', fromMe: false, text: 'Cool, let\'s push by tonight', ts: Date.now() - 5 * 60 * 1000 },
    ],
    c_2: [
      { id: 'm1', fromMe: true, text: 'CI is green, merging now', ts: Date.now() - 90 * 60 * 1000 },
      { id: 'm2', fromMe: false, text: 'Deployed successfully ✅', ts: Date.now() - 60 * 60 * 1000 },
    ],
    c_3: [
      { id: 'm1', fromMe: false, text: 'Share the schema?', ts: Date.now() - 120 * 60 * 1000 },
    ],
  });

  useEffect(() => {
    if (!selectedId && conversations.length) setSelectedId(conversations[0].id);
  }, [conversations, selectedId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedId, messagesById]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter((c) => c.name.toLowerCase().includes(q));
  }, [conversations, query]);

  const current = useMemo(() => conversations.find((c) => c.id === selectedId) || null, [conversations, selectedId]);
  const currentMsgs = messagesById[selectedId] || [];
  const isTyping = current?.id === 'c_2'; // demo: show typing on one chat like Instagram typing dots

  const send = () => {
    const txt = input.trim();
    if (!txt || !selectedId) return;
    const id = `m_${Date.now()}`;
    setMessagesById((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), { id, fromMe: true, text: txt, ts: Date.now() }],
    }));
    setInput('');
    setConversations((prev) => prev.map((c) => (c.id === selectedId ? { ...c, last: txt, time: Date.now(), unread: 0 } : c)));
  };

  // helpers
  const listItems = useMemo(() => {
    let arr = filtered;
    if (filter === 'unread') arr = arr.filter((c) => c.unread > 0);
    return arr;
  }, [filtered, filter]);

  const renderDateDivider = (ts) => {
    const d = new Date(ts);
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();
    const yesterday = new Date(Date.now() - 86400000);
    const isYesterday = d.toDateString() === yesterday.toDateString();
    return isToday ? 'Today' : isYesterday ? 'Yesterday' : d.toLocaleDateString();
  };

  let lastDay = '';

  return (
    <div className="max-w-6xl mx-auto p-4 grid gap-4 md:grid-cols-3 h-[calc(100vh-7rem)]">
      {/* Left: chat list */}
      <div className="card md:col-span-1 overflow-hidden">
        <div className="card-body p-0">
          <div className="p-3 border-b border-white/10 flex items-center gap-2">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="inp w-full pl-9"
                placeholder="Search"
              />
            </div>
            <div className="flex gap-1">
              <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-md text-sm ${filter==='all'?'bg-orange-400 text-black':'bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700'}`}>All</button>
              <button onClick={() => setFilter('unread')} className={`px-3 py-1.5 rounded-md text-sm ${filter==='unread'?'bg-orange-400 text-black':'bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700'}`}>Unread</button>
            </div>
          </div>
          <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 11rem)' }}>
            {listItems.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`w-full text-left px-3 py-2 border-b border-white/10 hover:bg-neutral-800 transition-colors ${selectedId === c.id ? 'bg-neutral-900' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-white font-medium truncate">{c.name}</div>
                      <div className="text-[10px] text-neutral-400 whitespace-nowrap">{new Date(c.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                    <div className="text-xs text-neutral-400 truncate">{c.last}</div>
                  </div>
                  {c.unread ? (
                    <span className="text-[10px] bg-orange-400 text-black font-semibold px-2 py-0.5 rounded-full">{c.unread}</span>
                  ) : null}
                </div>
              </button>
            ))}
            {listItems.length === 0 && (
              <div className="p-3 text-neutral-400 text-sm">No chats found</div>
            )}
          </div>
        </div>
      </div>

      {/* Right: conversation */}
      <div className="card md:col-span-2 overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3">
          {current ? (
            <div className="flex items-center gap-3 min-w-0">
              <img src={current.avatar} alt={current.name} className="w-9 h-9 rounded-full object-cover" />
              <div className="min-w-0">
                <div className="text-white font-medium truncate">{current.name}</div>
                <div className="text-[11px] text-neutral-400">{isTyping ? 'typing…' : 'online'}</div>
              </div>
            </div>
          ) : (
            <div className="text-neutral-400 text-sm">Select a conversation</div>
          )}
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-md bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700 flex items-center justify-center" title="Audio call"><FiPhone /></button>
            <button className="w-9 h-9 rounded-md bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700 flex items-center justify-center" title="Video call"><FiVideo /></button>
            <button className="w-9 h-9 rounded-md bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700 flex items-center justify-center" title="Info"><FiInfo /></button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-3 bg-[url('https://i.imgur.com/3yR2c7M.png')] bg-cover bg-center">
          {currentMsgs.map((m, idx) => {
            const day = renderDateDivider(m.ts);
            const showDivider = day !== lastDay;
            if (showDivider) lastDay = day;
            return (
              <React.Fragment key={m.id}>
                {showDivider && (
                  <div className="text-[11px] text-neutral-400 text-center my-1">
                    <span className="px-2 py-0.5 rounded-full bg-neutral-900 border border-white/10">{day}</span>
                  </div>
                )}
                <div className={`max-w-[75%] w-fit ${m.fromMe ? 'ml-auto' : ''}`}>
                  <div className={`${m.fromMe ? 'bg-orange-400 text-black' : 'bg-neutral-800 text-white'} rounded-2xl px-3 py-2 border border-white/10`}> 
                    <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                    <div className="text-[10px] opacity-70 mt-0.5 flex items-center gap-1 justify-end">
                      {new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {m.fromMe && <span title="Delivered">✓✓</span>}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          {isTyping && (
            <div className="max-w-[75%] w-fit">
              <div className="bg-neutral-800 text-white rounded-2xl px-3 py-2 border border-white/10 inline-flex items-center gap-2">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                </span>
              </div>
            </div>
          )}
          {currentMsgs.length === 0 && !isTyping && (
            <div className="text-neutral-400 text-sm">No messages yet. Say hi 👋</div>
          )}
        </div>

        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-md bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700 flex items-center justify-center" title="Attach"><FiPaperclip /></button>
            <button className="w-9 h-9 rounded-md bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700 flex items-center justify-center" title="Emoji"><FiSmile /></button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
              className="inp flex-1"
              placeholder="Write a message..."
            />
            {input.trim() ? (
              <button className="w-10 h-10 rounded-md bg-orange-400 text-black hover:bg-orange-500 flex items-center justify-center" onClick={send} title="Send"><FiSend /></button>
            ) : (
              <button className="w-9 h-9 rounded-md bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700 flex items-center justify-center" title="Voice"><FiMic /></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
