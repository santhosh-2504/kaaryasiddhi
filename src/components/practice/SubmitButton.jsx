import { useState } from "react";
import StreakModal from "@/components/practice/StreakModal";

export default function SubmitButton({ code, language, hiddenTestCases, setOutput }) {
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [userStreak, setUserStreak] = useState(0);

  const executeCode = async (code, language, input) => {
    try {
      const createSafeFunction = (code, input) => {
        if (language.toLowerCase() === 'javascript' || language.toLowerCase() === 'js') {
          try {
            let consoleOutput = '';
            const mockConsole = {
              log: (...args) => {
                consoleOutput += args.join(' ') + '\n';
              }
            };

            const wrappedCode = `
              const console = arguments[1];
              const input = arguments[0];
              ${code}
            `;

            const func = new Function(wrappedCode);
            const result = func(input, mockConsole);

            return consoleOutput.trim() || (result !== undefined ? String(result) : '');
          } catch (error) {
            throw new Error(`Runtime Error: ${error.message}`);
          }
        }

        if (language.toLowerCase() === 'python') {
          throw new Error('Python execution not implemented in browser environment');
        }

        throw new Error(`Language '${language}' not supported`);
      };

      return createSafeFunction(code, input);
    } catch (error) {
      throw error;
    }
  };

  const normalizeOutput = (output) => {
    return String(output).trim().replace(/\r\n/g, '\n');
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      setOutput('Please enter some code before submitting.');
      return;
    }

    if (!hiddenTestCases || hiddenTestCases.length === 0) {
      setOutput('No test cases available.');
      return;
    }

    setOutput('Evaluating solution...');

    try {
      let passedTests = 0;
      let totalTests = hiddenTestCases.length;
      let resultLog = '';

      for (let i = 0; i < hiddenTestCases.length; i++) {
        const testCase = hiddenTestCases[i];

        try {
          const actualOutput = await executeCode(code, language, testCase.input);
          const normalizedActual = normalizeOutput(actualOutput);
          const normalizedExpected = normalizeOutput(testCase.expectedOutput);

          if (normalizedActual === normalizedExpected) {
            passedTests++;
            resultLog += `Test ${i + 1}: PASS\n`;
          } else {
            resultLog += `Test ${i + 1}: FAIL\n`;
            resultLog += `  Input: ${testCase.input}\n`;
            resultLog += `  Expected: ${normalizedExpected}\n`;
            resultLog += `  Got: ${normalizedActual}\n\n`;
          }
        } catch (error) {
          resultLog += `Test ${i + 1}: ERROR\n`;
          resultLog += `  ${error.message}\n\n`;
        }
      }

      resultLog += `\nResults: ${passedTests}/${totalTests} tests passed\n`;

      if (passedTests === totalTests) {
        resultLog += 'Congratulations! All tests passed.';

        // ✅ Trigger streak API
        try {
          const res = await fetch("/api/auth/streak", { method: "POST" });
          const data = await res.json();
          if (data.success) {
            setUserStreak(data.streak);
            setShowStreakModal(true);
          }
        } catch (err) {
          console.error("Streak update failed", err);
        }
      } else {
        resultLog += 'Some tests failed. Please review your solution.';
      }

      setOutput(resultLog);
    } catch (error) {
      setOutput(`Evaluation failed: ${error.message}`);
    }
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded transition-colors"
      >
        Submit
      </button>

      {showStreakModal && (
        <StreakModal
          streak={userStreak}
          onClose={() => setShowStreakModal(false)}
        />
      )}
    </>
  );
}
