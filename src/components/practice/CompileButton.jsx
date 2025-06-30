export default function CompileButton({
  code,
  language,
  publicTestCases,
  setOutput,
}) {
  const validateJavaScript = (code) => {
    try {
      // Basic syntax validation by creating a function
      new Function(code);
      return { valid: true, message: null };
    } catch (error) {
      return {
        valid: false,
        message: `Syntax Error: ${error.message}`,
      };
    }
  };

  const checkCodeStructure = (code) => {
    const trimmedCode = code.trim();

    if (!trimmedCode) {
      return { valid: false, message: "No code provided" };
    }

    // Check for common issues
    const issues = [];

    // Check for unmatched brackets
    const brackets = { "(": 0, "[": 0, "{": 0 };
    for (const char of trimmedCode) {
      if (char === "(") brackets["("]++;
      else if (char === ")") brackets["("]--;
      else if (char === "[") brackets["["]++;
      else if (char === "]") brackets["["]--;
      else if (char === "{") brackets["{"]++;
      else if (char === "}") brackets["{"]--;
    }

    if (brackets["("] !== 0) issues.push("Unmatched parentheses");
    if (brackets["["] !== 0) issues.push("Unmatched square brackets");
    if (brackets["{"] !== 0) issues.push("Unmatched curly braces");

    if (issues.length > 0) {
      return { valid: false, message: issues.join(", ") };
    }

    return { valid: true, message: null };
  };

  const executeCode = async (code, language, input) => {
    try {
      const createSafeFunction = (code, input) => {
        if (
          language.toLowerCase() === "javascript" ||
          language.toLowerCase() === "js"
        ) {
          try {
            let consoleOutput = "";
            const mockConsole = {
              log: (...args) => {
                consoleOutput += args.join(" ") + "\n";
              },
            };

            const wrappedCode = `
              const console = arguments[1];
              const input = arguments[0];
              ${code}
            `;

            const func = new Function(wrappedCode);
            const result = func(input, mockConsole);

            return (
              consoleOutput.trim() ||
              (result !== undefined ? String(result) : "")
            );
          } catch (error) {
            throw new Error(`Runtime Error: ${error.message}`);
          }
        }

        if (language.toLowerCase() === "python") {
          throw new Error(
            "Python execution not implemented in browser environment",
          );
        }

        throw new Error(`Language '${language}' not supported`);
      };

      return createSafeFunction(code, input);
    } catch (error) {
      throw error;
    }
  };

  const normalizeOutput = (output) => {
    return String(output).trim().replace(/\r\n/g, "\n");
  };

  const runPublicTests = async () => {
    if (!publicTestCases || publicTestCases.length === 0) {
      return {
        success: true,
        message: "No public test cases available. Code compiled successfully!",
      };
    }

    let passedTests = 0;
    let totalTests = publicTestCases.length;
    let resultLog = "Running public test cases...\n\n";

    for (let i = 0; i < publicTestCases.length; i++) {
      const testCase = publicTestCases[i];

      try {
        const actualOutput = await executeCode(code, language, testCase.input);
        const normalizedActual = normalizeOutput(actualOutput);
        const normalizedExpected = normalizeOutput(testCase.expectedOutput);

        if (normalizedActual === normalizedExpected) {
          passedTests++;
          resultLog += `✅ Test ${i + 1}: PASS\n`;
          resultLog += `  Input: ${testCase.input}\n`;
          resultLog += `  Output: ${normalizedActual}\n\n`;
        } else {
          resultLog += `❌ Test ${i + 1}: FAIL\n`;
          resultLog += `  Input: ${testCase.input}\n`;
          resultLog += `  Expected: ${normalizedExpected}\n`;
          resultLog += `  Got: ${normalizedActual}\n\n`;
        }
      } catch (error) {
        resultLog += `💥 Test ${i + 1}: ERROR\n`;
        resultLog += `  Input: ${testCase.input}\n`;
        resultLog += `  Error: ${error.message}\n\n`;
      }
    }

    resultLog += `Results: ${passedTests}/${totalTests} public tests passed\n`;

    if (passedTests === totalTests) {
      resultLog += "All public tests passed! Your solution looks good.";
      return { success: true, message: resultLog };
    } else {
      resultLog += "Some public tests failed. Please review your solution.";
      return { success: false, message: resultLog };
    }
  };

  const handleCompile = async () => {
    if (!code.trim()) {
      setOutput("Please enter some code to compile.");
      return;
    }

    setOutput("Compiling and validating code...");

    try {
      // Step 1: Check basic structure
      const structureCheck = checkCodeStructure(code);
      if (!structureCheck.valid) {
        setOutput(`❌ Compilation failed: ${structureCheck.message}`);
        return;
      }

      // Step 2: Validate JavaScript syntax
      const syntaxCheck = validateJavaScript(code);
      if (!syntaxCheck.valid) {
        setOutput(`❌ Compilation failed: ${syntaxCheck.message}`);
        return;
      }

      // Step 3: Run against public test cases
      setOutput(
        "✅ Code compiled successfully!\n\nRunning public test cases...",
      );

      const testResults = await runPublicTests();
      setOutput(testResults.message);
    } catch (error) {
      setOutput(`❌ Compilation error: ${error.message}`);
    }
  };

  return (
    <button
      onClick={handleCompile}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition-colors"
    >
      Compile & Test
    </button>
  );
}
