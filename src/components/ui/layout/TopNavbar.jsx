import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createServiceClient } from "@/lib/api/client";
import { config } from "@/lib/config";
import { useAuth } from "@/context/AuthContext";
import { FiMessageSquare } from "react-icons/fi"; // Messenger icon

const TopNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth();

  const [canSwitch, setCanSwitch] = useState(false);
  const [rank, setRank] = useState(null);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const api = createServiceClient(config.apiBaseUrl, {
          getToken: () => token,
        });
        const data = await api.get("/auth/profile/");
        const role = data?.role;
        const rnk = data?.rank;
        setCanSwitch(role === "contributor" || role === "admin");
        if (typeof rnk === "number") setRank(rnk);
      } catch {}
    })();
  }, [token]);

  // Notifications
  const [showNotifs, setShowNotifs] = useState(false);
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);

  const fetchNotifications = async () => {
    if (!token) return;
    try {
      setNotifLoading(true);
      const api = createServiceClient(config.apiBaseUrl, {
        getToken: () => token,
      });
      const [inc, out] = await Promise.all([
        api.get("/connections/requests/incoming/"),
        api.get("/connections/requests/outgoing/"),
      ]);
      setIncoming(inc?.results || []);
      setOutgoing(out?.results || []);
    } finally {
      setNotifLoading(false);
    }
  };

  useEffect(() => {
    if (showNotifs) fetchNotifications();
  }, [showNotifs]);

  const acceptRequest = async (requestId) => {
    if (!token) return;
    const api = createServiceClient(config.apiBaseUrl, {
      getToken: () => token,
    });
    await api.post(`/connections/requests/${requestId}/accept/`, {});
    fetchNotifications();
  };

  const handleProfileClick = () => navigate("/profile");
  const handleSwitchClick = () => (window.location.href = "http://localhost:5174");
  const handleMessagesClick = () => navigate("/messages"); // Messenger click
  const handleSearch = () => console.log("Search for:", searchQuery);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-gray-900/60 text-white shadow-lg border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-14 py-1 px-6">
          {/* Logo */}
          <div
            className="text-2xl font-bold text-orange-400 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("/")}
          >
            Gnanify
          </div>

          {/* Search bar */}
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

          {/* Right side */}
          <div className="flex items-center space-x-4 relative">
            {/* Rank */}
            <div className="flex items-center bg-yellow-400 text-black rounded-full px-3 py-1 font-semibold" title="Rank">
              <span className="mr-1">🏆</span> {rank ?? 0}
            </div>

            {/* Timetable */}
            <button
              onClick={() => navigate("/timetable")}
              className="text-orange-400 hover:text-orange-500 text-xl"
              title="GATE Timetable"
            >
              🗓️
            </button>

            {/* Messenger Icon */}
            <button
              onClick={handleMessagesClick}
              className="text-blue-400 hover:text-blue-500 text-xl"
              title="Messages"
            >
              <FiMessageSquare />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="relative" onClick={() => setShowNotifs((s) => !s)}>
                🔔
                {incoming.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs min-w-4 h-4 px-1 flex items-center justify-center">
                    {incoming.length}
                  </span>
                )}
              </button>

              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-auto rounded-lg border border-white/10 bg-gray-900/90 backdrop-blur-md shadow-xl z-50">
                  <div className="p-3 border-b border-white/10 text-sm font-semibold text-white">
                    Notifications
                  </div>
                  <div className="p-3 space-y-3">
                    {notifLoading ? (
                      <div className="text-gray-400 text-sm">Loading…</div>
                    ) : (
                      <>
                        {/* Incoming */}
                        <div>
                          <div className="text-xs uppercase text-gray-400 mb-1">Incoming requests</div>
                          {incoming.length === 0 ? (
                            <div className="text-gray-500 text-sm">No incoming requests</div>
                          ) : (
                            incoming.map((r) => (
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

                        {/* Outgoing */}
                        <div>
                          <div className="text-xs uppercase text-gray-400 mb-1">Outgoing requests</div>
                          {outgoing.length === 0 ? (
                            <div className="text-gray-500 text-sm">No outgoing requests</div>
                          ) : (
                            outgoing.map((r) => (
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

            {/* Profile */}
            <div onClick={handleProfileClick} className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold cursor-pointer">
              N
            </div>

            {/* Switch */}
            {canSwitch && (
              <button
                onClick={handleSwitchClick}
                className="px-3 py-1 rounded-md bg-orange-400 text-black font-semibold hover:bg-orange-500"
              >
                Switch
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
