const LABELS = ["イ", "ロ", "ハ", "ニ"];

type Status = "idle" | "correct" | "incorrect" | "reveal";

export function ChoiceButton({
  index,
  text,
  status,
  disabled,
  onClick,
}: {
  index: number;
  text: string;
  status: Status;
  disabled: boolean;
  onClick: () => void;
}) {
  const statusClasses: Record<Status, string> = {
    idle: "border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50",
    correct: "border-emerald-500 bg-emerald-50 text-emerald-800",
    incorrect: "border-rose-500 bg-rose-50 text-rose-800",
    reveal: "border-emerald-400 bg-emerald-50/50 text-emerald-700",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-lg border-2 px-4 py-3 text-left transition-colors disabled:cursor-not-allowed ${statusClasses[status]}`}
    >
      <span className="font-bold text-slate-500">{LABELS[index]}</span>
      <span>{text}</span>
    </button>
  );
}
