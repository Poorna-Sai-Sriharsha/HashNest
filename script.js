const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const clipboardIcon = document.getElementById('clipboard-icon');
const feedbackEl = document.getElementById('feedback');

const randomfunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  if (length < 4) {
    alert('Password length must be at least 4 characters!');
    lengthEl.value = 4;
    return;
  }
  if (length > 30) {
    alert('Password length cannot exceed 30 characters!');
    lengthEl.value = 30;
    return;
  }

  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  const password = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
  resultEl.innerText = password;
  feedbackEl.style.visibility = 'visible';
  setTimeout(() => feedbackEl.style.visibility = 'hidden', 1500);
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

  if (typesCount === 0) return '';

  typesArr.forEach(type => {
    const funcName = Object.keys(type)[0];
    generatedPassword += randomfunc[funcName]();
  });

  for (let i = typesArr.length; i < length; i++) {
    const funcName = Object.keys(typesArr[Math.floor(Math.random() * typesArr.length)])[0];
    generatedPassword += randomfunc[funcName]();
  }

  return generatedPassword.split('').sort(() => Math.random() - 0.5).join('');
}

clipboardEl.addEventListener('click', async () => {
  const password = resultEl.innerText;
  if (!password) return;
  try {
    await navigator.clipboard.writeText(password);
    clipboardIcon.classList.remove('fa-clipboard');
    clipboardIcon.classList.add('fa-check');
    setTimeout(() => {
      clipboardIcon.classList.remove('fa-check');
      clipboardIcon.classList.add('fa-clipboard');
    }, 1500);
  } catch (err) {
    alert('Failed to copy to clipboard');
  }
});
