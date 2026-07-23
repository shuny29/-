import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuestionById } from "../data";
import { useProgress } from "../context/ProgressContext";
import { QuestionCard } from "../components/quiz/QuestionCard";
import { QuizProgressBar } from "../components/quiz/QuizProgressBar";
import { Button } from "../components/common/Button";

interface QuizLocationState {
  questionIds: string[];
  label: string;
}

export function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recordAnswer, recordSession } = useProgress();

  const state = location.state as QuizLocationState | null;

  const questions = useMemo(() => {
    if (!state?.questionIds) return [];
    return state.questionIds
      .map((id) => getQuestionById(id))
      .filter((q): q is NonNullable<typeof q> => q !== undefined);
  }, [state]);

  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [missedIds, setMissedIds] = useState<string[]>([]);

  if (!state || questions.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
        <p className="mb-4 text-slate-600">出題する問題が選択されていません。</p>
        <Button onClick={() => navigate("/quiz")}>分野選択に戻る</Button>
      </div>
    );
  }

  const currentQuestion = questions[index];
  const isLast = index === questions.length - 1;

  const handleSelect = (choiceIndex: number) => {
    if (answered) return;
    setSelectedIndex(choiceIndex);
    setAnswered(true);
    const correct = choiceIndex === currentQuestion.correctIndex;
    recordAnswer(currentQuestion.id, correct);
    if (correct) {
      setCorrectCount((c) => c + 1);
    } else {
      setMissedIds((ids) => [...ids, currentQuestion.id]);
    }
  };

  const handleNext = () => {
    if (isLast) {
      recordSession({
        category: state.label,
        total: questions.length,
        correct: correctCount,
      });
      navigate("/quiz/result", {
        state: {
          total: questions.length,
          correct: correctCount,
          missedIds,
          label: state.label,
        },
      });
      return;
    }
    setIndex((i) => i + 1);
    setSelectedIndex(null);
    setAnswered(false);
  };

  return (
    <div>
      <QuizProgressBar current={index + 1} total={questions.length} />
      <QuestionCard
        question={currentQuestion}
        selectedIndex={selectedIndex}
        answered={answered}
        onSelect={handleSelect}
      />
      {answered && (
        <div className="mt-4 flex justify-end">
          <Button onClick={handleNext}>{isLast ? "結果を見る" : "次の問題へ"}</Button>
        </div>
      )}
    </div>
  );
}
