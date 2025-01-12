export function createInputFields(length) {
  let inputsHTML = "";
  for (let i = 1; i <= length; i++) {
    if (i === 1) {
      inputsHTML += `<input type="text" class="input-word" data-input-number="${i}" maxlength="1" autofocus/>`;
    } else {
      inputsHTML += `<input type="text" class="input-word" data-input-number="${i}" maxlength="1" disabled/>`;
    }
  }
  return inputsHTML;
}
