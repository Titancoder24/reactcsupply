import React from "react";
import { Text, View } from "react-native";
import { tokens } from "@/theme/tokens";

interface MarkdownProps {
  text: string;
}

/**
 * Lightweight Markdown renderer covering what our legal docs use:
 * # H1, ## H2, ### H3, **bold**, paragraphs, bullet lists, simple tables.
 * Intentionally simple — we author docs with this in mind.
 */
export const Markdown: React.FC<MarkdownProps> = ({ text }) => {
  const blocks = parseBlocks(text);
  return (
    <View style={{ gap: 14 }}>
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </View>
  );
};

type Block =
  | { kind: "h1"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "table"; rows: string[][] }
  | { kind: "hr" };

const parseBlocks = (raw: string): Block[] => {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let buffer: string[] = [];
  let mode: "p" | "ul" | "table" | null = null;

  const flush = () => {
    if (mode === "p" && buffer.length) {
      blocks.push({ kind: "p", text: buffer.join(" ").trim() });
    } else if (mode === "ul" && buffer.length) {
      blocks.push({ kind: "ul", items: [...buffer] });
    } else if (mode === "table" && buffer.length) {
      const rows = buffer
        .filter((r) => !/^\s*\|?\s*[-:|\s]+\|?\s*$/.test(r))
        .map((r) => r.split("|").map((c) => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1));
      if (rows.length) blocks.push({ kind: "table", rows });
    }
    buffer = [];
    mode = null;
  };

  for (const line of lines) {
    if (!line.trim()) {
      flush();
      continue;
    }
    if (line.startsWith("# ")) {
      flush();
      blocks.push({ kind: "h1", text: line.slice(2).trim() });
    } else if (line.startsWith("## ")) {
      flush();
      blocks.push({ kind: "h2", text: line.slice(3).trim() });
    } else if (line.startsWith("### ")) {
      flush();
      blocks.push({ kind: "h3", text: line.slice(4).trim() });
    } else if (line.startsWith("---")) {
      flush();
      blocks.push({ kind: "hr" });
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      if (mode !== "ul") flush();
      mode = "ul";
      buffer.push(line.slice(2).trim());
    } else if (line.includes("|") && line.trim().startsWith("|")) {
      if (mode !== "table") flush();
      mode = "table";
      buffer.push(line);
    } else {
      if (mode !== "p") flush();
      mode = "p";
      buffer.push(line);
    }
  }
  flush();
  return blocks;
};

const InlineText: React.FC<{ text: string; baseStyle: any }> = ({ text, baseStyle }) => {
  // Split by **bold** segments
  const segs = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <Text style={baseStyle}>
      {segs.map((seg, i) => {
        if (seg.startsWith("**") && seg.endsWith("**")) {
          return (
            <Text key={i} style={{ fontWeight: "700", color: tokens.color.ink[900] }}>
              {seg.slice(2, -2)}
            </Text>
          );
        }
        return <Text key={i}>{seg}</Text>;
      })}
    </Text>
  );
};

const Block: React.FC<{ block: Block }> = ({ block }) => {
  switch (block.kind) {
    case "h1":
      return (
        <Text
          style={{
            fontFamily: tokens.font.family.display,
            fontWeight: "700",
            fontSize: 24,
            color: tokens.color.ink[900],
            letterSpacing: -0.6,
            marginTop: 4,
          }}
        >
          {block.text}
        </Text>
      );
    case "h2":
      return (
        <Text
          style={{
            fontFamily: tokens.font.family.display,
            fontWeight: "700",
            fontSize: 17,
            color: tokens.color.ink[900],
            letterSpacing: -0.3,
            marginTop: 10,
          }}
        >
          {block.text}
        </Text>
      );
    case "h3":
      return (
        <Text
          style={{
            fontFamily: tokens.font.family.display,
            fontWeight: "600",
            fontSize: 15,
            color: tokens.color.ink[800],
            letterSpacing: -0.2,
            marginTop: 6,
          }}
        >
          {block.text}
        </Text>
      );
    case "p":
      return (
        <InlineText
          text={block.text}
          baseStyle={{
            fontFamily: tokens.font.family.body,
            fontSize: 14,
            color: tokens.color.ink[700],
            lineHeight: 22,
          }}
        />
      );
    case "ul":
      return (
        <View style={{ gap: 6 }}>
          {block.items.map((item, i) => (
            <View key={i} style={{ flexDirection: "row", gap: 8, alignItems: "flex-start" }}>
              <Text
                style={{
                  fontSize: 14,
                  color: tokens.color.ink[400],
                  marginTop: 1,
                }}
              >
                ·
              </Text>
              <InlineText
                text={item}
                baseStyle={{
                  flex: 1,
                  fontFamily: tokens.font.family.body,
                  fontSize: 14,
                  color: tokens.color.ink[700],
                  lineHeight: 22,
                }}
              />
            </View>
          ))}
        </View>
      );
    case "table":
      return (
        <View
          style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: tokens.color.border.hairline,
            overflow: "hidden",
          }}
        >
          {block.rows.map((row, rIdx) => (
            <View
              key={rIdx}
              style={{
                flexDirection: "row",
                backgroundColor: rIdx === 0 ? tokens.color.ink[50] : "transparent",
                borderTopWidth: rIdx > 0 ? 1 : 0,
                borderTopColor: tokens.color.border.hairline,
              }}
            >
              {row.map((cell, cIdx) => (
                <View
                  key={cIdx}
                  style={{
                    flex: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                  }}
                >
                  <InlineText
                    text={cell}
                    baseStyle={{
                      fontFamily: rIdx === 0 ? tokens.font.family.body : tokens.font.family.body,
                      fontSize: 12,
                      fontWeight: rIdx === 0 ? "600" : "400",
                      color: rIdx === 0 ? tokens.color.ink[700] : tokens.color.ink[700],
                    }}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      );
    case "hr":
      return (
        <View
          style={{
            height: 1,
            backgroundColor: tokens.color.border.hairline,
            marginVertical: 8,
          }}
        />
      );
  }
};
