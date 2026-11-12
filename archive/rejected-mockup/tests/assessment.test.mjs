import test from "node:test";
import assert from "node:assert/strict";
import { EXAMPLE_ANSWERS, activeQuestions, assess } from "../assessment.mjs";

test("example includes complex operations and missed prior filings", () => {
  const result = assess(EXAMPLE_ANSWERS);
  assert.equal(result.scope.level, "standard");
  assert.equal(result.complexity.level, "high");
  assert.ok(result.findings.some(({ id }) => id === "history"));
  assert.ok(result.findings.some(({ id }) => id === "loss"));
  assert.ok(result.findings.some(({ id }) => id === "records"));
});

test("simple CEX activity is low complexity when all answers are available", () => {
  const result = assess({
    residency: ["yes"], activities: ["buy", "sell"], sources: ["cex"],
    special: ["none"], history: ["no"], records: ["complete"]
  });
  assert.equal(result.complexity.level, "low");
  assert.equal(result.skipped.length, 0);
});

test("no transactions in 2026 skip irrelevant follow-ups, not counted as missing", () => {
  const answers = { residency: ["yes"], activities: ["none"], history: ["no"], records: ["complete"] };
  assert.deepEqual(activeQuestions(answers).map(({ id }) => id), ["residency", "activities", "history", "records"]);
  assert.equal(assess(answers).skipped.length, 0);
});

test("unknown answers lower confidence, not inflate complexity", () => {
  const result = assess({ residency: ["yes"] });
  assert.equal(result.complexity.level, "unknown");
  assert.equal(result.confidence, "niska");
  assert.equal(result.score, 0);
});

test("residency and complexity are independent dimensions", () => {
  const answers = {
    residency: ["moved"], activities: ["buy", "sell"], sources: ["cex"], special: ["none"],
    history: ["no"], records: ["complete"]
  };
  const result = assess(answers);
  assert.equal(result.scope.level, "crossborder");
  assert.equal(result.complexity.level, "low");
});

test("prior purchases without PIT-38 plus partial data need review", () => {
  const answers = {
    residency: ["yes"], activities: ["buy"], sources: ["cex"], special: ["none"],
    history: ["unreported"], records: ["partial"]
  };
  const result = assess(answers);
  assert.equal(result.complexity.level, "high");
  assert.ok(result.priorities[0].includes("poprzednie lata"));
});
