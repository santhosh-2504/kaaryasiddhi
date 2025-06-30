import { buildFullSourceCode } from "@/utils/buildFullSourceCode";
import {
  getActiveKey,
  getSelectedKeyIndex,
  incrementKeyUsage,
} from "@/lib/keys";
import { languageMap } from "@/utils/languageMap";

export default function SubmitButton({ userCode, problem, setOutput, language }) {
  const handleSubmit = async () => {
    if (!userCode.trim()) {
      setOutput("Please enter some code to submit.");
      return;
    }

    setOutput("Submitting code...");

    try {
      //console.log("Submitting code:", userCode); // Debug log
      //console.log("Language:", language); // Debug log
      //console.log("Problem test cases:", problem.testCases); // Debug log

      const allTests = problem.testCases;
      if (!allTests.length) {
        setOutput("No test cases available.");
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

      const fullCode = buildFullSourceCode(language, userCode, problem, allTests);
      ////console.log("Full code sent to Judge0:", fullCode); // Debug log

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
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`API Error: ${errText}`);
      }

      const data = await res.json();
      ////console.log("Judge0 response:", data); // Debug log
      incrementKeyUsage(keyIndex);

      // Check for compilation or runtime errors
      if (data.status?.id === 6 || data.compile_output) {
        // Compilation Error
        const errorMessage = data.compile_output?.trim() || data.stderr?.trim() || "Unknown compilation error";
        setOutput(`💥 Compilation Error: ${errorMessage}`);
        return;
      } else if (data.status?.id >= 7 && data.status?.id <= 12) {
        // Runtime Error
        const errorMessage = data.stderr?.trim() || "Unknown runtime error";
        setOutput(`💥 Runtime Error: ${errorMessage}`);
        return;
      }

      const actualOutputs = data.stdout?.trim().split("\n") || [];
      const expectedOutputs = allTests.map((t) => String(t.expectedOutput));

      let finalOutput = "";
      allTests.forEach((tc, i) => {
        const actual = actualOutputs[i]?.trim() || "";
        const expected = expectedOutputs[i]?.trim() || "";
        const pass = actual === expected;
        finalOutput += `${pass ? "✅" : "❌"} Test ${i + 1}${tc.isHidden ? " (Hidden)" : ""}\n`;
        finalOutput += `  Input: ${JSON.stringify(tc.input)}\n`;
        if (!tc.isHidden) {
          finalOutput += `  Expected: ${expected}\n`;
        }
        finalOutput += `  Got: ${actual || "No output"}\n\n`;
      });

      setOutput(finalOutput || "No output");
    } catch (err) {
      setOutput(`💥 Error: ${err.message}`);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded ml-4 transition-colors"
    >
      Submit
    </button>
  );
}