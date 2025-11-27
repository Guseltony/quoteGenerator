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
const resetBtn = document.querySelector(".reset");
// let prevQuotes = [];

// option three

let availableQuotes = [...quotes];
let availableColors = [...colors];
let timerId;
let saveQuotes = [];
let randomQuote;

function getStoredQuotes() {
  if (!localStorage.getItem("favs")) return;

  let storedQuote = JSON.parse(localStorage.getItem("favs")) || [];

  const randomIndex = generateRandomNumber(storedQuote.length);

  if (storedQuote.length > 0) {
    quoteEl.textContent = storedQuote[randomIndex].quote;
    authorEl.textContent = storedQuote[randomIndex].author;
  } else return;
}

getStoredQuotes();

function generateQuote() {
  if (availableQuotes.length === 0) {
    alert("All quotes have been displayed!");
    resetBtn.disabled = false;
    return;
  }

  const randomIndex = generateRandomNumber(availableQuotes.length);
  const randomColorIndex = generateRandomNumber(availableColors.length);
  randomQuote = availableQuotes.splice(randomIndex, 1)[0]; // remove
  const randomColor = availableColors[randomColorIndex];

  quoteEl.textContent = randomQuote.quote;
  authorEl.textContent = randomQuote.author;

  containerEl.style.backgroundColor = randomColor;
  triangleEl.style.backgroundColor = randomColor;
  resetBtn.disabled = true;
}

function copyQuote() {
  navigator.clipboard.writeText(quoteEl.textContent);

  copyEl.textContent = "copied";
  setTimeout(() => (copyEl.textContent = ""), 2000);
}

function autoQuoteGeneration() {
  timerId = setInterval(() => {
    if (availableQuotes.length === 0) {
      clearInterval(timerId);
      alert("All quotes have been displayed!");
      return;
    }

    generateQuote();
    autoMode.disabled = true;
    stopAuto.disabled = false;
  }, 8000);

  autoMode.style.backgroundColor = "#ff06e2";
  stopAuto.style.backgroundColor = "#fd46e8";
  quoteBtn.classList.add("disable");
}

function generateRandomNumber(length) {
  return Math.floor(Math.random() * length);
}

// saveBtn.addEventListener("click", () => {
//   saveQuotes.push(randomQuote);
//   localStorage.setItem("favs", JSON.stringify(saveQuotes));
// });

saveBtn.addEventListener("click", () => {
  if (!saveQuotes.some((q) => q.quote === randomQuote.quote)) {
    saveQuotes.push(randomQuote);
    localStorage.setItem("favs", JSON.stringify(saveQuotes));
  } else {
    alert("Already saved!");
  }
});

autoMode.addEventListener("click", autoQuoteGeneration);

stopAuto.addEventListener("click", () => {
  clearInterval(timerId);
  quoteBtn.classList.remove("disable");

  autoMode.disabled = false;
  stopAuto.disabled = true;

  stopAuto.style.backgroundColor = "#ff06e2";
  autoMode.style.backgroundColor = "#fd46e8";
  quoteBtn.style.backgroundColor = "#fd46e8";
});

copyBtn.addEventListener("click", copyQuote);
quoteBtn.addEventListener("click", generateQuote);

document.querySelector(".reset").addEventListener("click", () => {
  availableQuotes = [...quotes];
});
