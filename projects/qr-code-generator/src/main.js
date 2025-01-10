const form = document.querySelector(".urlToQR");
const formContainer = document.querySelector(".form-container");
const qrContainer = document.querySelector(".qr-container");
const showQR = document.querySelector(".show-qr");
const downloadQrBTN = document.querySelector(".download-qr");
const shareQrBTN = document.querySelector(".share-qr");
const tooltiptext = document.querySelector(".tooltiptext");

function generateQR(e) {
  e.preventDefault();
  var givenUrl = e.target.querySelector("#given-url").value;
  if (!givenUrl) return;
  formContainer.classList.add("hidden");
  qrContainer.classList.remove("hidden");
  const qrcode = new QRCode(showQR, {
    text: givenUrl,
    width: 204,
    height: 204,
    colorDark: "#000",
    colorLight: "#fff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

function downloadQR(e) {
  const canvas = showQR.querySelector("img").src;
  var a = document.createElement("a");
  a.href = canvas;
  a.download = "qr_image.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function shareQR(e) {
  const canvas = showQR.querySelector("img").src;
  navigator.clipboard.writeText(canvas);
  tooltiptext.classList.add("copied");
  tooltiptext.innerHTML = "Copied!";
  setTimeout(() => {
    tooltiptext.classList.remove("copied");
    tooltiptext.innerHTML = "Copy to clipboard";
  }, 1000);
}

form.addEventListener("submit", generateQR);
downloadQrBTN.addEventListener("click", downloadQR);
shareQrBTN.addEventListener("click", shareQR);
