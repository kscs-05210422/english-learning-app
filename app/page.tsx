"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStreakInfo, type StreakInfo } from "@/lib/storage";

export default function HomePage() {
  const [streak, setStreak] = useState<StreakInfo | null>(null);

  useEffect(() => {
    setStreak(getStreakInfo());
  }, []);

  const todayStudied =
    streak?.lastStudyDate === new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col flex-1 px-4 py-6 gap-5">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">英語学習</h1>
          <p className="text-sm text-gray-500">英検3級を目指そう！</p>
        </div>
        <div className="text-4xl">🦜</div>
      </div>

      {/* Streak Card */}
      <div className="animate-bounce-in">
        {streak && streak.currentStreak > 0 ? (
          <div className="bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl p-5 text-white shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-5xl">🔥</span>
                <div>
                  <p className="text-3xl font-bold leading-none">
                    {streak.currentStreak}日
                  </p>
                  <p className="text-sm opacity-90 mt-0.5">連続学習中！</p>
                </div>
              </div>
              <div className="text-right bg-white/20 rounded-xl p-3">
                <p className="text-xs opacity-80">最高記録</p>
                <p className="text-2xl font-bold">{streak.longestStreak}日</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 flex justify-between text-xs opacity-80">
              <span>⭐ {streak.totalXP} XP 獲得済み</span>
              {todayStudied && <span>✅ 今日の学習完了！</span>}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-5 shadow-md border-2 border-dashed border-gray-200 text-center">
            <div className="text-4xl mb-2">🌱</div>
            <p className="font-bold text-gray-700 text-lg">さあ、始めよう！</p>
            <p className="text-sm text-gray-400 mt-1">
              最初の一歩で連続学習スタート🔥
            </p>
          </div>
        )}
      </div>

      {/* Mode Buttons */}
      <div className="flex flex-col gap-4 animate-slide-up">
        <p className="text-sm font-semibold text-gray-500 text-center">
          今日は何を練習する？
        </p>

        <Link href="/chunk">
          <div className="bg-gradient-to-r from-[#58CC02] to-[#46a302] rounded-2xl p-5 shadow-md text-white active:scale-95 transition-transform">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-xl p-3 text-4xl">📚</div>
              <div className="flex-1">
                <p className="text-xl font-bold">チャンク学習</p>
                <p className="text-sm opacity-90 mt-0.5">日常フレーズをまとめて覚えよう</p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">100フレーズ</span>
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">解説付き</span>
                </div>
              </div>
              <span className="text-2xl opacity-60">›</span>
            </div>
          </div>
        </Link>

        <Link href="/vocabulary">
          <div className="bg-gradient-to-r from-[#1CB0F6] to-[#0090D0] rounded-2xl p-5 shadow-md text-white active:scale-95 transition-transform">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-xl p-3 text-4xl">🔤</div>
              <div className="flex-1">
                <p className="text-xl font-bold">単語モード</p>
                <p className="text-sm opacity-90 mt-0.5">英検3級の単語をマスター</p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">200単語</span>
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">例文付き</span>
                </div>
              </div>
              <span className="text-2xl opacity-60">›</span>
            </div>
          </div>
        </Link>

        <Link href="/conversation">
          <div className="bg-gradient-to-r from-[#CE82FF] to-[#9B59B6] rounded-2xl p-5 shadow-md text-white active:scale-95 transition-transform">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-xl p-3 text-4xl">💬</div>
              <div className="flex-1">
                <p className="text-xl font-bold">会話モード</p>
                <p className="text-sm opacity-90 mt-0.5">サクラ先生と英語で話そう</p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">5シナリオ</span>
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">音声あり</span>
                </div>
              </div>
              <span className="text-2xl opacity-60">›</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Footer message */}
      <div className="mt-auto pb-4 text-center">
        <p className="text-sm text-gray-400">
          {todayStudied
            ? "🌟 今日もよく頑張りました！また明日！"
            : "毎日少しずつが上達の近道 💪"}
        </p>
      </div>
    </div>
  );
}
