export default function ProblemList({ problems, selectProblem }) {
  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col gap-2 overflow-y-auto">
      <h2 className="text-white text-lg font-semibold mb-2">Problems</h2>
      {problems.map((p) => (
        <div
          key={p.id}
          onClick={() => selectProblem(p)}
          className="p-2 rounded hover:bg-gray-700 cursor-pointer"
        >
          {p.title}
        </div>
      ))}
    </div>
  );
}
