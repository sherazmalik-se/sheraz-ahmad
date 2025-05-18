import React from "react";

function QuizCompleted({ points, setPoints, setQuizCompleted }) {
  return (
    <section className="self-center bg-[#343964] p-6 rounded-2xl grid gap-3 justify-center justify-items-center">
      <div className="max-w-[349px] h-[107px] bg-[url(/resources/congrats.svg)] bg-contain bg-no-repeat">
        <img
          src="/resources/congrats.png"
          alt="Congratulations!"
          className="w-full"
        />
      </div>

      <h1 className="max-w-[320px] text-2xl font-vietnam-medium text-center text-wrap">
        Congrats! You completed the quiz.
      </h1>

      <p className="font-vietnam-medium">You answer {points}/10 correctly.</p>

      <button
        className="my-8 bg-linear-to-r from-[#E65895] to-[#BC6BE8] py-5 w-[70%] rounded-2xl text-wrap flex gap-2 justify-center font-vietnam-semibold cursor-pointer"
        onClick={() => {
          setQuizCompleted(false);
          setPoints(0);
        }}
      >
        Play again
      </button>
    </section>
  );
}

export default QuizCompleted;
