import type { Question } from "../../types/question";
import { Badge } from "../common/Badge";
import { ChoiceButton } from "./ChoiceButton";
import { ExplanationPanel } from "./ExplanationPanel";

export function QuestionCard({
  question,
  selectedIndex,
  answered,
  onSelect,
}: {
  question: Question;
  selectedIndex: number | null;
  answered: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-3 flex gap-2">
        <Badge tone="info">{question.category}</Badge>
        <Badge>{"★".repeat(question.difficulty)}</Badge>
      </div>
      <p className="mb-5 text-lg font-medium text-slate-900">{question.question}</p>
      <div className="flex flex-col gap-3">
        {question.choices.map((choice, index) => {
          let status: "idle" | "correct" | "incorrect" | "reveal" = "idle";
          if (answered) {
            if (index === question.correctIndex) status = "correct";
            else if (index === selectedIndex) status = "incorrect";
          }
          return (
            <ChoiceButton
              key={index}
              index={index}
              text={choice}
              status={status}
              disabled={answered}
              onClick={() => onSelect(index)}
            />
          );
        })}
      </div>
      {answered && selectedIndex !== null && (
        <ExplanationPanel
          correct={selectedIndex === question.correctIndex}
          explanation={question.explanation}
        />
      )}
    </div>
  );
}
