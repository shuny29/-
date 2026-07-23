import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-bold text-slate-900">
          第二種電気工事士 学習アプリ
        </Link>
      </div>
    </header>
  );
}
