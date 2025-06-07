const outputBox = document.getElementById("password-output");
const errorMsg = document.getElementById("error-msg");
const lengthInput = document.getElementById("length");
const upperCb = document.getElementById("upper");
const lowerCb = document.getElementById("lower");
const numberCb = document.getElementById("number");
const symbolCb = document.getElementById("symbol");
const generateBtn = document.getElementById("btn-generate");
const copyBtn = document.getElementById("btn-copy");

const UPPER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generatePassword() {
  errorMsg.textContent = "";

  let length = parseInt(lengthInput.value);

  if (isNaN(length) || length < 4) length = 4;
  if (length > 30) length = 30;
  lengthInput.value = length;

  let allChars = "";

  if (upperCb.checked) allChars += UPPER_CHARS;
  if (lowerCb.checked) allChars += LOWER_CHARS;
  if (numberCb.checked) allChars += NUMBER_CHARS;
  if (symbolCb.checked) allChars += SYMBOL_CHARS;

  if (allChars === "") {
    errorMsg.textContent = "Please select at least one option.";
    outputBox.textContent = "";
    return;
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  outputBox.textContent = password;
}

function copyPassword() {
  const password = outputBox.textContent;

  if (!password || password === "Your password will appear here") {
    errorMsg.textContent = "Nothing to copy. Generate a password first.";
    return;
  }

  navigator.clipboard.writeText(password).then(function () {
    copyBtn.textContent = "Copied!";
    errorMsg.textContent = "";
    setTimeout(function () {
      copyBtn.textContent = "Copy to Clipboard";
    }, 1500);
  }).catch(function () {
    errorMsg.textContent = "Failed to copy. Try again.";
  });
}

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);