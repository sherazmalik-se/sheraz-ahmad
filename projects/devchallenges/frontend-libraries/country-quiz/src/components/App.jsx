import { useEffect, useState } from "react";
import "../App.css";
import Footer from "./Footer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Question from "./Question";
import QuizCompleted from "./QuizCompleted";
import { motion, AnimatePresence } from "motion/react";

function App() {
  const [points, setPoints] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: unorganizedQuestions,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const response = await fetch(
        "https://the-trivia-api.com/v2/questions?limit=10&categories=geography"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    },
    refetchOnWindowFocus: false,
    enabled: !quizCompleted,
  });

  useEffect(() => {
    if (quizCompleted) {
      queryClient.removeQueries({ queryKey: ["questions"] });
    }
  }, [quizCompleted, queryClient]);

  return (
    <div className="wrapper">
      <AnimatePresence mode="wait">
        {quizCompleted ? (
          <motion.main
            key="completed" // Unique key for AnimatePresence
            initial={{ opacity: 0, y: 20 }} // Start below, faded
            animate={{ opacity: 1, y: 0 }} // Slide up, full opacity
            exit={{ opacity: 0, y: -20 }} // Exit upward, faded
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="container"
          >
            <QuizCompleted
              points={points}
              setPoints={setPoints}
              setQuizCompleted={setQuizCompleted}
            />
          </motion.main>
        ) : (
          <motion.main
            key="incomplete" // Unique key for AnimatePresence
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="container"
          >
            {isLoading && (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {isSuccess && (
              <Question
                unorganizedQuestions={unorganizedQuestions}
                setPoints={setPoints}
                points={points}
                setQuizCompleted={setQuizCompleted}
              />
            )}

            {isError && (
              <p className="text-center text-2xl text-red-400">
                {error.message}
              </p>
            )}
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;
