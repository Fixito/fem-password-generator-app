import {
  copyToClipboard,
  generatePassword,
  getPasswordStrength,
} from './utils.js';

const form = document.querySelector('.password-generator__form');
const passwordInputDOM = document.querySelector(
  '.password-generator__password'
);
const copyBtn = document.querySelector('.password-generator__copy-button');
const copiedTextSpanDOM = document.querySelector(
  '.password-generator__output-span'
);
const rangeInput = document.querySelector('#char-length');
const charLengthValueDOM = document.querySelector(
  '.password-generator__char-length-value'
);
const strengthBarsDOM = document.querySelectorAll(
  '.password-generator__strength-bar'
);
const root = document.documentElement;
const StrengthIndicatorTextDOM = document.querySelector(
  '.password-generator__strength-indicator-text'
);

function updatePasswordStrengthColor(passwordStrength) {
  switch (passwordStrength) {
    case 1:
      root.style.setProperty('--color-bg-active-bars', 'var(--color-red)');
      StrengthIndicatorTextDOM.textContent = 'Too weak!';
      break;
    case 2:
      root.style.setProperty('--color-bg-active-bars', 'var(--color-orange)');
      StrengthIndicatorTextDOM.textContent = 'Weak';
      break;
    case 3:
      root.style.setProperty('--color-bg-active-bars', 'var(--color-yellow)');
      StrengthIndicatorTextDOM.textContent = 'Medium';
      break;
    case 4:
      root.style.setProperty(
        '--color-bg-active-bars',
        'var(--color-bg-accent)'
      );
      StrengthIndicatorTextDOM.textContent = 'Strong';
      break;
    default:
      root.style.setProperty(
        '--color-bg-active-bars',
        'var(--color-bg-neutral)'
      );
      StrengthIndicatorTextDOM.textContent = '';
  }

  StrengthIndicatorTextDOM.classList.add('active');
}

const reset = () => {
  StrengthIndicatorTextDOM.textContent = '';
  strengthBarsDOM.forEach((bar) => bar.classList.remove('active'));
  root.style.setProperty('--color-bg-active-bars', 'var(--color-bg-neutral)');
  StrengthIndicatorTextDOM.classList.remove('active');
  passwordInputDOM.value = '';
  copiedTextSpanDOM.classList.remove('copied');
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const data = Object.fromEntries(formData);

  if (
    !data.includeLowercaseLetters &&
    !data.includeUppcaseLetters &&
    !data.includeNumbers &&
    !data.includeSymbols
  ) {
    reset();
    return;
  }

  const password = generatePassword(data);
  const passwordStrength = getPasswordStrength(password);

  for (let i = 0; i < strengthBarsDOM.length; i++) {
    if (i < passwordStrength) {
      strengthBarsDOM[i].classList.add('active');
    } else {
      strengthBarsDOM[i].classList.remove('active');
    }
  }

  updatePasswordStrengthColor(passwordStrength);
  passwordInputDOM.value = password;
  copiedTextSpanDOM.classList.remove('copied');
};

const handleCopyBtnClick = () => {
  if (!passwordInputDOM.value) return;
  copyToClipboard(passwordInputDOM);
  copiedTextSpanDOM.classList.add('copied');
};

const handleRangeInputChange = (e) => {
  charLengthValueDOM.textContent = e.currentTarget.value;
};

form.addEventListener('submit', handleSubmit);

copyBtn.addEventListener('click', handleCopyBtnClick);

rangeInput.addEventListener('input', handleRangeInputChange);
