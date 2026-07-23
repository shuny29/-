import { describe, expect, it } from "vitest";
import { daysBetween, getCurrentExamInfo } from "../src/lib/examSchedule";
import type { ExamTerm } from "../src/types/examSchedule";

const schedule: ExamTerm[] = [
  {
    id: "term-1",
    fiscalYear: 8,
    term: "上期",
    applicationStart: "2026-03-16",
    applicationEnd: "2026-04-06",
    writtenCbtStart: "2026-04-23",
    writtenCbtEnd: "2026-06-07",
    writtenPaperDate: "2026-05-24",
    skillsDates: ["2026-07-18", "2026-07-19"],
  },
  {
    id: "term-2",
    fiscalYear: 8,
    term: "下期",
    applicationStart: "2026-08-17",
    applicationEnd: "2026-09-03",
    writtenCbtStart: "2026-09-24",
    writtenCbtEnd: "2026-11-08",
    writtenPaperDate: "2026-10-25",
    skillsDates: ["2026-12-12", "2026-12-13"],
  },
];

describe("daysBetween", () => {
  it("同じ日付なら0を返す", () => {
    expect(daysBetween("2026-07-23", "2026-07-23")).toBe(0);
  });

  it("未来の日付までの日数を正しく返す", () => {
    expect(daysBetween("2026-07-23", "2026-08-17")).toBe(25);
  });

  it("過去の日付は負の値を返す", () => {
    expect(daysBetween("2026-07-23", "2026-07-18")).toBe(-5);
  });
});

describe("getCurrentExamInfo", () => {
  it("両方の試験前であれば上期を返す", () => {
    const info = getCurrentExamInfo(schedule, "2026-01-01");
    expect(info?.term.term).toBe("上期");
    expect(info?.applicationStatus).toBe("before");
    expect(info?.nearestMilestone?.label).toBe("申込受付開始");
    expect(info?.nearestMilestone?.date).toBe("2026-03-16");
  });

  it("上期の技能試験終了後は下期を返す", () => {
    const info = getCurrentExamInfo(schedule, "2026-07-23");
    expect(info?.term.term).toBe("下期");
    expect(info?.applicationStatus).toBe("before");
    expect(info?.nearestMilestone?.date).toBe("2026-08-17");
    expect(info?.nearestMilestone?.daysUntil).toBe(25);
  });

  it("申込期間中はステータスがopenになる", () => {
    const info = getCurrentExamInfo(schedule, "2026-08-20");
    expect(info?.term.term).toBe("下期");
    expect(info?.applicationStatus).toBe("open");
  });

  it("申込締切後はステータスがclosedになる", () => {
    const info = getCurrentExamInfo(schedule, "2026-09-10");
    expect(info?.applicationStatus).toBe("closed");
    expect(info?.nearestMilestone?.label).toBe("学科試験（筆記方式）");
  });

  it("全ての試験が終了していればnullを返す", () => {
    const info = getCurrentExamInfo(schedule, "2026-12-20");
    expect(info).toBeNull();
  });
});
