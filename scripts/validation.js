const settings = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error"
}

const resetValidation = (formEl, inputList) => {
  inputList.forEach((input)=> {
   hideInputError(formEl, input)
  })
  const buttonEl = formEl.querySelector(settings.submitButtonSelector);
  if (buttonEl) {
    buttonEl.disabled = true;
    buttonEl.classList.add(settings.inactiveButtonClass);
  }
}
const showInputError  = (formEl, inputEl, errorMsg, config ) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add("modal__input_type_error");
}
const hideInputError  = (formEl, inputEl, config ) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove("modal__input_type_error");
}
const checkInputValidity = (formEl, inputEl, config) =>{
 if(!inputEl.validity.valid){
  showInputError(formEl, inputEl, inputEl.validationMessage, config);
 } else{
  hideInputError(formEl,inputEl, config);
 }
}

//TODO - use the settings object in all functions instead of hard-coded strings
const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  const hasInvalidInput = (inputList, ) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
  }
  const toggleButtonState = (inputList, buttonEl, config) => {
    if(hasInvalidInput(inputList, config)){
      disableButton(buttonEl, config);
    } else {
      buttonEl.disabled = false;
      buttonEl.classList.remove("modal__submit-button_disabled");

    }
  }
  const disableButton =(buttonEl, config) => {
    buttonEl.disabled = true;
    buttonEl.classList.add("modal__submit-button_disabled");
  }

  toggleButtonState(inputList, buttonEl, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });
}
const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
}


enableValidation(settings);