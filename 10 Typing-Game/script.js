var gameArea = document.getElementById("gameArea");
var input = document.getElementById("wordInput");
var shootBtn = document.getElementById("shootBtn");
var scoreText = document.getElementById("score");
var livesText = document.getElementById("lives");
var messageText = document.getElementById("message");

var wordBank = [
  "cat", "dog", "sun", "moon", "apple", "train", "water", "house", "clear",
  "tree", "book", "phone", "chair", "mouse", "green", "light", "river", "appreciate", "clean",
  "at", "to", "in", "on", "by", "up", "or", "an", "the", "and",
  "for", "with", "from", "into", "over", "under", "about", "after", "before", "between",
  "around", "little", "pocket", "planet", "silver", "window", "bridge", "forest", "summer", "winter",
  "orange", "yellow", "purple", "rocket", "camera", "pencil", "market", "school", "friend", "minute",
  "energy", "guitar", "jungle", "castle", "butter", "dragon", "flight", "bottle", "stream", "thunder"
];

var words = [];
var score = 0;
var lives = 5;
var gameOver = false;
var spawnTimer = null;
var laneTops = [20, 60, 100, 140, 180, 220, 260, 300, 340];

function difficultyLevel() {
  return Math.floor(score / 70);
}

function speedMultiplier() {
  // Smaller speed increase for a gentler curve.
  return 1 + difficultyLevel() * 0.04;
}

function maxActiveWords() {
  // Slowly allow more words on screen as score rises.
  return Math.min(5 + Math.floor(difficultyLevel() / 2), 10);
}

function nextSpawnDelay() {
  // Spawn faster over time, but keep a clear readable gap between words.
  var baseDelay = 1200 - difficultyLevel() * 60;
  var jitter = Math.floor(Math.random() * 220) - 110;
  return Math.max(500, baseDelay + jitter);
}

function randomWord() {
  var i = Math.floor(Math.random() * wordBank.length);
  return wordBank[i];
}

function laneIsBusy(top) {
  for (var i = 0; i < words.length; i++) {
    var sameLane = Math.abs(words[i].y - top) < 16;
    var nearSpawn = words[i].x < 140;

    if (sameLane && nearSpawn) {
      return true;
    }
  }

  return false;
}

function pickSpawnTop() {
  for (var i = 0; i < laneTops.length; i++) {
    var top = laneTops[Math.floor(Math.random() * laneTops.length)];
    if (!laneIsBusy(top)) {
      return top;
    }
  }

  return laneTops[Math.floor(Math.random() * laneTops.length)];
}

function createWord() {
  if (gameOver) {
    return;
  }

  var text = randomWord();
  var wordDiv = document.createElement("div");
  wordDiv.className = "word";
  wordDiv.textContent = text;
  wordDiv.style.left = "0px";
  wordDiv.style.top = pickSpawnTop() + "px";

  gameArea.appendChild(wordDiv);

  var obj = {
    text: text,
    x: 0,
    y: parseInt(wordDiv.style.top),
    speed: (1 + Math.random() * 1.5) * speedMultiplier(),
    el: wordDiv
  };

  words.push(obj);
}

function spawnWord() {
  if (gameOver) {
    return;
  }

  if (words.length < maxActiveWords()) {
    createWord();
  }
}

function scheduleNextSpawn() {
  if (gameOver) {
    return;
  }

  spawnTimer = setTimeout(function () {
    spawnWord();
    scheduleNextSpawn();
  }, nextSpawnDelay());
}

function moveWords() {
  if (gameOver) {
    return;
  }

  for (var i = 0; i < words.length; i++) {
    var w = words[i];
    w.x = w.x + w.speed;
    w.el.style.left = w.x + "px";
  }

  checkMissedWords();
}

function checkMissedWords() {
  for (var i = 0; i < words.length; i++) {
    var w = words[i];

    if (w.x > gameArea.clientWidth - 70) {
      gameArea.removeChild(w.el);
      words.splice(i, 1);
      i = i - 1;

      lives = lives - 1;
      livesText.textContent = lives;

      if (lives <= 0) {
        endGame();
        return;
      }
    }
  }
}

function shootWord() {
  if (gameOver) {
    return;
  }

  var typed = input.value.trim();
  var typedLower = typed.toLowerCase();

  if (typed === "") {
    return;
  }

  if (words.length === 0) {
    messageText.textContent = "No words on screen.";
    input.value = "";
    return;
  }

  var hitIndex = -1;
  for (var i = 0; i < words.length; i++) {
    if (words[i].text.toLowerCase() === typedLower) {
      hitIndex = i;
      break;
    }
  }

  if (hitIndex !== -1) {
    gameArea.removeChild(words[hitIndex].el);
    words.splice(hitIndex, 1);

    score = score + 10;
    scoreText.textContent = score;
    messageText.textContent = "Hit!";
  } else {
    messageText.textContent = "Word not found on screen.";
  }

  input.value = "";
}

function endGame() {
  gameOver = true;
  messageText.textContent = "Game Over. Final Score: " + score;
  input.disabled = true;
  shootBtn.disabled = true;

  if (spawnTimer !== null) {
    clearTimeout(spawnTimer);
  }
}

shootBtn.addEventListener("click", shootWord);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    shootWord();
  }
});

spawnWord();
scheduleNextSpawn();
setInterval(moveWords, 20);
