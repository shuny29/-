export interface WiringDiagramQuizItem {
  id: string;
  prompt: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
}

export interface WiringDiagramItem {
  id: string;
  examPart: "skills";
  title: string;
  difficulty: 1 | 2 | 3;
  singleLineImage: string;
  description: string;
  checklist: ChecklistItem[];
  quiz: WiringDiagramQuizItem[];
  explanation: string;
}
