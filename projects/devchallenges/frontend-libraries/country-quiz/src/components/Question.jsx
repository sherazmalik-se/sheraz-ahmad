import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import OptionButton from "./OptionButton";
import { motion, AnimatePresence } from "motion/react";

function Question(props) {
  const { unorganizedQuestions, setPoints, points, setQuizCompleted } = props;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [listItemDisabled, setListItemDisabled] = useState(false);

  useEffect(() => {
    const organizedQuestions = unorganizedQuestions.map(question => {
      const shuffledAnswers = shuffleAnswers(
        question.correctAnswer,
        question.incorrectAnswers
      );

      const result = {
        question: question.question.text,
        answers: shuffledAnswers.answers,
        correctAnswerIndex: shuffledAnswers.correctAnswerIndex,
        userOptedAnswer: null,
      };

      return result;
    });

    setQuestions(organizedQuestions);
  }, [unorganizedQuestions]);

  function shuffleAnswers(correctAnswer, incorrectAnswers) {
    const answers = [correctAnswer, ...incorrectAnswers];
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
    const correctAnswerIndex = shuffledAnswers.indexOf(correctAnswer);

    return { answers: shuffledAnswers, correctAnswerIndex };
  }

  function answerOpted(answerIndex) {
    if (questions[currentQuestionIndex].userOptedAnswer !== null) return;

    setListItemDisabled(true);

    setTimeout(() => {
      const iOfFirstUncompletedQ = questions.findIndex((question, index) => {
        if (index !== currentQuestionIndex) {
          return question.userOptedAnswer === null;
        }
      });

      if (iOfFirstUncompletedQ === -1) {
        setQuizCompleted(true);
        return;
      }

      setCurrentQuestionIndex(iOfFirstUncompletedQ);
      setListItemDisabled(false);
    }, 1500);

    setQuestions(prevQuestions => {
      return prevQuestions.map((question, index) => {
        if (index === currentQuestionIndex) {
          return {
            ...question,
            userOptedAnswer: answerIndex,
          };
        } else {
          return question;
        }
      });
    });

    if (answerIndex === questions[currentQuestionIndex].correctAnswerIndex) {
      setPoints(prevPoints => prevPoints + 1);
    }
  }

  return (
    <>
      {questions.length > 0 && (
        <>
          <div className="flex justify-between my-10">
            <h1 className="text-2xl font-vietnam-medium">Country Quiz</h1>

            <p className="bg-linear-to-r from-[#E65895] to-[#BC6BE8] font-vietnam-medium px-4 py-2 rounded-full w-40">
              <span className="pr-1.5">🏆</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={points} // Unique key ensures exit/enter animations
                  initial={{ y: 10, opacity: 0 }} // Start below
                  animate={{ y: 0, opacity: 1 }} // Move to position
                  exit={{ y: -10, opacity: 0 }} // Exit upward
                  transition={{ duration: 0.3 }} // 300ms
                  className="inline-block tracking-widest"
                >
                  {points}
                </motion.span>
              </AnimatePresence>
              /10 Points
            </p>
          </div>

          <section className="bg-[#343964] rounded-2xl py-16 px-3 grid gap-8 justify-center">
            <ul className="flex gap-3 flex-wrap justify-center font-vietnam-semibold questionsList">
              {questions.map((question, index) => {
                return (
                  <ListItem
                    key={index}
                    index={index}
                    currentQuestionIndex={currentQuestionIndex}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    isCompleted={question.userOptedAnswer !== null}
                    listItemDisabled={listItemDisabled}
                  />
                );
              })}
            </ul>

            <AnimatePresence mode="wait">
              <motion.h1
                key={currentQuestionIndex} // Unique key triggers animation on change
                initial={{ y: 30, opacity: 0, scale: 0.95 }} // Start below, slightly smaller
                animate={{ y: 0, opacity: 1, scale: 1 }} // Move to position, full size
                exit={{ y: -30, opacity: 0, scale: 0.95 }} // Exit upward, slightly smaller
                transition={{
                  duration: 0.3, // Smooth 500ms
                  ease: [0.4, 0, 0.2, 1], // Custom easing for natural feel
                }}
                className="justify-self-center font-vietnam-semibold text-xl text-center max-w-xl"
              >
                {questions[currentQuestionIndex].question}
              </motion.h1>
            </AnimatePresence>

            <div className="mt-1 grid sm:grid-cols-2 gap-7 font-vietnam-semibold optionsGroup">
              {questions[currentQuestionIndex].answers.map((answer, index) => {
                return (
                  <AnimatePresence mode="wait" key={index}>
                    <motion.span
                      key={currentQuestionIndex} // Unique key ensures exit/enter animations
                      initial={{ x: -30, opacity: 0 }} // Start left
                      animate={{ x: 0, opacity: 1 }} // Move to position
                      exit={{ x: 30, opacity: 0 }} // Exit right
                      transition={{ duration: 0.3 }} // 300ms
                      className="grid"
                    >
                      <OptionButton
                        index={index}
                        answer={questions[currentQuestionIndex].answers[index]}
                        answerOpted={answerOpted}
                        correctAnswerIndex={
                          questions[currentQuestionIndex].correctAnswerIndex
                        }
                        isQuestionAnswered={
                          questions[currentQuestionIndex].userOptedAnswer !==
                          null
                        }
                        userOptedAnswer={
                          questions[currentQuestionIndex].userOptedAnswer
                        }
                      />
                    </motion.span>
                  </AnimatePresence>
                );
              })}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Question;
