const uname = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const form = document.getElementById("contact");
const question = document.getElementById("captcha-question");
const answer = document.getElementById("captcha-answer");

const isRequired = value => value.trim() !== "";

const isEmailValid = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = input => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  const error = formField.querySelector("small");
  error.textContent = "";
};

const checkName = () => {
  const username = uname.value.trim();

  if (!isRequired(username)) {
    showError(uname, "Name cannot be blank.");
    return false;
  } else {
    showSuccess(uname);
    return true;
  }
};

const checkEmail = () => {
  const mail = email.value.trim();

  if (!isRequired(mail)) {
    showError(email, "Email cannot be blank.");
    return false;
  } else if (!isEmailValid(mail)) {
    showError(email, "Email is not valid.");
    return false;
  } else {
    showSuccess(email);
    return true;
  }
};

const checkSubject = () => {
  const subj = subject.value.trim();

  if (!isRequired(subj)) {
    showError(subject, "Subject cannot be blank.");
    return false;
  } else {
    showSuccess(subject);
    return true;
  }
};

const checkMessage = () => {
  const msg = message.value.trim();

  if (!isRequired(msg)) {
    showError(message, "Message cannot be blank.");
    return false;
  } else {
    showSuccess(message);
    return true;
  }
};

function generateMathQuestions() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const answer = num1 + num2;
  const question = `${num1} + ${num2} = ?`;

  return { question, answer };
}

let mathQuestions = generateMathQuestions();

function displayQuestion() {
  question.textContent = mathQuestions.question;
}

function checkCaptcha() {
  const userAnswer = parseInt(answer.value);
  const correctAnswer = mathQuestions.answer;

  if (userAnswer === correctAnswer) {
    return true;
  } else {
    showError(answer, "Your answer is incorrect, please try again.");
    mathQuestions = generateMathQuestions();
    displayQuestion();
    return false;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = checkName();
  const isEmailValid = checkEmail();
  const isSubjectValid = checkSubject();
  const isMessageValid = checkMessage();
  const isCaptchaValid = checkCaptcha();

  const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid && isCaptchaValid;

  if (isFormValid) {
    form.submit();
  }
});

displayQuestion();