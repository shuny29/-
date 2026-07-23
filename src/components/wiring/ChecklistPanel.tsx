import type { ChecklistItem } from "../../types/wiringDiagram";

export function ChecklistPanel({
  items,
  isChecked,
  onToggle,
}: {
  items: ChecklistItem[];
  isChecked: (itemId: string) => boolean;
  onToggle: (itemId: string) => void;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.id}>
          <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-slate-200 p-3 hover:bg-slate-50">
            <input
              type="checkbox"
              checked={isChecked(item.id)}
              onChange={() => onToggle(item.id)}
              className="mt-1"
            />
            <span className="text-sm text-slate-700">{item.text}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
