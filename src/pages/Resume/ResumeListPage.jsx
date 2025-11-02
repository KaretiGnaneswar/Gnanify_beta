// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { resumeApi } from '@/services/resume';

// export default function ResumeListPage() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoading(true);
//         const data = await resumeApi.list();
//         if (mounted) setItems(Array.isArray(data) ? data : []);
//       } catch (e) {
//         if (mounted) setError('Failed to load resumes');
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => { mounted = false; };
//   }, []);

//   return (
//     <div className="p-4">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold">My Resumes</h1>
//         <button
//           onClick={() => navigate('/resume/new')}
//           className="px-4 py-2 rounded-md bg-orange-400 text-black font-semibold hover:bg-orange-500"
//         >
//           New Resume
//         </button>
//       </div>

//       {loading && <div className="mt-3 text-gray-400">Loading…</div>}
//       {error && <div className="mt-3 text-red-400 text-sm">{error}</div>}

//       {!loading && !error && (
//         <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {items.map((r) => (
//             <div key={r.id} className="rounded border border-white/10 bg-gray-900/40 p-4">
//               <div className="text-white font-medium truncate">{r.title}</div>
//               <div className="text-xs text-gray-400 mt-1">Template: {r.template_key}</div>
//               <div className="text-xs text-gray-500">Updated: {r.updated_at ? new Date(r.updated_at).toLocaleString() : '-'}</div>
//               <div className="mt-3 flex gap-2">
//                 <button onClick={() => navigate(`/resume/${r.id}/edit`)} className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm">Edit</button>
//                 <button onClick={async () => {
//                   if (!confirm('Delete this resume?')) return;
//                   await resumeApi.del(r.id);
//                   setItems((prev) => prev.filter((x) => x.id !== r.id));
//                 }} className="px-3 py-1 rounded bg-red-600/20 text-red-300 border border-red-500/40 text-sm hover:bg-red-600/30">Delete</button>
//               </div>
//             </div>
//           ))}
//           {items.length === 0 && (
//             <div className="text-gray-400">No resumes yet. Click New Resume to start.</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Download, Zap } from "lucide-react";

export default function ResumeHome() {
  const steps = [
    {
      icon: <FileText className="w-8 h-8 text-orange-500" />,
      title: "Enter Your Details",
      desc: "Add your education, experience, and skills in our guided resume form.",
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "Choose a Template",
      desc: "Pick from modern, HR-approved templates optimized for ATS systems.",
    },
    {
      icon: <Download className="w-8 h-8 text-orange-500" />,
      title: "Download Instantly",
      desc: "Get your perfectly formatted resume in PDF — ready to apply anywhere.",
    },
  ];

  const features = [
    { title: "ATS-Optimized Templates", desc: "No formatting loss — every design passes recruiter screening." },
    { title: "Keyword Suggestions", desc: "Get relevant job-specific keyword recommendations." },
    { title: "Instant Preview", desc: "See every change live as you type your details." },
    { title: "Multiple Themes", desc: "Switch between light & dark instantly." },
    { title: "Secure Storage", desc: "Your resume data is encrypted and private." },
    { title: "No Signup Needed", desc: "Start creating in seconds — no login required." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6"
        >
          Build Your <span className="text-orange-500">ATS-Friendly Resume</span> in Minutes
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg mb-8">
          Create a professional, recruiter-approved resume that passes ATS filters and gets you noticed.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all"
        >
          Create My Resume
        </motion.button>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50 dark:bg-[#161b22] px-6">
        <h2 className="text-3xl font-bold text-center mb-14">How It Works</h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="p-8 bg-white dark:bg-[#1f242c] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm"
            >
              <div className="mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-14">Why Choose Gnanify Resume Builder?</h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-[#1f242c] border border-gray-200 dark:border-gray-700 transition-all"
            >
              <CheckCircle className="text-orange-500 w-6 h-6 mb-3" />
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-orange-500 text-white">
        <h2 className="text-3xl font-bold mb-4">Start Building Your Resume Now</h2>
        <p className="text-white/90 mb-6">
          It’s fast, free, and 100% optimized for Applicant Tracking Systems.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-gray-100"
        >
          Get Started Free
        </motion.button>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} Gnanify Resume Builder — All rights reserved.
      </footer>
    </div>
  );
}
