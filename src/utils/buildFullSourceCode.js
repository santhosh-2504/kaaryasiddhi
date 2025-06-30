// // components/problem/buildFullSourceCode.js

// export function buildFullSourceCode(userCode, testCases, functionName) {
//   const testRunner = testCases
//     .map((tc) => {
//       const inputs = Array.isArray(tc.input) ? tc.input.join(", ") : tc.input;
//       return `print(${functionName}(${inputs}))`;
//     })
//     .join("\n");

//   return `${userCode.trim()}

// # Test Runner
// ${testRunner}`;
// }

// export function buildFullSourceCode(language, userCode, problem) {
//   const { functionName, testCases = [] } = problem;
//   const visibleTests = testCases.filter(tc => !tc.isHidden);

//   const inputArgs = (args) => args.join(", ");

//   const buildPython = () => {
//     const calls = visibleTests.map(tc => `print(${functionName}(${inputArgs(tc.input)}))`).join("\n");
//     return `${userCode}\n\n${calls}`;
//   };

//   const buildJava = () => {
//     const calls = visibleTests.map(tc => `    System.out.println(${functionName}(${inputArgs(tc.input)}));`).join("\n");
//     return `
// public class Main {
// ${userCode}

//   public static void main(String[] args) {
// ${calls}
//   }
// }
//     `.trim();
//   };

//   const buildCpp = () => {
//     const calls = visibleTests.map(tc => `  std::cout << ${functionName}(${inputArgs(tc.input)}) << std::endl;`).join("\n");
//     return `
// #include <iostream>
// using namespace std;

// ${userCode}

// int main() {
// ${calls}
//   return 0;
// }
//     `.trim();
//   };

//   const buildJs = () => {
//     const calls = visibleTests.map(tc => `console.log(${functionName}(${inputArgs(tc.input)}));`).join("\n");
//     return `${userCode}\n\n${calls}`;
//   };

//   switch (language) {
//     case "python": return buildPython();
//     case "java": return buildJava();
//     case "cpp": return buildCpp();
//     case "javascript": return buildJs();
//     default: throw new Error(`Unsupported language: ${language}`);
//   }
// }

export function buildFullSourceCode(language, userCode, problem, tests) {
  const { functionName } = problem;
  const inputArgs = (args) => args.join(", ");

  const buildPython = () => {
    const calls = tests
      .map((tc) => `print(${functionName}(${inputArgs(tc.input)}))`)
      .join("\n");
    return `${userCode}\n\n${calls}`;
  };

  const buildJava = () => {
    const calls = tests
      .map(
        (tc) =>
          `    System.out.println(${functionName}(${inputArgs(tc.input)}));`,
      )
      .join("\n");
    return `
public class Main {
${userCode}

  public static void main(String[] args) {
${calls}
  }
}
    `.trim();
  };

  const buildCpp = () => {
    const calls = tests
      .map(
        (tc) =>
          `  std::cout << ${functionName}(${inputArgs(tc.input)}) << std::endl;`,
      )
      .join("\n");
    return `
#include <iostream>
using namespace std;

${userCode}

int main() {
${calls}
  return 0;
}
    `.trim();
  };

  const buildJs = () => {
    const calls = tests
      .map((tc) => `console.log(${functionName}(${inputArgs(tc.input)}));`)
      .join("\n");
    return `${userCode}\n\n${calls}`;
  };

  switch (language) {
    case "python":
      return buildPython();
    case "java":
      return buildJava();
    case "cpp":
      return buildCpp();
    case "javascript":
      return buildJs();
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}
