import React from "react";

function ListItem({
  currentQuestionIndex,
  setCurrentQuestionIndex,
  isCompleted,
  index,
  listItemDisabled,
}) {
  return (
    <li
      className={`${
        currentQuestionIndex === index || isCompleted ? "active" : ""
      } ${listItemDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={() => !listItemDisabled && setCurrentQuestionIndex(index)}
    >
      {index + 1}
    </li>
  );
}

export default ListItem;
