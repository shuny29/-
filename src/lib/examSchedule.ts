import type { ExamTerm } from "../types/examSchedule";

export type ApplicationStatus = "before" | "open" | "closed";

export interface ExamMilestone {
  label: string;
  date: string;
  daysUntil: number;
}

export interface ExamInfo {
  term: ExamTerm;
  applicationStatus: ApplicationStatus;
  daysUntilApplicationStart: number;
  daysUntilApplicationEnd: number;
  nearestMilestone: ExamMilestone | null;
  skillsNearestDate: string;
  daysUntilSkills: number;
  daysUntilWrittenPaper: number;
}

export function todayDateString(now: Date = new Date()): string {
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function daysBetween(fromDate: string, toDate: string): number {
  const from = Date.parse(`${fromDate}T00:00:00Z`);
  const to = Date.parse(`${toDate}T00:00:00Z`);
  return Math.round((to - from) / 86_400_000);
}

function buildExamInfo(term: ExamTerm, todayStr: string): ExamInfo {
  const applicationStatus: ApplicationStatus =
    todayStr < term.applicationStart ? "before" : todayStr <= term.applicationEnd ? "open" : "closed";

  const sortedSkillsDates = [...term.skillsDates].sort();
  const skillsNearestDate =
    sortedSkillsDates.find((d) => d >= todayStr) ?? sortedSkillsDates[sortedSkillsDates.length - 1];

  const candidates: { label: string; date: string }[] = [
    { label: "申込受付開始", date: term.applicationStart },
    { label: "申込締切", date: term.applicationEnd },
    { label: "学科試験（筆記方式）", date: term.writtenPaperDate },
    { label: "技能試験", date: skillsNearestDate },
  ]
    .filter((m) => m.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date));

  const nearest = candidates[0];

  return {
    term,
    applicationStatus,
    daysUntilApplicationStart: daysBetween(todayStr, term.applicationStart),
    daysUntilApplicationEnd: daysBetween(todayStr, term.applicationEnd),
    nearestMilestone: nearest
      ? { label: nearest.label, date: nearest.date, daysUntil: daysBetween(todayStr, nearest.date) }
      : null,
    skillsNearestDate,
    daysUntilSkills: daysBetween(todayStr, skillsNearestDate),
    daysUntilWrittenPaper: daysBetween(todayStr, term.writtenPaperDate),
  };
}

export function getCurrentExamInfo(schedule: ExamTerm[], todayStr: string = todayDateString()): ExamInfo | null {
  const sorted = [...schedule].sort((a, b) => a.applicationStart.localeCompare(b.applicationStart));

  for (const term of sorted) {
    const lastExamDate = [term.writtenPaperDate, ...term.skillsDates].sort().at(-1);
    if (lastExamDate && lastExamDate >= todayStr) {
      return buildExamInfo(term, todayStr);
    }
  }

  return null;
}
