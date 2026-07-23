import type { Question } from "../../types/question";
import { Badge } from "../common/Badge";

export function ReviewQueueList({ questions }: { questions: Question[] }) {
  if (questions.length === 0) {
    return <p className="text-sm text-slate-500">現在、復習が必要な問題はありません。</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {questions.map((q) => (
        <li key={q.id} className="rounded-lg border border-amber-200 bg-amber-50 p-3">
          <div className="mb-1">
            <Badge tone="danger">{q.category}</Badge>
          </div>
          <p className="text-sm text-slate-800">{q.question}</p>
        </li>
      ))}
    </ul>
  );
}
