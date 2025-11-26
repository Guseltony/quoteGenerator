const quoteBtn = document.querySelector(".btn");
const resetQuote = document.querySelector(".btn-reset");
const quoteEl = document.querySelector("#quotes-box p");
const authorEl = document.querySelector("#author p");
const copyEl = document.querySelector(".copy-icon span");
const copyBtn = document.querySelector(".copy-btn");
const containerEl = document.querySelector("#quotes-box");
const triangleEl = document.querySelector(".triangle");
const autoMode = document.querySelector(".auto-quote");
const stopAuto = document.querySelector(".stop-auto");
const saveBtn = document.querySelector(".save-btn");
let prevQuotes = [];

// option three

let availableQuotes = [...quotes];
let timerId;
let saveQuotes = [];
let randomQuote;

function getStoredQuotes() {
  if (!localStorage.getItem("favs")) return;

  const storedQuote = JSON.parse(localStorage.getItem("favs"));

  const randomIndex = Math.floor(Math.random() * storedQuote.length);

  if (storedQuote.length > 0) {
    quoteEl.textContent = storedQuote[randomIndex].quote;
    authorEl.textContent = storedQuote[randomIndex].author;
  } else return;
}

getStoredQuotes();

function generateQuote() {
  if (availableQuotes.length === 0) {
    alert("All quotes have been displayed!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableQuotes.length);
  const randomColorIndex = Math.floor(Math.random() * colors.length);
  randomQuote = availableQuotes.splice(randomIndex, 1)[0]; // remove
  const randomColor = colors[randomColorIndex];

  quoteEl.textContent = randomQuote.quote;
  authorEl.textContent = randomQuote.author;

  containerEl.style.backgroundColor = randomColor;

  containerEl.style.backgroundColor = randomColor;
  triangleEl.style.backgroundColor = randomColor;

  copyEl.textContent = "";
}

function copyQuote() {
  navigator.clipboard.writeText(quoteEl.textContent);

  copyEl.textContent = "copied";
}

function autoQuoteGeneration() {
  timerId = setInterval(() => {
    if (availableQuotes.length === 0) {
      clearInterval(timerId);
      alert("All quotes have been displayed!");
      return;
    }

    generateQuote();
  }, 2000);

  autoMode.style.backgroundColor = "#ff06e2";
  stopAuto.style.backgroundColor = "#fd46e8";
  quoteBtn.classList.add("disable");
}

saveBtn.addEventListener("click", () => {
  saveQuotes.push(randomQuote);
  localStorage.setItem("favs", JSON.stringify(saveQuotes));
});

localStorage.setItem("myName", "Akanji Anthony");

autoMode.addEventListener("click", autoQuoteGeneration);

stopAuto.addEventListener("click", () => {
  clearInterval(timerId);
  quoteBtn.classList.remove("disable");

  stopAuto.style.backgroundColor = "#ff06e2";
  autoMode.style.backgroundColor = "#fd46e8";
  quoteBtn.style.backgroundColor = "#fd46e8";
});

copyBtn.addEventListener("click", copyQuote);
quoteBtn.addEventListener("click", generateQuote);
