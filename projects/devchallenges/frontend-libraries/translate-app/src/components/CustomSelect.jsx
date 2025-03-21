import React, { useState } from "react";

const languages = [
  { code: "es", name: "Spanish" },
  { code: "sq", name: "Albanian" },
  { code: "ar", name: "Arabic" },
  { code: "hy", name: "Armenian" },
  { code: "bs", name: "Bosnian" },
  { code: "ca", name: "Catalan" },
  { code: "ceb", name: "Cebuano" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "nl", name: "Dutch" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek" },
  { code: "hi", name: "Hindi" },
  { code: "hu", name: "Hungarian" },
  { code: "is", name: "Icelandic" },
  { code: "id", name: "Indonesian" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "mk", name: "Macedonian" },
  { code: "no", name: "Norwegian" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "sr", name: "Serbian" },
  { code: "sk", name: "Slovak" },
  { code: "sv", name: "Swedish" },
  { code: "th", name: "Thai" },
  { code: "tr", name: "Turkish" },
  { code: "uk", name: "Ukrainian" },
  { code: "vi", name: "Vietnamese" },
];

function CustomSelect({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = optionValue => {
    setLang(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={`cursor-pointer rounded-xl py-2 px-3 pr-1 flex gap-1.5 ${
          languages.some(opt => opt.code === lang) ? "bg-[#4D5562]" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {languages.find(opt => opt.code === lang)?.name || "Spanish"}
        </span>
        <img
          src="/resources/Expand_down.svg"
          alt="arrow pointing down"
          className="w-5 h-5"
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-48 bg-[#4D5562] rounded-xl shadow-lg overflow-hidden">
          <div className="max-h-60 overflow-y-auto">
            {languages.map(option => (
              <div
                key={option.code}
                className="px-3.5 py-2 hover:bg-[#394150] cursor-pointer"
                onClick={() => handleSelect(option.code)}
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
