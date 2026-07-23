import { Link, useParams } from "react-router-dom";
import { getWiringDiagramById } from "../data";
import { useProgress } from "../context/ProgressContext";
import { DiagramViewer } from "../components/wiring/DiagramViewer";
import { ChecklistPanel } from "../components/wiring/ChecklistPanel";
import { WiringQuizCard } from "../components/wiring/WiringQuizCard";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";

export function WiringDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { toggleChecklistItem, isChecklistItemChecked } = useProgress();
  const item = id ? getWiringDiagramById(id) : undefined;

  if (!item) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
        <p className="mb-4 text-slate-600">練習問題が見つかりませんでした。</p>
        <Link to="/wiring">
          <Button variant="outline">一覧に戻る</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-2 flex gap-2">
          <Badge tone="info">技能試験</Badge>
          <Badge>{"★".repeat(item.difficulty)}</Badge>
        </div>
        <h1 className="mb-2 text-xl font-bold text-slate-900">{item.title}</h1>
        <p className="text-sm text-slate-600">{item.description}</p>
      </div>

      <DiagramViewer src={item.singleLineImage} title={item.title} />

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-700">複線図作成チェックリスト</h2>
        <ChecklistPanel
          items={item.checklist}
          isChecked={(itemId) => isChecklistItemChecked(item.id, itemId)}
          onToggle={(itemId) => toggleChecklistItem(item.id, itemId)}
        />
      </div>

      {item.quiz.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-slate-700">確認クイズ</h2>
          {item.quiz.map((quiz) => (
            <WiringQuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm text-slate-700">{item.explanation}</p>
      </div>

      <Link to="/wiring" className="self-start">
        <Button variant="outline">一覧に戻る</Button>
      </Link>
    </div>
  );
}
