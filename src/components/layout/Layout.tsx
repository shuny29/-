import type { ReactNode } from "react";
import { Header } from "./Header";
import { NavBar } from "./NavBar";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <NavBar />
      <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>
    </div>
  );
}
