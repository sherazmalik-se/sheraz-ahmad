document.addEventListener("DOMContentLoaded", (event) => {
  const headings = document.querySelectorAll(".heading");
  const currentStepNum = document.querySelector(".current-step-num");
  const stepsIcon = document.querySelectorAll(".stepsIcon");
  const stepsForm = document.querySelectorAll(".stepsForm");
  const continueBTNs = document.querySelectorAll("button.continue");
  const textInputs = document.querySelectorAll(".stepForm1 input");
  const checkInputs = document.querySelectorAll(".stepForm2 input");
  let currentStep = 1;

  function nextStep(currentStep) {
    if (Number(currentStep) === 4) {
      document.querySelector(".alertDiv").classList.remove("hidden");
      setTimeout(() => {
        document.querySelector(".alertDiv").classList.add("hidden");
        window.location.reload();
      }, 2000);
      return;
    }
    headings.forEach((heading) => heading.classList.add("hidden"));
    stepsIcon.forEach((step) => step.classList.remove("current-step"));
    stepsForm.forEach((step) => step.classList.add("hidden"));

    document.querySelector(".heading" + currentStep).classList.remove("hidden");
    document
      .querySelector(".stepIcon" + currentStep)
      .classList.add("current-step");
    document
      .querySelector(".stepForm" + currentStep)
      .classList.remove("hidden");
    currentStepNum.innerHTML = currentStep;

    if (Number(currentStep) === 3) {
      const showName = document.querySelector(".show-name");
      const showEmail = document.querySelector(".show-email");
      const showTopics = document.querySelector(".show-topics");
      showName.innerHTML = document.querySelector("#name").value;
      showEmail.innerHTML = document.querySelector("#email").value;
      const checkBox = document.querySelectorAll("input:checked");
      let li = "";
      checkBox.forEach((box) => {
        li += `<li class="pt-1">${box.value}</li>`;
      });
      showTopics.innerHTML = li;
    }
  }

  function validateStep(step) {
    let isValid = true;

    if (Number(step) === 1) {
      const nameInp = document.querySelector(
        `.stepForm${step} input[type*=text]`
      );
      const emailInp = document.querySelector(
        `.stepForm${step} input[type*=email`
      );
      const name = checkTextInput(nameInp);
      const email = checkTextInput(emailInp);
      isValid = name && email;
    } else if (Number(step) === 2) {
      isValid = checkBoxInput();
    } else {
      isValid = true;
    }

    return isValid;
  }

  function checkTextInput(input) {
    if (input.type === "email") {
      const emailErrMess = document.querySelector(".emailErrMessage");
      if (input.value.length < 6 || input.value.length > 254) {
        emailErrMess.classList.remove("hidden");
        emailErrMess.innerHTML =
          "6 characters min and 254 characters max! required!";
        return false;
      } else {
        emailErrMess.classList.add("hidden");
        emailErrMess.innerHTML = "";
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (emailRegex.test(input.value)) {
          emailErrMess.classList.add("hidden");
          emailErrMess.innerHTML = "";
          return true;
        } else {
          emailErrMess.classList.remove("hidden");
          emailErrMess.innerHTML = "please enter a valid email address";
          return false;
        }
      }
    } else {
      const nameErrMess = document.querySelector(".nameErrMessage");
      if (input.value.length < 2 || input.value.length > 99) {
        nameErrMess.classList.remove("hidden");
        nameErrMess.innerHTML =
          "2 characters min and 99 characters max! required!";
        return false;
      } else {
        nameErrMess.classList.add("hidden");
        nameErrMess.innerHTML = "";
        return true;
      }
    }
  }

  function checkBoxInput() {
    const softwareDev = document.querySelector("#software-development");
    const userExp = document.querySelector("#user-experience");
    const graphicDes = document.querySelector("#graphic-design");
    const topicErrMess = document.querySelector(".topicErrMess");
    isValid = softwareDev.checked || userExp.checked || graphicDes.checked;
    if (isValid) {
      topicErrMess.classList.add("hidden");
      return true;
    } else {
      topicErrMess.classList.remove("hidden");
      return false;
    }
  }

  nextStep(currentStep);

  continueBTNs.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (validateStep(btn.dataset.step)) {
        nextStep(Number(btn.dataset.step) + 1);
      }
    });
  });

  textInputs.forEach((input) => {
    input.addEventListener("keyup", (e) => {
      checkTextInput(e.target);
    }); //keyup
    input.addEventListener("input", (e) => {
      checkTextInput(e.target);
    }); //keyup
    input.addEventListener("paste", (e) => {
      checkTextInput(e.target);
    }); //keyup
  }); //forEach

  checkInputs.forEach((input) => {
    input.addEventListener("change", checkBoxInput); //keyup
    input.addEventListener("keyup", checkBoxInput);
  }); //forEach
}); //Document Ready
