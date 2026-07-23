import { Link } from "react-router-dom";
import { ALL_WIRING_DIAGRAMS } from "../data";
import { Badge } from "../components/common/Badge";

export function WiringListPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="mb-1 text-xl font-bold text-slate-900">配線図・複線図の練習</h1>
        <p className="text-sm text-slate-600">
          技能試験の候補問題を想定した単線図から、複線図への展開を練習します。フリーハンド作図の自動採点は行わず、要点チェックリストと一問一答で理解度を確認します。
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ALL_WIRING_DIAGRAMS.map((item) => (
          <li key={item.id}>
            <Link
              to={`/wiring/${item.id}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-400 hover:shadow-sm"
            >
              <div className="mb-2 flex gap-2">
                <Badge tone="info">技能試験</Badge>
                <Badge>{"★".repeat(item.difficulty)}</Badge>
              </div>
              <h2 className="mb-1 font-semibold text-slate-900">{item.title}</h2>
              <p className="line-clamp-2 text-sm text-slate-600">{item.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
