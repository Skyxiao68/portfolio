const form = document.querySelector("#contact-form");

const nameInput = document.querySelector("#name");

const emailInput = document.querySelector("#email");

const messageInput = document.querySelector("#message");

const submitButton = document.querySelector("#submit-button");

function validateName() {
  const nameValue = nameInput.value.trim();

  const validName = /^[A-Za-z\s]{2,}$/;

  if (!validName.test(nameValue)) {
    return false;
  }

  return true;
}

function validateEmail() {
  const emailValue = emailInput.value.trim();

  const validEmail = /^\S+@\S+\.\S+$/;

  if (!validEmail.test(emailValue)) {
    return false;
  }

  return true;
}

function validateMessage() {
  const messageValue = messageInput.value.trim();

  if (messageValue.length < 10) {
    return false;
  }

  return true;
}

function updateButtonState() {
  if (validateName() && validateEmail() && validateMessage()) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

form.addEventListener("input", updateButtonState);
