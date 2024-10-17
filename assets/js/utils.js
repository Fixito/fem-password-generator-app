import {
  LOWERCASE_LETTERS,
  NUMBERS,
  SYMBOLS,
  UPPERCASE_LETTERS,
} from './constants.js';

const generatePassword = ({
  charLength,
  includeUppercaseLetters,
  includeLowercaseLetters,
  includeNumbers,
  includeSymbols,
}) => {
  let characters = '';

  if (includeUppercaseLetters) {
    characters += UPPERCASE_LETTERS;
  }

  if (includeLowercaseLetters) {
    characters += LOWERCASE_LETTERS;
  }

  if (includeNumbers) {
    characters += NUMBERS;
  }

  if (includeSymbols) {
    characters += SYMBOLS;
  }

  let password = '';

  for (let i = 0; i < charLength; i++) {
    const character = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );

    password += character;
  }

  return password;
};

const copyToClipboard = (copyText) => {
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices
  navigator.clipboard.writeText(copyText.value);
};

function getPasswordStrength(password) {
  let score = 0;

  const hasLowercase = new RegExp(`[${LOWERCASE_LETTERS}]`).test(password);
  const hasUppercase = new RegExp(`[${UPPERCASE_LETTERS}]`).test(password);
  const hasNumbers = new RegExp(`[${NUMBERS}]`).test(password);
  const hasSymbols = new RegExp(`[${SYMBOLS}]`).test(password);
  const lengthCriteria = password.length >= 8;

  if (hasLowercase) score++;
  if (hasUppercase) score++;
  if (hasNumbers) score++;
  if (hasSymbols) score++;
  if (lengthCriteria) score++;

  if (score === 5) return 4;
  if (score === 4) return 3;
  if (score === 3) return 2;
  return 1;
}

export { generatePassword, copyToClipboard, getPasswordStrength };
