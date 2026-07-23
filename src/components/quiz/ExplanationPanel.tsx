export function ExplanationPanel({ correct, explanation }: { correct: boolean; explanation: string }) {
  return (
    <div
      className={`mt-4 rounded-lg border-2 p-4 ${
        correct ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50"
      }`}
    >
      <p className={`mb-1 font-bold ${correct ? "text-emerald-700" : "text-rose-700"}`}>
        {correct ? "正解！" : "不正解"}
      </p>
      <p className="text-sm text-slate-700">{explanation}</p>
    </div>
  );
}
