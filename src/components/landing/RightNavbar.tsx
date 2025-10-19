import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { createServiceClient } from "@/lib/api/client";
import { config } from "@/lib/config";
import LogoutConfirmModal from "@/components/common/LogoutConfirmModal";

// Top Navbar
const TopNavbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [canSwitch, setCanSwitch] = useState(false);
  const [rank, setRank] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    (async () => {
      try {
        const api = createServiceClient(config.apiBaseUrl, {
          getToken: () => localStorage.getItem('auth_token'),
        });
        const data = await api.get('/core/profile/');
        const role = (data as any)?.role;
        const rnk = (data as any)?.rank;
        setCanSwitch(role === 'contributor' || role === 'admin');
        if (typeof rnk === 'number') setRank(rnk);
      } catch {}
    })();
  }, []);

  // Notifications (connection requests)
  const [showNotifs, setShowNotifs] = useState(false);
  const [incoming, setIncoming] = useState<any[]>([]);
  const [outgoing, setOutgoing] = useState<any[]>([]);
  const [notifLoading, setNotifLoading] = useState(false);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    try {
      setNotifLoading(true);
      const api = createServiceClient(config.apiBaseUrl, {
        getToken: () => localStorage.getItem('auth_token'),
      });
      const [inc, out] = await Promise.all([
        api.get('/connections/requests/incoming/'),
        api.get('/connections/requests/outgoing/'),
      ]);
      setIncoming((inc as any)?.results || []);
      setOutgoing((out as any)?.results || []);
    } finally {
      setNotifLoading(false);
    }
  };

  useEffect(() => {
    if (showNotifs) fetchNotifications();
  }, [showNotifs]);

  const acceptRequest = async (requestId: string) => {
    const api = createServiceClient(config.apiBaseUrl, {
      getToken: () => localStorage.getItem('auth_token'),
    });
    await api.post(`/connections/requests/${requestId}/accept/`, {});
    // Refresh lists after accept
    fetchNotifications();
  };

  const handleProfileClick = () => {
    // Always navigate to profile inside dashboard
    navigate("/dashboard/profile");
  };

  const handleSwitchClick = () => {
    // Redirect to contributor studio
    window.location.href = "http://localhost:5174";
  };

  const handleSearch = () => {
    console.log("Search for:", searchQuery);
    // You can add navigation or filtering logic here
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-gray-900/60 text-white shadow-lg border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <div
            className="text-2xl font-bold text-orange-400 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("/dashboard/home")}
          >
            Gnanify
          </div>

          {/* Search Input */}
          <div className="flex items-center flex-1 mx-6 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search..."
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800/70 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
            />
            <button
              onClick={handleSearch}
              className="ml-2 px-4 py-2 bg-orange-400 text-black font-semibold rounded-lg hover:bg-orange-500 transition-colors duration-300"
            >
              Search
            </button>
          </div>

          <div className="flex items-center space-x-4 relative">
            <div className="flex items-center bg-yellow-400 text-black rounded-full px-3 py-1 font-semibold" title="Rank">
              <span className="mr-1">🏆</span> {rank ?? 0}
            </div>
            <div className="relative">
              <button className="relative" onClick={() => setShowNotifs((s) => !s)}>
                🔔
                {(incoming?.length || 0) > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs min-w-4 h-4 px-1 flex items-center justify-center">
                    {incoming.length}
                  </span>
                )}
              </button>
              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-auto rounded-lg border border-white/10 bg-gray-900/90 backdrop-blur-md shadow-xl z-50">
                  <div className="p-3 border-b border-white/10 text-sm font-semibold text-white">Notifications</div>
                  <div className="p-3 space-y-3">
                    {notifLoading ? (
                      <div className="text-gray-400 text-sm">Loading…</div>
                    ) : (
                      <>
                        <div>
                          <div className="text-xs uppercase text-gray-400 mb-1">Incoming requests</div>
                          {(incoming || []).length === 0 ? (
                            <div className="text-gray-500 text-sm">No incoming requests</div>
                          ) : (
                            (incoming || []).map((r: any) => (
                              <div key={r.request_id} className="flex items-center justify-between bg-gray-800/60 border border-white/10 rounded-md p-2 mb-2">
                                <div className="min-w-0">
                                  <div className="text-white text-sm truncate">{r.from_user?.name}</div>
                                  <div className="text-gray-400 text-xs truncate">{r.from_user?.email}</div>
                                </div>
                                <button
                                  className="px-2 py-1 bg-orange-400 text-black rounded text-xs hover:bg-orange-500"
                                  onClick={() => acceptRequest(r.request_id)}
                                >
                                  Accept
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                        <div>
                          <div className="text-xs uppercase text-gray-400 mb-1">Outgoing requests</div>
                          {(outgoing || []).length === 0 ? (
                            <div className="text-gray-500 text-sm">No outgoing requests</div>
                          ) : (
                            (outgoing || []).map((r: any) => (
                              <div key={r.request_id} className="flex items-center justify-between bg-gray-800/60 border border-white/10 rounded-md p-2 mb-2">
                                <div className="min-w-0">
                                  <div className="text-white text-sm truncate">{r.to_user?.name}</div>
                                  <div className="text-gray-400 text-xs truncate">{r.to_user?.email}</div>
                                </div>
                                <span className="text-gray-400 text-xs">Requested</span>
                              </div>
                            ))
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div onClick={handleProfileClick} className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold cursor-pointer">
              N
            </div>
            {canSwitch && (
              <button onClick={handleSwitchClick} className="px-3 py-1 rounded-md bg-orange-400 text-black font-semibold hover:bg-orange-500">
                Switch
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Left Sidebar
const LeftSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const buttons = [
    { icon: "🏠", title: "Home", path: "home" },
    { icon: "💻", title: "Compiler", path: "compiler" },
    { icon: "📄", title: "Resume", path: "resume" },
    { icon: "📰", title: "Tech News", path: "technews" },
    { icon: "📝", title: "Blogs", path: "blogs" },
    { icon: "📚", title: "Courses", path: "courses" },
    { icon: "🤝", title: "Connections", path: "connections" },
    { icon: "⚙️", title: "Settings", path: "settings" },
    { icon: "🚪", title: "Logout" },
  ];

  const doLogout = () => {
    try { localStorage.removeItem("auth_token"); } catch {}
    try { window.dispatchEvent(new Event('auth:changed')); } catch {}
    navigate("/", { replace: true });
  };

  const handleClick = (title: string, path?: string) => {
    if (title === "Logout") {
      setLogoutOpen(true);
    } else if (path) {
      navigate(`/dashboard/${path}`);
    }
  };

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-20 flex flex-col justify-start backdrop-blur-md bg-gray-900/60 border-r border-white/10 shadow-lg z-50 py-2 items-center">
      {buttons.map((btn) => (
        <div key={btn.title} className="flex flex-col items-center my-2">
          <button
            onClick={() => handleClick(btn.title, (btn as any).path)}
            className={`flex items-center justify-center w-12 h-12 rounded transition-colors duration-200 ${
              (btn as any).path && location.pathname.includes(`/dashboard/${(btn as any).path}`)
                ? "bg-orange-400 text-white"
                : "hover:bg-gray-800/70 text-white"
            }`}
          >
            {btn.icon}
          </button>
          <span className="text-xs mt-1 text-white">{btn.title}</span>
        </div>
      ))}

      <LogoutConfirmModal
        open={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onConfirm={() => { setLogoutOpen(false); doLogout(); }}
      />
    </div>
  );
};

// Main App Layout
const AppLayout: React.FC = () => {
  return (
    <div>
      <TopNavbar />
      <LeftSidebar />
      <div className="ml-20 mt-16 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
