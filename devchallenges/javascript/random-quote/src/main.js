document.addEventListener("DOMContentLoaded", (event) => {
  const randomBTN = document.querySelector(".random");
  const shareBTN = document.querySelector(".share");
  const showQuote = document.querySelector(".show-quote");
  const showAuthor = document.querySelector(".show-author");
  let currentQuote = `"Learn from yesterday, live for today, hope for tomorrow." - George Bernard Shaw`;
  const tooltiptext = document.querySelector(".tooltiptext");

  async function getRandomQuote(url) {
    const showTags = document.querySelector(".show-tags");
    try {
      randomBTN.setAttribute("disabled", true);
      const response = await fetch(url);
      var data = await response.json();

      showQuote.innerHTML = `"${data.text}"`;
      showAuthor.innerHTML = `${data.author}`;
      currentQuote = `"${data.text}" - ${data.author}`;

      let showTagsHTML = "";
      for (let i = 0; i < data.tags.length; i++) {
        showTagsHTML += `<p class="rounded-full px-3 py-0.5 border border-[#AEB0FF] text-[#AEB0FF] text-[10px]">${data.tags[i]}</p>`;
        if (i === 2) break;
      }
      showTags.innerHTML = showTagsHTML;

      randomBTN.removeAttribute("disabled");
    } catch (error) {
      randomBTN.removeAttribute("disabled");
      console.log(error.message);
    }
  }

  function shareRandomQuote(e) {
    navigator.clipboard.writeText(currentQuote);
    tooltiptext.classList.add("copied");
    tooltiptext.innerHTML = "Copied!";
    setTimeout(() => {
      tooltiptext.classList.remove("copied");
      tooltiptext.innerHTML = "Copy to clipboard";
    }, 1000);
  }

  randomBTN.addEventListener("click", () => {
    getRandomQuote(
      "https://go-quote.azurewebsites.net/random-quote?format=json"
    );
  });
  shareBTN.addEventListener("click", shareRandomQuote);
});
