import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "../App.css";
import Footer from "./Footer";
import ChooseLang from "./ChooseLang";
import TextCopySpeak from "./TextCopySpeak";

function App() {
  const [translatingText, setTranslatingText] = useState("Hello, how are you?");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("fr");
  const [searchParams, setSearchParams] = useState(translatingText);

  // Custom debounce with deep comparison
  useEffect(() => {
    const newParams = translatingText;
    const timer = setTimeout(() => {
      // Only update if values differ
      if (newParams !== searchParams) {
        setSearchParams(newParams);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [translatingText, searchParams]);

  const translateFn = async ({ queryKey }) => {
    const [, text, source, target] = queryKey; // Extract from queryKey
    const encodedText = encodeURIComponent(text);

    const response = await fetch(
      `/api/get?q=${encodedText}&langpair=${source}|${target}` /* for production > https://api.mymemory.translated.net/get?q= */
    );
    if (!response.ok) {
      setTranslatedText("");
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
  };

  const queryClient = useQueryClient();
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["translation", searchParams, sourceLang, targetLang],
    queryFn: translateFn,

    refetchOnWindowFocus: false,
    retry: false,
  });

  function switchLang() {
    setTranslatingText(translatedText);
    setSearchParams(translatedText);
    setTranslatedText(translatingText);
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  }

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ["translation", searchParams, sourceLang, targetLang],
      });
    };
  }, [searchParams, sourceLang, targetLang, queryClient]);

  useEffect(() => {
    let isMounted = true;
    if (isSuccess && data?.responseData?.translatedText && isMounted) {
      setTranslatedText(data.responseData.translatedText);
    }
    return () => {
      isMounted = false;
    };
  }, [isSuccess, data]);

  return (
    <div className="bg-[#040711] bg-[url('/resources/hero_img-sm.jpg')] sm:bg-[url('/resources/hero_img.jpg')] bg-no-repeat bg-cover bg-center text-custom-offwhite font-dmsans-bold">
      <main className="min-h-screen flex flex-col">
        <div className="self-center mt-[92px] mb-[52px]">
          <img
            src="/resources/logo.svg"
            className="w-full"
            alt="translated.io"
          />
        </div>

        <div className="content">
          {/* Left - Start */}
          <div className="bg-[#212936CC] left grid grid-rows-[auto_1fr_auto]">
            <div className="flex gap-3 pb-4 border-b border-[#394150] text-sm">
              <ChooseLang
                detectLang="autodetect"
                setLang={setSourceLang}
                lang={sourceLang}
              />
            </div>

            <div className="flex flex-col gap-1 mt-4">
              <textarea
                className="grow w-full min-h-32 resize-none text-custom-white"
                placeholder="Type here to translate"
                value={translatingText}
                onChange={({ target }) => setTranslatingText(target.value)}
                maxLength={500}
              ></textarea>
              <span className="text-xs self-end font-dmsans-medium">
                {translatingText.length}/500
              </span>
            </div>

            <div className="flex justify-between items-end mt-4">
              <TextCopySpeak text={translatingText} lang={sourceLang} />

              <button
                className={`${
                  isLoading ? "cursor-not-allowed" : "cursor-pointer"
                } py-3 px-6 bg-[#263FA9] border-[1.5px] border-[#7CA9F3] rounded-xl flex gap-2 text-custom-white font-dmsans-medium`}
                disabled={isLoading}
                onClick={() => setSearchParams(translatingText)}
              >
                <img src="/resources/Sort_alfa.svg" alt="Sort icon" /> Translate
              </button>
            </div>
          </div>
          {/* Left - End */}

          {/* Right - Start */}
          <div className="bg-[#121826CC] right grid grid-rows-[auto_1fr_auto]">
            <div className="flex justify-between pb-4 border-b border-[#394150]">
              <div className="flex gap-3 text-sm">
                <ChooseLang setLang={setTargetLang} lang={targetLang} />
              </div>

              <button
                className="cursor-pointer self-center rounded-xl p-1.5 border-2 border-[#4D5562] flex gap-2"
                onClick={switchLang}
                disabled={isLoading}
              >
                <img
                  src="/resources/Horizontal_top_left_main.svg"
                  alt="arrows, one pointing left and one right"
                />
              </button>
            </div>

            <div className="mt-4">
              <textarea
                className={`w-full min-h-32 resize-none ${
                  isLoading ? "animate-pulse" : ""
                } ${
                  isLoading
                    ? "text-custom-white"
                    : isError
                    ? "text-red-400"
                    : data?.responseStatus === 200
                    ? "text-custom-white"
                    : "text-red-400"
                }`}
                value={
                  isLoading
                    ? "Translating..."
                    : isError
                    ? error.message ||
                      "Error! Something went wrong. Please try again."
                    : translatedText
                }
                disabled
              ></textarea>
            </div>

            <div className="flex items-end mt-4">
              <TextCopySpeak text={translatedText} lang={targetLang} />
            </div>
          </div>
          {/* Right - End */}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
