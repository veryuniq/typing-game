// inside script.js
// all of our quotes
const quotes = [
  "It's not about overpowering an enemy. It's about taking away what power they have.",
  "Without you, I am nothing. But because of you, I am everything.",
  "It's important not to lose sight of what drives us: Love, justice, reverence...but the moment you put your desires befor my own...they will be lost to you. This isn't a threat, this is simply the truth. The path to you desires is only found...through me.",
  "Do you feel it? Don't fight it girl. It can sense your trepidation. You must make 'it' dread you.",
  "... This is the beginning of the end, Ozpin. And I can't wait to watch you burn.",
  "But perhaps victory is in the simpler things that you;ve long forgotten; things that require a smaller, more honest soul.",
  "But I look amoungst you, and all I see is wasted energy, in need of purpose - direction. You assume knowledge will  free you of this, but your time at this school will prove that knowldege can only take you so far. It is up to you to take the first step.",
  "I'm queen of the castle. I'm queen of the castle.",
  "Well the name's Jaune Arc. Short, sweet, rolls off the tongue, ladies love it.",
  "My mom always says, strangers are just friends you haven't met yet.",
];

// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");

// at the end of script.js
document.getElementById("start").addEventListener("click", () => {
  // get a quote
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // Put the quote into an array of words
  words = quote.split(" ");
  // reset the word index for tracking
  wordIndex = 0;

  // UI updates
  // Create an array of span elements so we can set a class
  const spanWords = words.map(function (word) {
    return `<span>${word} </span>`;
  });
  // Convert into string and set as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join("");
  // Highlight the first word
  quoteElement.childNodes[0].className = "highlight";
  // Clear any prior messages
  messageElement.innerText = "";

  // Setup the textbox
  // Clear the textbox
  typedValueElement.value = "";
  // set focus
  typedValueElement.focus();
  // set the event handler

  // Start the timer
  startTime = new Date().getTime();
});

// at the end of script.js
typedValueElement.addEventListener("input", () => {
  // Get the current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end of sentence
    // Display success
    const elapsedTime = new Date().getTime() - startTime;
    const message = `CONGRATULATIONS! You finished in ${
      elapsedTime / 1000
    } seconds.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    // end of word
    // clear the typedValueElement for the new word
    typedValueElement.value = "";
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = "";
  } else {
    // error state
    typedValueElement.className = "error";
  }
});
