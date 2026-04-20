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

type AnyWindow = Window & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SpeechRecognition?: new () => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webkitSpeechRecognition?: new () => any;
};

export function startListening(
  lang: "en-US" | "ja-JP",
  onResult: (result: RecognitionResult) => void,
  onError: (msg: string) => void
): (() => void) {
  const w = window as AnyWindow;
  const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition;

  if (!SR) {
    onError("音声認識はこのブラウザでは使えません");
    return () => {};
  }

  const recognition = new SR();
  recognition.lang = lang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onresult = (event: any) => {
    const r = event.results[0][0];
    onResult({ transcript: r.transcript, confidence: r.confidence });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onerror = (event: any) => {
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
