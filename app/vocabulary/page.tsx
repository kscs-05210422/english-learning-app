"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { vocabulary, type VocabWord } from "@/data/vocabulary";
import { addXP, recordAnswer, recordStudySession } from "@/lib/storage";
import { speakEnglish, startListening, isSpeechRecognitionSupported } from "@/lib/speech";

const QUESTIONS_PER_SESSION = 10;
const XP_CORRECT = 8;

type Phase = "question" | "feedback" | "complete";
type MicState = "idle" | "listening" | "error";

interface Question {
  word: VocabWord;
  options: string[];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuestions(): Question[] {
  const selected = shuffle(vocabulary).slice(0, QUESTIONS_PER_SESSION);
  return selected.map((word) => ({
    word,
    options: shuffle([word.japanese, ...word.wrongOptions]),
  }));
}

export default function VocabularyPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
  const [micState, setMicState] = useState<MicState>("idle");
  const [micError, setMicError] = useState("");
  const [stopListening, setStopListening] = useState<(() => void) | null>(null);
  const [canUseMic, setCanUseMic] = useState(false);

  useEffect(() => {
    setQuestions(buildQuestions());
    setCanUseMic(isSpeechRecognitionSupported());
  }, []);

  const current = questions[index];
  const isCorrect = selected === current?.word.japanese;
  const progress = questions.length > 0 ? (index / QUESTIONS_PER_SESSION) * 100 : 0;

  const speak = useCallback(() => {
    if (current) speakEnglish(current.word.english);
  }, [current]);

  function handleAnswer(option: string) {
    if (selected || !current) return;
    stopListening?.();
    setMicState("idle");
    setSelected(option);
    const correct = option === current.word.japanese;
    recordAnswer(current.word.id, correct);
    if (correct) {
      addXP(XP_CORRECT);
      setEarnedXP((p) => p + XP_CORRECT);
      setCorrectCount((p) => p + 1);
    }
    setPhase("feedback");
  }

  function handleNext() {
    if (index + 1 >= QUESTIONS_PER_SESSION) {
      recordStudySession("vocabulary");
      setPhase("complete");
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setPhase("question");
    }
  }

  function handleMic() {
    if (micState === "listening") {
      stopListening?.();
      setMicState("idle");
      return;
    }
    setMicError("");
    setMicState("listening");
    const stop = startListening(
      "ja-JP",
      ({ transcript }) => {
        setMicState("idle");
        const match = current?.options.find(
          (o) => o.replace(/[　 ]/g, "").includes(transcript.replace(/[　 ]/g, "").slice(0, 3))
        );
        handleAnswer(match ?? transcript);
      },
      (msg) => {
        setMicState("error");
        setMicError(msg);
      }
    );
    setStopListening(() => stop);
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#1CB0F6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (phase === "complete") {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-6 gap-6 text-center animate-celebration">
        <div className="text-8xl">🎊</div>
        <h2 className="text-3xl font-bold text-gray-800">レッスン完了！</h2>
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
            <div className="w-px bg-gray-200" />
            <div>
              <p className="text-4xl font-bold text-[#1CB0F6]">{QUESTIONS_PER_SESSION - correctCount}</p>
              <p className="text-sm text-gray-500">まちがい</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => router.push("/")}
          className="w-full bg-[#1CB0F6] text-white font-bold text-lg rounded-2xl py-4 active:opacity-80"
        >
          ホームへ戻る
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1 text-gray-400 font-bold px-2 py-1 active:opacity-60"
        >
          <span className="text-xl">←</span>
          <span className="text-sm">ホーム</span>
        </button>
        <div className="flex-1 bg-gray-200 rounded-full h-4">
          <div
            className="bg-[#1CB0F6] h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-gray-500 font-semibold">{index + 1}/{QUESTIONS_PER_SESSION}</span>
      </div>

      <div className={`flex flex-col flex-1 px-4 pt-4 gap-4 ${phase === "feedback" ? "pb-56" : "pb-4"}`}>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          意味を選んでみよう
        </p>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <div>
              <p className="text-4xl font-bold text-gray-800">{current.word.english}</p>
              <p className="text-sm text-gray-400 mt-1">{current.word.partOfSpeech}</p>
            </div>
            <button
              onClick={speak}
              className="bg-[#1CB0F6] text-white rounded-xl p-3 text-xl active:opacity-60"
            >
              🔊
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {current.options.map((option) => {
            let style = "bg-white border-2 border-gray-200 text-gray-700";
            if (selected) {
              if (option === current.word.japanese) style = "bg-[#D7FFB8] border-2 border-[#58CC02] text-gray-800";
              else if (option === selected) style = "bg-[#FFD5D5] border-2 border-[#FF4B4B] text-gray-800";
              else style = "bg-white border-2 border-gray-200 text-gray-400";
            }
            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={!!selected}
                className={`${style} rounded-2xl px-4 py-4 text-center font-medium text-base transition-colors ${
                  selected && option === selected && option !== current.word.japanese ? "animate-shake" : ""
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {canUseMic && !selected && (
          <div className="flex flex-col items-center gap-1 mt-2">
            <button
              onClick={handleMic}
              className={`w-16 h-16 rounded-full text-3xl flex items-center justify-center transition-all active:opacity-60 ${
                micState === "listening"
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-white border-2 border-gray-200 text-gray-500"
              }`}
            >
              🎤
            </button>
            <p className="text-xs text-gray-400">
              {micState === "listening" ? "聞いています…（タップで停止）" : "日本語で話してみよう"}
            </p>
            {micError && <p className="text-xs text-red-400">{micError}</p>}
          </div>
        )}
      </div>

      {phase === "feedback" && (
        <div className="animate-slide-up fixed bottom-0 left-0 right-0 flex justify-center z-50">
          <div className={`w-full max-w-md px-4 pb-8 pt-5 ${isCorrect ? "bg-[#D7FFB8]" : "bg-[#FFD5D5]"}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{isCorrect ? "✅" : "❌"}</span>
              <p className={`text-xl font-bold ${isCorrect ? "text-[#46a302]" : "text-[#FF4B4B]"}`}>
                {isCorrect ? "正解！" : "まちがい"}
              </p>
            </div>
            {!isCorrect && (
              <p className="text-sm text-gray-700 mb-2">
                正解：<span className="font-bold">{current.word.japanese}</span>
              </p>
            )}
            <div className="bg-white/60 rounded-xl p-3 mb-3">
              <p className="text-sm font-bold text-gray-600 mb-1">例文</p>
              <div className="flex items-start gap-2">
                <p className="text-sm text-gray-800 flex-1">{current.word.exampleSentence}</p>
                <button onClick={() => speakEnglish(current.word.exampleSentence)} className="text-[#1CB0F6] text-lg shrink-0">
                  🔊
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">{current.word.exampleJapanese}</p>
              <p className="text-xs text-gray-400 mt-2">💡 {current.word.memoryTip}</p>
            </div>
            <button
              onClick={handleNext}
              className={`w-full font-bold text-lg rounded-2xl py-4 text-white active:opacity-80 ${
                isCorrect ? "bg-[#1CB0F6]" : "bg-[#FF4B4B]"
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
