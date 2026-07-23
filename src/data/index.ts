import type { Question } from "../types/question";
import type { WiringDiagramItem } from "../types/wiringDiagram";

import electricTheory from "./questions/electricTheory.json";
import wiringSymbols from "./questions/wiringSymbols.json";
import construction from "./questions/construction.json";
import lawsRegulations from "./questions/lawsRegulations.json";
import toolsMaterials from "./questions/toolsMaterials.json";
import diagrams from "./wiringDiagrams/diagrams.json";

export const ALL_QUESTIONS: Question[] = [
  ...(electricTheory as Question[]),
  ...(wiringSymbols as Question[]),
  ...(construction as Question[]),
  ...(lawsRegulations as Question[]),
  ...(toolsMaterials as Question[]),
];

export const ALL_WIRING_DIAGRAMS: WiringDiagramItem[] = diagrams as WiringDiagramItem[];

export function getQuestionsByCategory(category: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.category === category);
}

export function getQuestionById(id: string): Question | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id);
}

export function getWiringDiagramById(id: string): WiringDiagramItem | undefined {
  return ALL_WIRING_DIAGRAMS.find((d) => d.id === id);
}
