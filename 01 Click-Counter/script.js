var count = 0;

var counttxt = document.getElementById("count");
var btn = document.getElementById("btn");
var resetBtn = document.getElementById("reset-btn");

btn.addEventListener("click", function () {
  count++;
  counttxt.textContent = count;

  counttxt.classList.add("bump");
  setTimeout(function () {
    counttxt.classList.remove("bump");
  }, 150);
});

resetBtn.addEventListener("click", function () {
    count = 0;
  counttxt.textContent = 0;
});
