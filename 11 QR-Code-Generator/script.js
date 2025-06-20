var input = document.getElementById("input");
var generateBtn = document.getElementById("generateBtn");
var qrImage = document.getElementById("qrImage");
var errorMsg = document.getElementById("errorMsg");
var downloadBtn = document.getElementById("downloadBtn");
var qrContainer = document.getElementById("qrContainer");

function generateQR() {
  var text = input.value.trim();

  if (text === "") {
    errorMsg.textContent = "Please enter some text or a URL.";
    qrImage.style.display = "none";
    downloadBtn.style.display = "none";
    return;
  }

  errorMsg.textContent = "";

  var url = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(text);

  qrImage.src = url;
  qrImage.style.display = "block";
  downloadBtn.href = url;
  downloadBtn.style.display = "inline-block";
}

generateBtn.addEventListener("click", generateQR);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    generateQR();
  }
});