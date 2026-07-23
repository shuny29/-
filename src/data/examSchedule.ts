import type { ExamTerm } from "../types/examSchedule";

/**
 * 出典: 一般財団法人 電気技術者試験センター（https://www.shiken.or.jp/construction/second/）
 * 2026年7月時点の公開情報を基に作成。最新情報は必ず公式サイトでご確認ください。
 */
export const EXAM_SCHEDULE: ExamTerm[] = [
  {
    id: "r8-first",
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
    id: "r8-second",
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

export const EXAM_SCHEDULE_SOURCE_URL = "https://www.shiken.or.jp/construction/second/";
