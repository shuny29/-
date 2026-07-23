export type Category =
  | "電気理論"
  | "配線図記号"
  | "施工方法"
  | "法令"
  | "器具・材料";

export const CATEGORIES: Category[] = [
  "電気理論",
  "配線図記号",
  "施工方法",
  "法令",
  "器具・材料",
];

export interface Question {
  id: string;
  examPart: "written";
  category: Category;
  difficulty: 1 | 2 | 3;
  question: string;
  imageUrl?: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  tags?: string[];
}
