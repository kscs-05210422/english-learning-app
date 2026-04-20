export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speakEnglish(text: string): void {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.85;

  const setVoiceAndSpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => v.lang.startsWith("en") && /samantha|karen|victoria|zoe/i.test(v.name)) ??
      voices.find((v) => v.lang === "en-US") ??
      voices.find((v) => v.lang.startsWith("en"));
    if (preferred) utterance.voice = preferred;
    window.speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    setVoiceAndSpeak();
  } else {
    window.speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
  }
}

export function stopSpeaking(): void {
  if (isSpeechSupported()) window.speechSynthesis.cancel();
}

export type RecognitionResult = { transcript: string; confidence: number };

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
}

export function startListening(
  lang: "en-US" | "ja-JP",
  onResult: (result: RecognitionResult) => void,
  onError: (msg: string) => void
): (() => void) {
  const SpeechRecognition =
    (window as typeof window & { SpeechRecognition?: typeof window.SpeechRecognition; webkitSpeechRecognition?: typeof window.SpeechRecognition })
      .SpeechRecognition ??
    (window as typeof window & { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError("音声認識はこのブラウザでは使えません");
    return () => {};
  }

  const recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const r = event.results[0][0];
    onResult({ transcript: r.transcript, confidence: r.confidence });
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    if (event.error === "not-allowed") {
      onError("マイクの使用が許可されていません");
    } else if (event.error === "network") {
      onError("ネットワークエラー（HTTPSが必要な場合があります）");
    } else {
      onError("音声認識エラー: " + event.error);
    }
  };

  recognition.start();
  return () => recognition.stop();
}
