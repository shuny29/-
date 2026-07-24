import { useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import { ALL_QUESTIONS } from "../data";
import { getMissedQuestions } from "../lib/stats";
import { Badge } from "../components/common/Badge";
import { ChoiceButton } from "../components/quiz/ChoiceButton";
import { Button } from "../components/common/Button";

export function ReviewNotebookPage() {
  const { progress } = useProgress();
  const navigate = useNavigate();
  const missedQuestions = getMissedQuestions(progress, ALL_QUESTIONS);

  const startReview = () => {
    navigate("/quiz/play", {
      state: { questionIds: missedQuestions.map((q) => q.id), label: "復習ノート" },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="mb-1 text-xl font-bold text-slate-900">復習ノート</h1>
        <p className="text-sm text-slate-600">
          直近の解答が不正解だった問題を、正解・解説つきでいつでも見返せます。演習で正解すればこのリストから自動的に外れます。
        </p>
      </div>

      {missedQuestions.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-sm text-slate-600">現在、復習が必要な問題はありません。</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">復習が必要な問題が {missedQuestions.length} 問あります。</p>
            <Button onClick={startReview}>この問題だけ復習する</Button>
          </div>

          <ul className="flex flex-col gap-4">
            {missedQuestions.map((q) => {
              const attempt = progress.attempts[q.id];
              return (
                <li key={q.id} className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge tone="info">{q.category}</Badge>
                    <Badge>{"★".repeat(q.difficulty)}</Badge>
                    {attempt && (
                      <span className="text-xs text-slate-500">
                        正答率 {Math.round((attempt.timesCorrect / attempt.timesAnswered) * 100)}%（
                        {attempt.timesCorrect}/{attempt.timesAnswered}回）
                      </span>
                    )}
                  </div>
                  <p className="mb-3 font-medium text-slate-900">{q.question}</p>
                  <div className="flex flex-col gap-2">
                    {q.choices.map((choice, index) => (
                      <ChoiceButton
                        key={index}
                        index={index}
                        text={choice}
                        status={index === q.correctIndex ? "correct" : "idle"}
                        disabled
                        onClick={() => {}}
                      />
                    ))}
                  </div>
                  <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{q.explanation}</div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
