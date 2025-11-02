import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { ensureThread, fetchThreads, fetchMessages, sendChat, messagesApi } from '@/services/messages';
import ChatList from '@/components/features/messages/ChatList';
import ChatHeader from '@/components/features/messages/ChatHeader';
import ChatWindow from '@/components/features/messages/ChatWindow';
import ChatComposer from '@/components/features/messages/ChatComposer';

export default function MessagesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all | unread
  const [selectedId, setSelectedId] = useState(null);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const [conversations, setConversations] = useState([]);
  const [messagesById, setMessagesById] = useState({}); // { [threadId]: [{id, fromMe, text, ts}] }

  useEffect(() => {
    if (!selectedId && conversations.length) setSelectedId(conversations[0].id);
  }, [conversations, selectedId]);

  useEffect(() => {
    let mounted = true;
    const bootstrap = async () => {
      // 1) Load threads list
      try {
        const list = await fetchThreads();
        if (!mounted) return;
        const mapped = (list || []).map((t) => ({
          id: String(t.id),
          name: t.peer?.name || 'User',
          avatar: t.peer?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.peer?.name || 'User')}`,
          last: t.last_message?.text || '',
          time: t.last_message?.created_at ? new Date(t.last_message.created_at).getTime() : new Date(t.created_at).getTime(),
          unread: t.unread_count || 0,
          peerId: String(t.peer?.id || ''),
        }));
        setConversations(mapped);
      } catch {}

      // 2) If navigated with ?user=<id>, ensure a thread and select it
      try {
        const params = new URLSearchParams(location.search);
        const uid = params.get('user');
        if (uid) {
          const threadId = await ensureThread(uid);
          if (!mounted) return;
          // If the thread is not yet in conversations, push a placeholder (will be refreshed by polling)
          setConversations((prev) => {
            if (prev.some((c) => c.id === String(threadId))) return prev;
            const name = params.get('name') || 'User';
            const avatar = params.get('avatar') || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
            return [{ id: String(threadId), name, avatar, last: '', time: Date.now(), unread: 0, peerId: String(uid) }, ...prev];
          });
          setSelectedId(String(threadId));
        }
      } catch {}
    };
    bootstrap();
    return () => { mounted = false; };
  }, [location.search]);

  // Poll threads list periodically to keep left pane fresh
  useEffect(() => {
    let alive = true;
    const tick = async () => {
      try {
        const list = await fetchThreads();
        if (!alive) return;
        const mapped = (list || []).map((t) => ({
          id: String(t.id),
          name: t.peer?.name || 'User',
          avatar: t.peer?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.peer?.name || 'User')}`,
          last: t.last_message?.text || '',
          time: t.last_message?.created_at ? new Date(t.last_message.created_at).getTime() : new Date(t.created_at).getTime(),
          unread: t.unread_count || 0,
          peerId: String(t.peer?.id || ''),
        }));
        setConversations(mapped);
      } catch {}
    };
    const id = setInterval(tick, 3000);
    tick();
    return () => { alive = false; clearInterval(id); };
  }, []);

  // Load messages for selected thread and mark as read
  useEffect(() => {
    if (!selectedId) return;
    let alive = true;
    const load = async () => {
      try {
        const res = await fetchMessages(selectedId);
        if (!alive) return;
        const msgs = (res?.messages || []).map((m) => ({
          id: String(m.id),
          fromMe: !!m.fromMe,
          text: m.text,
          ts: new Date(m.created_at).getTime(),
          is_read: !!m.is_read,
        }));
        setMessagesById((prev) => ({ ...prev, [selectedId]: msgs }));
        // mark read when opened
        try { await messagesApi.markRead(selectedId); } catch {}
      } catch {}
    };
    load();
    return () => { alive = false; };
  }, [selectedId]);

  // Auto-refresh messages for the currently selected thread
  useEffect(() => {
    if (!selectedId) return;
    let alive = true;
    const tick = async () => {
      try {
        const res = await fetchMessages(selectedId);
        if (!alive) return;
        const msgs = (res?.messages || []).map((m) => ({
          id: String(m.id),
          fromMe: !!m.fromMe,
          text: m.text,
          ts: new Date(m.created_at).getTime(),
          is_read: !!m.is_read,
        }));
        setMessagesById((prev) => ({ ...prev, [selectedId]: msgs }));
      } catch {}
    };
    const id = setInterval(tick, 2000);
    tick();
    return () => { alive = false; clearInterval(id); };
  }, [selectedId]);

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
  const isTyping = false;

  const send = async () => {
    const txt = input.trim();
    if (!txt || !selectedId) return;
    try {
      const m = await sendChat(selectedId, txt);
      const msg = { id: String(m.id), fromMe: true, text: m.text, ts: new Date(m.created_at).getTime(), is_read: !!m.is_read };
      setMessagesById((prev) => ({ ...prev, [selectedId]: [...(prev[selectedId] || []), msg] }));
      setInput('');
      setConversations((prev) => prev.map((c) => (c.id === selectedId ? { ...c, last: txt, time: Date.now(), unread: 0 } : c)));
    } catch (e) {
      console.error('Failed to send message', e);
    }
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
      <ChatList
        query={query}
        setQuery={setQuery}
        filter={filter}
        setFilter={setFilter}
        listItems={listItems}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

      {/* Right: conversation */}
      <div className="card md:col-span-2 overflow-hidden flex flex-col">
        <ChatHeader current={current} isTyping={isTyping} />

        <ChatWindow currentMsgs={currentMsgs} scrollRef={scrollRef} />

        <ChatComposer input={input} setInput={setInput} onSend={send} />
      </div>
    </div>
  );
}
