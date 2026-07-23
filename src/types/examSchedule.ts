export interface ExamTerm {
  id: string;
  fiscalYear: number;
  term: "上期" | "下期";
  applicationStart: string;
  applicationEnd: string;
  writtenCbtStart: string;
  writtenCbtEnd: string;
  writtenPaperDate: string;
  skillsDates: string[];
}
