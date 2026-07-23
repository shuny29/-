import { EXAM_SCHEDULE, EXAM_SCHEDULE_SOURCE_URL } from "../../data/examSchedule";
import { getCurrentExamInfo } from "../../lib/examSchedule";
import { Badge } from "../common/Badge";

function formatDate(dateStr: string): string {
  return dateStr.replaceAll("-", "/");
}

export function ExamCountdownCard() {
  const info = getCurrentExamInfo(EXAM_SCHEDULE);

  if (!info) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-600">
          掲載中の試験日程はすべて終了しました。最新の試験日程は公式サイトをご確認ください。
        </p>
        <a
          href={EXAM_SCHEDULE_SOURCE_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-block text-sm text-blue-600 underline"
        >
          電気技術者試験センターで確認する
        </a>
      </div>
    );
  }

  const { term, applicationStatus, nearestMilestone } = info;

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-blue-900">
          令和{term.fiscalYear}年度 {term.term}試験
        </h2>
        <a
          href={EXAM_SCHEDULE_SOURCE_URL}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-blue-700 underline"
        >
          公式サイトで確認
        </a>
      </div>

      {nearestMilestone && (
        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-blue-700">あと{nearestMilestone.daysUntil}日</span>
          <span className="text-sm text-blue-800">
            {nearestMilestone.label}（{formatDate(nearestMilestone.date)}）
          </span>
        </div>
      )}

      <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="mb-0.5 text-blue-700">申込期間</dt>
          <dd className="flex items-center gap-2 text-blue-900">
            {formatDate(term.applicationStart)}〜{formatDate(term.applicationEnd)}
            {applicationStatus === "open" && <Badge tone="success">受付中</Badge>}
            {applicationStatus === "before" && <Badge tone="info">受付前</Badge>}
            {applicationStatus === "closed" && <Badge>受付終了</Badge>}
          </dd>
        </div>
        <div>
          <dt className="mb-0.5 text-blue-700">学科試験（筆記方式）</dt>
          <dd className="text-blue-900">{formatDate(term.writtenPaperDate)}</dd>
        </div>
        <div>
          <dt className="mb-0.5 text-blue-700">学科試験（CBT方式）</dt>
          <dd className="text-blue-900">
            {formatDate(term.writtenCbtStart)}〜{formatDate(term.writtenCbtEnd)}
          </dd>
        </div>
        <div>
          <dt className="mb-0.5 text-blue-700">技能試験</dt>
          <dd className="text-blue-900">{term.skillsDates.map(formatDate).join("・")}</dd>
        </div>
      </dl>
    </div>
  );
}
