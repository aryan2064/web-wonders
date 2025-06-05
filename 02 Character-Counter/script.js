var textArea = document.getElementById("textArea");
var charCount = document.getElementById("charCount");
var resetBtn = document.getElementById("resetBtn");

function updateCount() {
  var count = textArea.value.length;
  charCount.textContent = "Character Count: " + count;
}

textArea.addEventListener("input", updateCount);

resetBtn.addEventListener("click", function () {
  textArea.value = "";
  updateCount();
});
