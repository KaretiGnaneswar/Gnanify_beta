import { useState } from "react";
import ProblemList from "@/components/features/compiler/ProblemList";
import ProblemTabs from "@/components/features/compiler/ProblemTab";
import CodeEditor from "@/components/features/compiler/CodeEditor";

const dummyProblems = [
  { id: 1, title: "Two Sum", description: "Find indices that sum to target" },
  { id: 2, title: "Reverse String", description: "Reverse a given string" },
];

export default function CompilerPage() {
  const [problems] = useState(dummyProblems);
  const [selectedProblem, setSelectedProblem] = useState(dummyProblems[0]);
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    setOutput("Running code...");
    // Call backend API here
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <ProblemList problems={problems} selectProblem={setSelectedProblem} />

      {/* Main Panel */}
      <div className="flex-1 flex flex-col p-4 gap-4">
        {/* Problem Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold">{selectedProblem.title}</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 text-white px-3 py-1 rounded"
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>

        {/* Tabs */}
        <ProblemTabs description={selectedProblem.description} />

        {/* Editor */}
        <CodeEditor code={code} setCode={setCode} language={language} />

        {/* Run/Submit */}
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={runCode}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
          >
            Run
          </button>
          <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 transition">
            Submit
          </button>
        </div>

        {/* Output */}
        <div className="bg-gray-800 p-4 rounded-md h-32 overflow-y-auto mt-2">
          <h3 className="font-semibold text-gray-200 mb-2">Output:</h3>
          <pre className="text-green-400">{output}</pre>
        </div>
      </div>
    </div>
  );
}
