import { describe, expect, it } from "vitest";
import { shuffleChoices } from "../src/lib/shuffle";

describe("shuffleChoices", () => {
  it("シャッフル後も正解の選択肢テキストが一致する", () => {
    const choices = ["A", "B", "C", "D"];
    for (let i = 0; i < 50; i++) {
      const { choices: shuffled, correctIndex } = shuffleChoices(choices, 2);
      expect(shuffled[correctIndex]).toBe("C");
      expect([...shuffled].sort()).toEqual([...choices].sort());
    }
  });

  it("要素数が変わらない", () => {
    const { choices } = shuffleChoices(["A", "B", "C", "D"], 0);
    expect(choices).toHaveLength(4);
  });
});
