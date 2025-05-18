import React from "react";

function TextCopySpeak({ text, lang }) {
  const copyToClipboard = () => navigator.clipboard.writeText(text);
  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; //Set language code (e.g., 'es' for Spanish, 'en' for English)
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex gap-2">
      <button
        className="cursor-pointer self-center rounded-xl p-1.5 border-2 border-[#4D5562] flex gap-2"
        onClick={speakText}
      >
        <img src="/resources/sound_max_fill.svg" alt="arrow pointing down" />
      </button>

      <button
        className="cursor-pointer self-center rounded-xl p-1.5 border-2 border-[#4D5562] flex gap-2"
        onClick={copyToClipboard}
      >
        <img src="/resources/Copy.svg" alt="arrow pointing down" />
      </button>
    </div>
  );
}

export default TextCopySpeak;
