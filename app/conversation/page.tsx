"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { conversations, type Conversation } from "@/data/conversations";
import { addXP, recordStudySession } from "@/lib/storage";
import { speakEnglish } from "@/lib/speech";

const XP_PER_CORRECT = 15;

type Phase = "select" | "lesson" | "step-feedback" | "complete";

export default function ConversationPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("select");
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [chosenOption, setChosenOption] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);

  const currentStep = selected?.steps[stepIndex];
  const isCorrect =
    chosenOption !== null && currentStep?.options[chosenOption]?.isCorrect;

  const speak = useCallback(() => {
    if (currentStep) speakEnglish(currentStep.teacherText);
  }, [currentStep]);

  useEffect(() => {
    if (phase === "lesson" && currentStep) {
      setTimeout(speak, 400);
    }
  }, [stepIndex, phase, speak, currentStep]);

  function startConversation(conv: Conversation) {
    setSelected(conv);
    setStepIndex(0);
    setChosenOption(null);
    setCorrectCount(0);
    setEarnedXP(0);
    setPhase("lesson");
  }

  function handleChoice(idx: number) {
    if (chosenOption !== null) return;
    setChosenOption(idx);
    const correct = currentStep?.options[idx]?.isCorrect ?? false;
    if (correct) {
      addXP(XP_PER_CORRECT);
      setEarnedXP((p) => p + XP_PER_CORRECT);
      setCorrectCount((p) => p + 1);
    }
    setPhase("step-feedback");
  }

  function handleNext() {
    if (!selected) return;
    const nextIndex = stepIndex + 1;
    if (nextIndex >= selected.steps.length) {
      recordStudySession("conversation");
      setPhase("complete");
    } else {
      setStepIndex(nextIndex);
      setChosenOption(null);
      setPhase("lesson");
    }
  }

  // ── Select screen ──────────────────────────────────────────
  if (phase === "select") {
    return (
      <div className="flex flex-col flex-1 px-4 py-6 gap-4">
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1 text-gray-400 font-bold px-2 py-1 active:opacity-60"
          >
            <span className="text-xl">←</span>
            <span className="text-sm">ホーム</span>
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-800">会話モード</h2>
            <p className="text-sm text-gray-400">シナリオを選んでね</p>
          </div>
        </div>

        {/* Teacher intro */}
        <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4">
          <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center text-4xl shrink-0">
            👩‍🏫
          </div>
          <div>
            <p className="font-bold text-gray-800">サクラ先生</p>
            <p className="text-sm text-gray-500 mt-0.5">
              一緒に英語を練習しましょう！どんな場面を練習したいですか？
            </p>
          </div>
        </div>

        {/* Scenario list */}
        <div className="flex flex-col gap-3">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => startConversation(conv)}
              className="bg-white rounded-2xl shadow-md p-4 text-left active:scale-95 transition-transform flex items-center gap-4"
            >
              <span className="text-3xl">{conv.emoji}</span>
              <div className="flex-1">
                <p className="font-bold text-gray-800">{conv.title}</p>
                <p className="text-sm text-gray-400 mt-0.5">{conv.scenario}</p>
              </div>
              <span className="text-gray-300 text-xl">›</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Complete screen ─────────────────────────────────────────
  if (phase === "complete") {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-6 gap-6 text-center animate-celebration">
        <div className="text-8xl">🌟</div>
        <h2 className="text-3xl font-bold text-gray-800">会話完了！</h2>
        <div className="bg-white rounded-2xl shadow-md p-6 w-full">
          <div className="flex justify-around">
            <div>
              <p className="text-4xl font-bold text-[#58CC02]">{correctCount}</p>
              <p className="text-sm text-gray-500">正解</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div>
              <p className="text-4xl font-bold text-amber-500">+{earnedXP}</p>
              <p className="text-sm text-gray-500">XP獲得</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setPhase("select")}
          className="w-full bg-[#CE82FF] text-white font-bold text-lg rounded-2xl py-4 active:scale-95 transition-transform"
        >
          別のシナリオへ
        </button>
        <button
          onClick={() => router.push("/")}
          className="w-full bg-white border-2 border-gray-200 text-gray-600 font-bold text-lg rounded-2xl py-4 active:scale-95 transition-transform"
        >
          ホームへ戻る
        </button>
      </div>
    );
  }

  // ── Lesson screen ───────────────────────────────────────────
  if (!selected || !currentStep) return null;

  const totalSteps = selected.steps.length;
  const progress = (stepIndex / totalSteps) * 100;

  return (
    <div className="flex flex-col flex-1">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={() => setPhase("select")}
          className="flex items-center gap-1 text-gray-400 font-bold px-2 py-1 active:opacity-60"
        >
          <span className="text-xl">←</span>
          <span className="text-sm">戻る</span>
        </button>
        <div className="flex-1 bg-gray-200 rounded-full h-4">
          <div
            className="bg-[#CE82FF] h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-gray-500 font-semibold">
          {stepIndex + 1}/{totalSteps}
        </span>
      </div>

      <div className="flex flex-col flex-1 px-4 pt-4 gap-4">
        {/* Scenario badge */}
        <p className="text-sm text-gray-400 text-center">
          {selected.emoji} {selected.title}
        </p>

        {/* Teacher bubble */}
        <div className="flex items-start gap-3 animate-bounce-in">
          <div className="bg-pink-100 rounded-full w-14 h-14 flex items-center justify-center text-3xl shrink-0">
            👩‍🏫
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 mb-1">サクラ先生</p>
            <div className="bg-white rounded-2xl rounded-tl-none shadow-md p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-base font-semibold text-gray-800 leading-relaxed flex-1">
                  {currentStep.teacherText}
                </p>
                <button
                  onClick={speak}
                  className="bg-[#CE82FF] text-white rounded-lg p-2 text-sm active:scale-95 transition-transform shrink-0"
                >
                  🔊
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {currentStep.teacherJapanese}
              </p>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 mt-2">
          <p className="text-sm font-semibold text-gray-500">あなたの返事は？</p>
          {currentStep.options.map((option, idx) => {
            let style = "bg-white border-2 border-gray-200 text-gray-700";
            if (chosenOption !== null) {
              if (option.isCorrect) {
                style = "bg-[#D7FFB8] border-2 border-[#58CC02] text-gray-800";
              } else if (idx === chosenOption && !option.isCorrect) {
                style = "bg-[#FFD5D5] border-2 border-[#FF4B4B] text-gray-800";
              } else {
                style = "bg-white border-2 border-gray-200 text-gray-400";
              }
            }
            return (
              <button
                key={idx}
                onClick={() => handleChoice(idx)}
                disabled={chosenOption !== null}
                className={`${style} rounded-2xl px-4 py-4 text-left transition-all active:scale-95 ${
                  chosenOption !== null && idx === chosenOption && !option.isCorrect
                    ? "animate-shake"
                    : ""
                }`}
              >
                <p className="font-medium text-base">{option.text}</p>
                <p className="text-sm text-gray-400 mt-0.5">{option.japanese}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback panel */}
      {phase === "step-feedback" && chosenOption !== null && (
        <div className="animate-slide-up fixed bottom-0 left-0 right-0 flex justify-center">
          <div
            className={`w-full max-w-md px-4 pb-8 pt-5 ${
              isCorrect ? "bg-[#D7FFB8]" : "bg-[#FFD5D5]"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{isCorrect ? "✅" : "❌"}</span>
              <p
                className={`text-xl font-bold ${
                  isCorrect ? "text-[#46a302]" : "text-[#FF4B4B]"
                }`}
              >
                {currentStep.options[chosenOption].feedback}
              </p>
            </div>
            {!isCorrect && (
              <p className="text-sm text-gray-700 mb-2">
                正解：
                <span className="font-bold">
                  {currentStep.options.find((o) => o.isCorrect)?.text}
                </span>
              </p>
            )}
            <button
              onClick={handleNext}
              className={`w-full font-bold text-lg rounded-2xl py-4 text-white active:scale-95 transition-transform ${
                isCorrect ? "bg-[#58CC02]" : "bg-[#FF4B4B]"
              }`}
            >
              つぎへ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
