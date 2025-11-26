// option one

// function generateQuote() {
//   // 1. Check if all quotes used
//   if (prevQuotes.length === quotes.length) {
//     alert("All quotes have been displayed!");
//     return; // stop function
//   }

//   let randomNum;
//   let randomQuote;

//   // 2. Keep trying until we find a new quote
//   while (true) {
//     randomNum = Math.floor(Math.random() * quotes.length);
//     randomQuote = quotes[randomNum];

//     if (!prevQuotes.includes(randomQuote)) {
//       prevQuotes.push(randomQuote);
//       break;
//     }
//   }

//   // 3. Display
//   quoteEl.textContent = randomQuote.quote;
//   authorEl.textContent = randomQuote.author;
// }

// option two

// let shuffledQuotes = [...quotes]; // copy
// shuffledQuotes.sort(() => Math.random() - 0.5);

// let index = 0;

// function generateQuote() {
//   if (index === shuffledQuotes.length) {
//     alert("All quotes used!");
//     return;
//   }

//   let q = shuffledQuotes[index];
//   index++;

//   quoteEl.textContent = q.quote;
//   authorEl.textContent = q.author;
// }
