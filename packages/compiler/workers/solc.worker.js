importScripts("https://binaries.soliditylang.org/bin/soljson-v0.8.20+commit.a1b79de6.js");

self.onmessage = function (e) {
  const { sources } = e.data;

  // Input with full sources map
  const input = {
    language: "Solidity",
    sources: sources, // Already formatted as { "filename": { "content": "..." } }
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"]
        }
      }
    }
  };

  try {
    // @ts-ignore
    const compile = Module.cwrap("solidity_compile", "string", ["string", "number"]);
    const output = JSON.parse(compile(JSON.stringify(input)));
    self.postMessage({ type: "success", output });
  } catch (err) {
    self.postMessage({ type: "error", error: err.toString() });
  }
};
