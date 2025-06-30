import { buildFullSourceCode } from "@/utils/buildFullSourceCode";
import {
  getActiveKey,
  getSelectedKeyIndex,
  incrementKeyUsage,
} from "@/lib/keys";
import { languageMap } from "@/utils/languageMap";

export default function RunButton({ userCode, problem, setOutput, language }) {
  const handleRun = async () => {
    if (!userCode.trim()) {
      setOutput("Please enter some code to run.");
      return;
    }

    setOutput("Running code...");

    try {
      //console.log("Running code:", userCode); // Debug log
      //console.log("Language:", language); // Debug log
      //console.log("Problem test cases:", problem.testCases); // Debug log

      const publicTests = problem.testCases.filter((t) => !t.isHidden);
      if (!publicTests.length) {
        setOutput("No public test cases available.");
        return;
      }

      const keyObj = getActiveKey();
      const keyIndex = getSelectedKeyIndex();
      if (!keyObj) {
        throw new Error("No active RapidAPI key found.");
      }

      const languageId = languageMap[language];
      if (!languageId) {
        throw new Error(`Unsupported language: ${language}`);
      }

      const fullCode = buildFullSourceCode(
        language,
        userCode,
        problem,
        publicTests,
      );
      //console.log("Full code sent to Judge0:", fullCode); // Debug log

      const res = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": keyObj.key,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code: fullCode,
            language_id: languageId,
            stdin: "",
          }),
        },
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`API Error: ${errText}`);
      }

      const data = await res.json();
      //console.log("Judge0 response:", data); // Debug log
      incrementKeyUsage(keyIndex);

      // Check for compilation or runtime errors
      if (data.status?.id === 6 || data.compile_output) {
        // Compilation Error (status.id 6 typically indicates compilation failure)
        const errorMessage =
          data.compile_output?.trim() ||
          data.stderr?.trim() ||
          "Unknown compilation error";
        setOutput(`💥 Compilation Error: ${errorMessage}`);
        return;
      } else if (data.status?.id >= 7 && data.status?.id <= 12) {
        // Runtime Error (status.id 7-12 typically indicate runtime issues)
        const errorMessage = data.stderr?.trim() || "Unknown runtime error";
        setOutput(`💥 Runtime Error: ${errorMessage}`);
        return;
      }

      const actualOutputs = data.stdout?.trim().split("\n") || [];
      const expectedOutputs = publicTests.map((t) => String(t.expectedOutput));

      let finalOutput = "";
      publicTests.forEach((tc, i) => {
        const actual = actualOutputs[i]?.trim() || "";
        const expected = expectedOutputs[i]?.trim() || "";
        const pass = actual === expected;
        finalOutput += `${pass ? "✅" : "❌"} Test ${i + 1}\n`;
        finalOutput += `  Input: ${JSON.stringify(tc.input)}\n`;
        finalOutput += `  Expected: ${expected}\n`;
        finalOutput += `  Got: ${actual || "No output"}\n\n`;
      });

      setOutput(finalOutput || "No output");
    } catch (err) {
      setOutput(`💥 Error: ${err.message}`);
    }
  };

  return (
    <button
      onClick={handleRun}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition-colors"
    >
      Run
    </button>
  );
}
