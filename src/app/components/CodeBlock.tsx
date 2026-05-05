import { useState } from "react";
import { Check, Copy } from "lucide-react";

type Token = { text: string; color: string };

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let remaining = code;

  const patterns: { regex: RegExp; color: string }[] = [
    { regex: /^(\/\/[^\n]*)/, color: "#6A9955" },           // comments
    { regex: /^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/, color: "#CE9178" }, // strings
    { regex: /^(import|from|export|const|let|var|function|return|await|async|new|if|else|try|catch|type|interface)\b/, color: "#569CD6" }, // keywords
    { regex: /^(true|false|null|undefined|void)\b/, color: "#569CD6" }, // literals
    { regex: /^([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/, color: "#DCDCAA" }, // function calls
    { regex: /^([A-Z][a-zA-Z0-9_$]*)/, color: "#4EC9B0" }, // types/classes
    { regex: /^(\d+(\.\d+)?)/, color: "#B5CEA8" }, // numbers
    { regex: /^([{}()\[\];,.<>?:=+\-*\/!&|])/, color: "#D4D4D4" }, // punctuation
    { regex: /^([a-zA-Z_$][a-zA-Z0-9_$]*)/, color: "#9CDCFE" }, // identifiers
    { regex: /^(\s+)/, color: "transparent" }, // whitespace
    { regex: /^(.)/, color: "#D4D4D4" }, // fallback
  ];

  while (remaining.length > 0) {
    let matched = false;
    for (const { regex, color } of patterns) {
      const match = remaining.match(regex);
      if (match) {
        tokens.push({ text: match[0], color });
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ text: remaining[0], color: "#D4D4D4" });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const tokens = tokenize(code);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "#0D1117", border: "1px solid rgba(153,69,255,0.2)" }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: "#161B22", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
          </div>
          <span className="ml-2 text-xs" style={{ color: "#8B949E" }}>
            {language === "typescript" ? "integration.ts" : language === "bash" ? "terminal" : "code"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-xs"
          style={{
            background: copied ? "rgba(20,241,149,0.15)" : "rgba(255,255,255,0.05)",
            color: copied ? "#14F195" : "#8B949E",
            border: `1px solid ${copied ? "rgba(20,241,149,0.3)" : "rgba(255,255,255,0.08)"}`,
          }}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <tbody>
            {lines.map((line, i) => {
              const lineStart = lines.slice(0, i).join("\n").length + (i > 0 ? 1 : 0);
              const lineTokens = tokenize(line);
              return (
                <tr key={i} className="group">
                  <td
                    className="select-none text-right pr-4 pl-4 py-0.5 text-xs"
                    style={{ color: "#4A5568", minWidth: "3rem", userSelect: "none" }}
                  >
                    {i + 1}
                  </td>
                  <td className="py-0.5 pr-6">
                    <code className="text-sm font-mono">
                      {lineTokens.map((token, j) => (
                        <span
                          key={j}
                          style={{
                            color: token.color === "transparent" ? undefined : token.color,
                            whiteSpace: "pre",
                          }}
                        >
                          {token.text}
                        </span>
                      ))}
                    </code>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
