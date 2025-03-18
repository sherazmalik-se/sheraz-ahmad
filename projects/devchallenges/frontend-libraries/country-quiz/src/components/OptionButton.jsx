import React from "react";
import checkRoundFill from "/resources/Check_round_fill.svg";
import closeRoundFill from "/resources/Close_round_fill.svg";

function OptionButton({
  index,
  answerOpted,
  isQuestionAnswered,
  answer,
  correctAnswerIndex,
  userOptedAnswer,
}) {
  return (
    <button
      onClick={() => answerOpted(index)}
      className={isQuestionAnswered ? "cursor-not-allowed" : "cursor-pointer"}
    >
      {answer}

      {isQuestionAnswered && index === correctAnswerIndex && (
        <img src={checkRoundFill} alt="SVG icon for correct" />
      )}
      {isQuestionAnswered &&
        index !== correctAnswerIndex &&
        index === userOptedAnswer && (
          <img src={closeRoundFill} alt="SVG icon for incorrect" />
        )}
    </button>
  );
}

export default OptionButton;
