import type { ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { CategorySelectPage } from "./pages/CategorySelectPage";
import { QuizPage } from "./pages/QuizPage";
import { ResultPage } from "./pages/ResultPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { ReviewNotebookPage } from "./pages/ReviewNotebookPage";
import { WiringListPage } from "./pages/WiringListPage";
import { WiringDetailPage } from "./pages/WiringDetailPage";

function withLayout(element: ReactNode) {
  return <Layout>{element}</Layout>;
}

export const router = createBrowserRouter([
  { path: "/", element: withLayout(<HomePage />) },
  { path: "/quiz", element: withLayout(<CategorySelectPage />) },
  { path: "/quiz/play", element: withLayout(<QuizPage />) },
  { path: "/quiz/result", element: withLayout(<ResultPage />) },
  { path: "/analytics", element: withLayout(<AnalyticsPage />) },
  { path: "/review", element: withLayout(<ReviewNotebookPage />) },
  { path: "/wiring", element: withLayout(<WiringListPage />) },
  { path: "/wiring/:id", element: withLayout(<WiringDetailPage />) },
], { basename: import.meta.env.BASE_URL });
