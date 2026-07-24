import { useMemo, useState } from "react";
import type { WiringDiagramQuizItem } from "../../types/wiringDiagram";
import { shuffleChoices } from "../../lib/shuffle";
import { ChoiceButton } from "../quiz/ChoiceButton";
import { ExplanationPanel } from "../quiz/ExplanationPanel";

export function WiringQuizCard({ quiz }: { quiz: WiringDiagramQuizItem }) {
  const [selected, setSelected] = useState<number | null>(null);

  const shuffled = useMemo(() => shuffleChoices(quiz.choices, quiz.correctIndex), [quiz]);

  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="mb-3 text-sm font-medium text-slate-900">{quiz.prompt}</p>
      <div className="flex flex-col gap-2">
        {shuffled.choices.map((choice, index) => {
          let status: "idle" | "correct" | "incorrect" = "idle";
          if (selected !== null) {
            if (index === shuffled.correctIndex) status = "correct";
            else if (index === selected) status = "incorrect";
          }
          return (
            <ChoiceButton
              key={index}
              index={index}
              text={choice}
              status={status}
              disabled={selected !== null}
              onClick={() => setSelected(index)}
            />
          );
        })}
      </div>
      {selected !== null && (
        <ExplanationPanel correct={selected === shuffled.correctIndex} explanation={quiz.explanation} />
      )}
    </div>
  );
}
