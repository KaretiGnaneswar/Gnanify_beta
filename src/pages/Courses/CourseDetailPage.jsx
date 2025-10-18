import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourse, getLectures, getAssignments, enrollFree, purchaseCourse } from '@/services/courses.dummy';
import PriceTag from '@/components/Courses/PriceTag';
import VideoPlayer from '@/components/Courses/VideoPlayer';
import LectureList from '@/components/Courses/LectureList';
import BuyPrompt from '@/components/Courses/BuyPrompt';
import NotesPdfModal from '@/components/Courses/NotesPdfModal';
import AssignmentMcqModal from '@/components/Courses/AssignmentMcqModal';
import { getProfile as getUserProfile } from '@/services/connections.dummy';
import { openRazorpayCheckout } from '@/services/payments.razorpay';

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [lectures, setLectures] = useState([]);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [purchased, setPurchased] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfLecture, setPdfLecture] = useState(null);
  const [instructorProfile, setInstructorProfile] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState({}); // { [assignmentId]: true }
  const [progressByLecture, setProgressByLecture] = useState({}); // { [lectureId]: number 0-100 }
  const [completedSet, setCompletedSet] = useState(new Set());
  const [mcqOpen, setMcqOpen] = useState(false);
  const [mcqAssignment, setMcqAssignment] = useState(null);
  const [mcqResult, setMcqResult] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getCourse(id);
        const lecs = await getLectures(id);
        const asgs = await getAssignments(id);
        if (mounted) {
          setCourse(data);
          setLectures(lecs);
          setAssignments(asgs);
          setCurrentLecture(lecs[0] || null);
          // load instructor profile for avatar/name link
          if (data?.instructorId) {
            try {
              const prof = await getUserProfile(data.instructorId);
              if (prof && mounted) setInstructorProfile(prof);
            } catch {}
          }
          // load purchased flag
          try {
            const p = localStorage.getItem(`course_purchased_${id}`);
            if (p === 'true') setPurchased(true);
          } catch {}
          // load saved progress
          try {
            const raw = localStorage.getItem(`course_progress_${id}`);
            if (raw) {
              const obj = JSON.parse(raw) || {};
              setProgressByLecture(obj);
              const comp = new Set(Object.entries(obj).filter(([, p]) => p >= 99).map(([lid]) => lid));
              setCompletedSet(comp);
            }
          } catch {}
          try {
            const rawA = localStorage.getItem(`course_assignments_${id}`);
            if (rawA) setAssignmentSubmitted(JSON.parse(rawA) || {});
          } catch {}
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleEnroll = async () => {
    try {
      setActionLoading(true);
      const res = await enrollFree(course.id);
      setMessage(res?.success ? 'Enrolled successfully.' : 'Failed to enroll.');
    } finally {
      setActionLoading(false);
    }
  };

  const handlePurchase = async () => {
    try {
      setActionLoading(true);
      const res = await purchaseCourse(course.id);
      setMessage(res?.success ? `Purchase successful. Order: ${res.orderId}` : 'Purchase failed.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="p-4 text-gray-400">Loading course…</div>;
  if (!course)
    return (
      <div className="p-4">
        <Link to="/dashboard/courses" className="text-blue-500 hover:underline">← Back to Courses</Link>
        <div className="mt-4 text-gray-300">Course not found.</div>
      </div>
    );

  const isFree = !course.price || course.price === 0;
  const hasAccess = isFree || purchased;
  const firstId = lectures?.[0]?.id;
  // Build per-lecture assignments (ensure one assignment after each lecture)
  const derivedAssignments = (lectures || []).map((l, idx) => {
    const explicit = (assignments || []).find(
      (a) => a.lectureId === l.id || (a.afterLectures || []).includes(l.id)
    );
    return (
      explicit || {
        id: `auto_${l.id}`,
        title: `Assignment ${idx + 1}`,
        afterLectures: [l.id],
        description: '',
      }
    );
  });
  const assignmentByLectureId = new Map(
    derivedAssignments.map((a, i) => [a.afterLectures?.[0] || (lectures[i] && lectures[i].id), a])
  );
  // Compute locked lectures: if paid, only first unlocked by purchase; also require prev lecture completed and its assignment submitted
  const lockedIds = new Set();
  (lectures || []).forEach((l, idx) => {
    if (!hasAccess && l.id !== firstId) {
      lockedIds.add(l.id);
      return;
    }
    if (idx === 0) return;
    const prevId = lectures[idx - 1]?.id;
    if (!completedSet.has(prevId)) {
      lockedIds.add(l.id);
      return;
    }
    const a = assignmentByLectureId.get(prevId);
    if (a && !assignmentSubmitted[a.id]) {
      lockedIds.add(l.id);
    }
  });

  return (
    <div className="p-4 space-y-6">
      <Link to="/dashboard/courses" className="text-blue-500 hover:underline">← Back to Courses</Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Video + Course Meta */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-white/10 bg-black overflow-hidden">
            {currentLecture ? (
              <VideoPlayer
                src={currentLecture.videoUrl}
                title={currentLecture.title}
                enforceNoSkip={true}
                onProgress={(pct) => {
                  // update per-lecture progress
                  setProgressByLecture((prev) => {
                    const next = { ...prev, [currentLecture.id]: Math.max(prev[currentLecture.id] || 0, Math.floor(pct)) };
                    try { localStorage.setItem(`course_progress_${id}`, JSON.stringify(next)); } catch {}
                    return next;
                  });
                }}
                onComplete={() => {
                  setCompletedSet((prev) => new Set(prev).add(currentLecture.id));
                  setProgressByLecture((prev) => {
                    const next = { ...prev, [currentLecture.id]: 100 };
                    try { localStorage.setItem(`course_progress_${id}`, JSON.stringify(next)); } catch {}
                    return next;
                  });
                }}
              />
            ) : (
              <VideoPlayer src={course.thumbnail} title={course.title} />
            )}
          </div>
          <div className="rounded-xl border border-white/10 bg-gray-900/40 backdrop-blur-md p-6 space-y-2">
            <h1 className="text-2xl font-bold text-white">{course.title}</h1>
            <div className="text-gray-300 flex items-center gap-2">
              <span>By</span>
              <Link
                to={`/dashboard/connections/${course.instructorId}`}
                className="inline-flex items-center gap-2 text-blue-400 hover:underline"
                title="View instructor profile"
              >
                {instructorProfile?.avatarUrl ? (
                  <img
                    src={instructorProfile.avatarUrl}
                    alt={course.instructor}
                    className="w-6 h-6 rounded-full object-cover border border-white/10"
                  />
                ) : null}
                <span>{course.instructor}</span>
              </Link>
            </div>
            <div className="text-sm text-gray-400">{course.level} • ⭐ {course.rating} • {course.students.toLocaleString()} students</div>
            <div className="flex items-center gap-3 mt-2">
              <PriceTag price={course.price} currency={course.currency} />
              <div className="flex gap-2">
                {isFree ? (
                  <button
                    onClick={handleEnroll}
                    disabled={actionLoading}
                    className={`px-4 py-2 rounded-lg font-medium bg-green-500 text-black hover:bg-green-400 ${actionLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {actionLoading ? 'Please wait…' : 'Enroll for Free'}
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      try {
                        setActionLoading(true);
                        await openRazorpayCheckout({
                          amount: (course.price || 0) * 100, // paise
                          currency: course.currency || 'INR',
                          name: 'Gnanify',
                          description: course.title,
                          notes: { courseId: id },
                          onSuccess: () => {
                            setPurchased(true);
                            try { localStorage.setItem(`course_purchased_${id}`, 'true'); } catch {}
                            setBuyOpen(false);
                            setMessage('Payment successful via Razorpay. All lectures unlocked.');
                          },
                          onFailure: async () => {
                            // Fallback to demo purchase flow
                            await handlePurchase();
                            setPurchased(true);
                            try { localStorage.setItem(`course_purchased_${id}`, 'true'); } catch {}
                            setBuyOpen(false);
                            setMessage('Purchase successful. All lectures unlocked.');
                          },
                        });
                      } catch (e) {
                        // Fallback if Razorpay script fails
                        await handlePurchase();
                        setPurchased(true);
                        try { localStorage.setItem(`course_purchased_${id}`, 'true'); } catch {}
                        setBuyOpen(false);
                        setMessage('Purchase successful. All lectures unlocked.');
                      } finally {
                        setActionLoading(false);
                      }
                    }}
                    disabled={actionLoading}
                    className={`px-4 py-2 rounded-lg font-medium bg-orange-400 text-black hover:bg-orange-500 ${actionLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {actionLoading ? 'Processing…' : 'Buy Now'}
                  </button>
                )}
              </div>
            </div>
            {course.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {course.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-200 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        {/* Right: Lecture List */}
        <div className="rounded-xl border border-white/10 bg-gray-900/40 backdrop-blur-md p-4">
          <h2 className="text-lg font-semibold text-white mb-3">Lectures</h2>
          <LectureList
            lectures={lectures}
            currentId={currentLecture?.id}
            lockedIds={lockedIds}
            onSelect={(lec) => {
              if (lockedIds.has(lec.id)) {
                setBuyOpen(true);
                return;
              }
              setCurrentLecture(lec);
            }}
            onOpenNotes={(lec) => {
              setPdfLecture(lec);
              setPdfOpen(true);
            }}
            renderBelow={(lec) => {
              const a = assignmentByLectureId.get(lec.id);
              if (!a) return null;
              const unlocked = completedSet.has(lec.id);
              const submitted = !!assignmentSubmitted[a.id];
              return (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white">{a.title}</div>
                    <div className="text-xs text-gray-400">Assignment related to this lecture</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1.5 rounded-md text-sm font-medium ${unlocked ? 'bg-blue-500 text-black hover:bg-blue-400' : 'bg-gray-700 text-gray-300 cursor-not-allowed'}`}
                      disabled={!unlocked}
                      onClick={() => {
                        setMcqAssignment(a);
                        setMcqResult(null);
                        setMcqOpen(true);
                      }}
                    >
                      {unlocked ? 'Open' : 'Locked'}
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-md text-sm font-medium ${unlocked ? (submitted ? 'bg-green-600 text-white' : 'bg-emerald-500 text-black hover:bg-emerald-400') : 'bg-gray-700 text-gray-300 cursor-not-allowed'}`}
                      disabled={!unlocked}
                      onClick={() => {
                        const next = { ...assignmentSubmitted, [a.id]: true };
                        setAssignmentSubmitted(next);
                        try { localStorage.setItem(`course_assignments_${id}`, JSON.stringify(next)); } catch {}
                        setMessage(`${a.title} submitted (demo).`);
                      }}
                    >
                      {submitted ? 'Submitted' : 'Submit'}
                    </button>
                  </div>
                </div>
              );
            }}
          />
          {!isFree ? (
            <div className="mt-3 text-xs text-gray-400">Locked lectures require purchase.</div>
          ) : null}
          {/* Timeline + Certificate */}
          <div className="mt-5">
            <h3 className="text-sm font-medium text-white mb-2">Progress</h3>
            {(() => {
              const totalLectures = lectures.length;
              const completedCount = lectures.filter((l) => completedSet.has(l.id)).length;
              const totalAssignments = derivedAssignments.length;
              const submittedCount = Object.values(assignmentSubmitted).filter(Boolean).length;
              const totalUnits = Math.max(1, totalLectures + totalAssignments);
              const completedUnits = completedCount + submittedCount;
              const combinedPct = Math.floor((completedUnits / totalUnits) * 100);
              // Keep certificate gating strict: all lectures 100% AND all assignments submitted
              const overallLecturesPct = Math.floor((completedCount / Math.max(1, totalLectures)) * 100);
              const allAssignmentsSubmitted = submittedCount >= totalAssignments;
              const certificateReady = overallLecturesPct === 100 && allAssignmentsSubmitted;
              return (
                <div>
                  <div className="w-full h-2 bg-gray-800 rounded">
                    <div className="h-2 bg-green-500 rounded" style={{ width: `${combinedPct}%` }} />
                  </div>
                  <div className="mt-2 text-xs text-gray-300">Overall: {combinedPct}% completed (Lectures {completedCount}/{totalLectures}, Assignments {submittedCount}/{totalAssignments})</div>
                  <div className="mt-3 flex gap-2 items-center">
                    <button
                      disabled={overallLecturesPct < 100 || !allAssignmentsSubmitted}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium ${overallLecturesPct < 100 || !allAssignmentsSubmitted ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-emerald-500 text-black hover:bg-emerald-400'}`}
                      onClick={() => setMessage('Certificate generated (demo).')}
                    >
                      {overallLecturesPct < 100 || !allAssignmentsSubmitted ? 'Certificate locked' : 'Get Certificate'}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
          {/* Assignments are rendered inline under each lecture above */}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-gray-900/40 backdrop-blur-md p-6">
        <h2 className="text-lg font-semibold text-white mb-2">About this course</h2>
        <p className="text-gray-300 whitespace-pre-wrap">{course.description}</p>
      </div>

      {/* Side-by-side layout already includes lectures; no duplicate section needed. */}

      {message ? (
        <div className="rounded-md border border-white/10 bg-gray-800/60 p-3 text-sm text-gray-100">
          {message}
        </div>
      ) : null}

      <BuyPrompt
        open={!isFree && !purchased && buyOpen}
        price={course.price}
        onClose={() => setBuyOpen(false)}
        onBuy={async () => {
          await handlePurchase();
          setPurchased(true);
          setBuyOpen(false);
          setMessage('Purchase successful. All lectures unlocked.');
        }}
      />

      <NotesPdfModal
        open={pdfOpen}
        pdfUrl={pdfLecture?.notesPdfUrl}
        title={pdfLecture ? `Notes: ${pdfLecture.title}` : 'Notes'}
        onClose={() => setPdfOpen(false)}
      />

      <AssignmentMcqModal
        open={mcqOpen}
        assignment={mcqAssignment}
        onClose={() => setMcqOpen(false)}
        onSubmit={({ score, total, correct }) => {
          // Mark this assignment as submitted and show marks
          if (mcqAssignment) {
            const next = { ...assignmentSubmitted, [mcqAssignment.id]: true };
            setAssignmentSubmitted(next);
            try { localStorage.setItem(`course_assignments_${id}`, JSON.stringify(next)); } catch {}
          }
          setMcqResult({ score, total, correct });
          setMcqOpen(false);
          setMessage(`Assignment submitted. Score: ${score}% (${correct}/${total}).`);
        }}
      />
    </div>
  );
}
