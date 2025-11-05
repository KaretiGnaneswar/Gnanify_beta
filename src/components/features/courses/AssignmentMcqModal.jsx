import React, { useMemo, useState } from 'react';

function makeFallbackQuestions(assignment) {
  const base = assignment?.title || 'This lecture';
  return [
    {
      id: 'q1',
      text: `${base}: Which option best describes the core idea?`,
      options: ['Concept A', 'Concept B', 'Concept C', 'Concept D'],
      correctIndex: 1,
    },
    {
      id: 'q2',
      text: `${base}: Pick the true statement.`,
      options: ['Always false', 'Sometimes true', 'Always true', 'Unknown'],
      correctIndex: 2,
    },
    {
      id: 'q3',
      text: `${base}: What should you do next?`,
      options: ['Ignore', 'Review', 'Practice', 'Give up'],
      correctIndex: 2,
    },
  ];
}

export default function AssignmentMcqModal({ open, onClose, assignment, onSubmit }) {
  const questions = useMemo(
    () => (assignment?.mcqs && assignment.mcqs.length ? assignment.mcqs : makeFallbackQuestions(assignment)),
    [assignment]
  );
  const [answers, setAnswers] = useState({}); // { [qIndex]: optionIndex }
  const [index, setIndex] = useState(0);
  const allAnswered = questions.every((_, idx) => typeof answers[idx] === 'number');
  const answeredCount = Object.values(answers).filter((v) => typeof v === 'number').length;
  const q = questions[index];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-auto rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{assignment?.title || 'Assignment'}</h3>
          <button onClick={onClose} className="px-3 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 text-sm">Close</button>
        </div>

        <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">Answered {answeredCount}/{questions.length}</div>

        <div className="mt-4 space-y-4">
          <div key={q.id || index} className="rounded border border-gray-200 dark:border-white/10 p-3 bg-gray-50 dark:bg-gray-800/40">
            <div className="text-sm text-gray-900 dark:text-white mb-2">{index + 1}. {q.text}</div>
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <label key={oi} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                  <input
                    type="radio"
                    name={`q_${index}`}
                    checked={answers[index] === oi}
                    onChange={() => setAnswers((prev) => ({ ...prev, [index]: oi }))}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
            <span>Question {index + 1} of {questions.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${index === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-300' : 'bg-gray-300 text-gray-900 hover:bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'}`}
            >
              ← Previous
            </button>
            <button
              onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
              disabled={index === questions.length - 1}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${index === questions.length - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-300' : 'bg-gray-300 text-gray-900 hover:bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'}`}
            >
              Next →
            </button>
            <button
              disabled={!allAnswered}
              onClick={() => {
                let correct = 0;
                questions.forEach((q, qi) => {
                  if (answers[qi] === q.correctIndex) correct += 1;
                });
                const score = Math.round((correct / questions.length) * 100);
                onSubmit?.({ score, total: questions.length, correct });
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium ${allAnswered ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-300'}`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
