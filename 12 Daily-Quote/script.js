var quoteText = document.getElementById('quote-text');
var quoteAuthor = document.getElementById('quote-author');
var newQuoteBtn = document.getElementById('new-quote-btn');
var copyBtn = document.getElementById('copy-btn');
var quoteBox = document.querySelector('.quote-box');

var API_URL = 'https://dummyjson.com/quotes/random';

var localQuotes = [
  { content: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { content: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein' },
  { content: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
  { content: 'Everything you can imagine is real.', author: 'Pablo Picasso' },
  { content: 'Believe you can and you are halfway there.', author: 'Theodore Roosevelt' },
  { content: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese Proverb' },
  { content: 'Do what you can, with what you have, where you are.', author: 'Theodore Roosevelt' },
  { content: 'Happiness is not something ready made. It comes from your own actions.', author: 'Dalai Lama' },
  { content: 'You miss 100% of the shots you do not take.', author: 'Wayne Gretzky' },
  { content: 'Whether you think you can or you think you can not, you are right.', author: 'Henry Ford' },
  { content: 'The journey of a thousand miles begins with one step.', author: 'Lao Tzu' },
  { content: 'Act as if what you do makes a difference. It does.', author: 'William James' },
  { content: 'What we think, we become.', author: 'Buddha' },
  { content: 'Life is what happens when you are busy making other plans.', author: 'John Lennon' },
  { content: 'The purpose of our lives is to be happy.', author: 'Dalai Lama' }
];

var lastIndex = -1;

function setLoading() {
  quoteText.textContent = 'Loading...';
  quoteAuthor.textContent = '';
  newQuoteBtn.disabled = true;
  copyBtn.disabled = true;
}

function displayQuote(content, author) {
  quoteText.textContent = '"' + content + '"';
  quoteAuthor.textContent = '— ' + author;
  newQuoteBtn.disabled = false;
  copyBtn.disabled = false;
}

function getLocalQuote() {
  var index;
  do {
    index = Math.floor(Math.random() * localQuotes.length);
  } while (index === lastIndex && localQuotes.length > 1);
  lastIndex = index;
  return localQuotes[index];
}

function fadeOutAndFetch() {
  quoteBox.classList.add('fade');

  setTimeout(function () {
    fetchQuote();
  }, 300);
}

function fetchQuote() {
  setLoading();

  fetch(API_URL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function (data) {
      displayQuote(data.quote, data.author);
      quoteBox.classList.remove('fade');
    })
    .catch(function () {
      var local = getLocalQuote();
      displayQuote(local.content, local.author);
      quoteBox.classList.remove('fade');
    });
}

function copyQuote() {
  var text = quoteText.textContent + ' ' + quoteAuthor.textContent;
  navigator.clipboard.writeText(text).then(function () {
    copyBtn.textContent = 'Copied!';
    setTimeout(function () {
      copyBtn.textContent = 'Copy Quote';
    }, 1500);
  });
}

newQuoteBtn.addEventListener('click', fadeOutAndFetch);
copyBtn.addEventListener('click', copyQuote);

fetchQuote();