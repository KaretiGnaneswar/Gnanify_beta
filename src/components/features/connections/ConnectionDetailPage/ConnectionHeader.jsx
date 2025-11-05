import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getConnectionStatus } from "@/services/connections";
import ConnectButton from "@/components/features/connections/ConnectButton";
import IncomingActionButtons from "@/components/features/connections/IncomingActionButtons";

export default function GnanifyIDCard({
  user,
  connected,
  setConnected,
  width = 500,
  height = 600,
}) {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [status, setStatus] = useState("none");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await getConnectionStatus(user.id);
        if (alive) setStatus(res?.status || "none");
      } catch {
        if (alive) setStatus("none");
      }
    })();
    return () => {
      alive = false;
    };
  }, [user.id]);
  useEffect(() => {
  console.log("🧠 User Data in ID Card:", user);
}, [user]);


  const isSelf =
    currentUser?.id && user?.id && String(currentUser.id) === String(user.id);

  const tag =
    isSelf
      ? { label: "You", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300" }
      : status === "connected"
      ? { label: "Connected", color: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300" }
      : status === "pending_outgoing"
      ? { label: "Requested", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300" }
      : status === "pending_incoming"
      ? { label: "Requested You", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300" }
      : { label: "Not Connected", color: "bg-neutral-100 text-neutral-700 dark:bg-white/5 dark:text-neutral-300" };

  const isContributor =
  user.title?.toLowerCase() === "contributor";

  const cardBaseClasses = `
    relative z-10
    w-[560px] sm:w-[640px] md:w-[700px]
    h-[440px] md:h-[460px] lg:h-[480px]
    rounded-3xl overflow-hidden shadow-2xl border backdrop-blur-xl
  `;

  const contributorStyle = `
    bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 
    border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-gradient-x
  `;

  const normalStyle = `bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700`;

  return (
    <div className="flex justify-center items-start min-h-screen pt-8 relative">
      {/* Strap (Thread) */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-28 bg-gradient-to-b from-gray-600 via-gray-400 to-gray-300 rounded-full z-0"
        initial={{ height: 0 }}
        animate={{ height: 120 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      />

      {/* ID Card */}
      <motion.div
        initial={{ y: -180, opacity: 0, rotateX: 10 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
        className={`${cardBaseClasses} ${
          isContributor ? contributorStyle : normalStyle
        }`}
        style={{
          transformOrigin: "top center",
          backgroundSize: "300% 300%",
        }}
        whileHover={{ rotateZ: 1 }}
      >
        {/* Hole */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full shadow-inner"></div>

        {/* Status Tag */}
        <motion.div
          className={`absolute top-2 right-1 -translate-x-1/2 px-1 py-1 rounded-full text-[10px]  shadow-md ${tag.color}`}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {tag.label}
        </motion.div>

        {/* Header */}
        <div className="pt-10 text-center">
          <h1
            className={`font-bold text-2xl tracking-wide drop-shadow-md ${
              isContributor ? "text-white" : "text-gray-800 dark:text-white"
            }`}
          >
            Gnanify • ID Card
          </h1>
          <p
            className={`text-sm mt-1 ${
              isContributor ? "text-white/80" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Empowering Tech Minds • Since 2024
          </p>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center mt-8">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            className={`w-32 h-32 rounded-2xl overflow-hidden border-4 ${
              isContributor
                ? "border-white/50 shadow-lg"
                : "border-gray-300 dark:border-gray-700 shadow-md"
            }`}
          >
            <img
              src={user.avatarUrl || "/default-avatar.png"}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div
            className={`mt-4 text-center ${
              isContributor ? "text-white" : "text-gray-800 dark:text-white"
            }`}
          >
            <h2 className="text-2xl font-bold truncate">{user.name}</h2>
            <p className="text-sm opacity-90">{user.title}</p>
            <p className="text-xs opacity-70 mt-1 truncate">
              {user.location || "—"}
            </p>
          </div>
        </div>

        {/* Info */}
        <div
          className={`mt-13 rounded-2xl mx-8 px-5 py-4 text-sm backdrop-blur-md space-y-1 ${
            isContributor
              ? "bg-white/10 text-white"
              : "bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200"
          }`}
        >
          {user.email && (
            <div className="flex justify-between border-b border-white/10 py-1">
              <span className="opacity-70">Email</span>
              <span className="truncate">{user.email}</span>
            </div>
          )}
          {user.department && (
            <div className="flex justify-between border-b border-white/10 py-1">
              <span className="opacity-70">Department</span>
              <span>{user.department}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isSelf && (
          <div className="absolute bottom-11 left-0 right-0 flex  justify-center gap-4">
            {status === "pending_incoming" ? (
              <IncomingActionButtons
                userId={user.id}
                onDone={async () => {
                  const res = await getConnectionStatus(user.id);
                  setStatus(res?.status || "none");
                  if (
                    res?.status === "connected" &&
                    typeof setConnected === "function"
                  )
                    setConnected(true);
                }}
              />
            ) : (
              <>
  <ConnectButton userId={user.id} initialConnected={connected} />

  {status === "connected" && (
    <button
      onClick={() =>
        navigate(
          `/messages?user=${encodeURIComponent(
            user.id
          )}&name=${encodeURIComponent(
            user.name
          )}&avatar=${encodeURIComponent(user.avatarUrl || "")}`
        )
      }
      className={`h-9 px-4 rounded-md text-[10px] font-semibold transition ${
        isContributor
          ? "bg-white/10 text-white border border-white/20 hover:bg-white/20"
          : "bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-neutral-600"
      }`}
    >
      Message
    </button>
  )}
</>

            )}
          </div>
        )}

        {/* Footer */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-10 flex items-center justify-center text-[11px] tracking-widest ${
            isContributor
              ? "bg-white/10 text-white/80"
              : "bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-gray-400"
          }`}
        >
          GNANIFY • VERIFIED ID #{user.id}
        </div>
      </motion.div>
    </div>
  );
}
