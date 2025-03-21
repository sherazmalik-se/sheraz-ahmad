import React from "react";
import CustomSelect from "./CustomSelect";

function ChooseLang({ detectLang = "", lang, setLang }) {
  return (
    <>
      {detectLang !== "" && (
        <button
          className={`cursor-pointer rounded-xl py-2 px-3 ${
            lang === "autodetect" ? "bg-[#4D5562]" : ""
          }`}
          onClick={() => setLang(detectLang)}
        >
          Detect Language
        </button>
      )}

      <button
        className={`cursor-pointer rounded-xl py-2 px-3 ${
          lang === "en" ? "bg-[#4D5562]" : ""
        }`}
        onClick={() => setLang("en")}
      >
        English
      </button>

      <button
        className={`cursor-pointer rounded-xl py-2 px-3 ${
          lang === "fr" ? "bg-[#4D5562]" : ""
        }`}
        onClick={() => setLang("fr")}
      >
        French
      </button>

      <CustomSelect lang={lang} setLang={setLang} />
    </>
  );
}

export default ChooseLang;
