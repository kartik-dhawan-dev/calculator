const EXPRESSION_ELEMENT_ID = "expression-element";
const DISPLAY_ELEMENT_ID = "display-element";
const ERROR_MESSAGE_ELEMENT_ID = "error-message-element";
const NUMERIC_BUTTON_CLASS = "numeric-button";
const OPERATOR_BUTTON_CLASS = "operator-button";
export const MAX_INPUT_LENGTH = 12

const NUMERIC_BUTTON_STYLE_CLASS =
  "w-18 h-18 bg-[#3B4252] text-[#EBDBB2] border-4 border-[#4C566A] shadow-[4px_4px_0px_0px_rgba(76,86,106,0.5)] font-bold text-xl flex items-center justify-center ";
const NUMERIC_BUTTON_HOVER_STYLE_CLASS =
  "hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all hover:bg-[#434C5E]";

const OPERATOR_BUTTON_STYLE_CLASS =
  "w-18 h-18 bg-[#2E3440] text-[#FE8019] p-2 border-4 border-[#D08770] shadow-[4px_4px_0px_0px_rgba(208,135,112,0.5)]";
const OPERATOR_BUTTON_HOVER_STYLE_CLASS =
  "hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all font-bold text-xl flex items-center justify-center hover:bg-[#3B4252]";

const getElementClassSelector = (className) => `.${className}`;
const getElementIdSelector = (id) => `#${id}`;
const getOneElement = (selector) => document.querySelector(selector);
const getAllElements = (selector) => document.querySelectorAll(selector);

const addNumericButtonStyleClasses = (numericButtonElements) => {
  numericButtonElements?.forEach((element) => {
    element.className +=
      NUMERIC_BUTTON_STYLE_CLASS + NUMERIC_BUTTON_HOVER_STYLE_CLASS;
  });
};

const addOperatorButtonStyleClasses = (operatorButtonElements) => {
  operatorButtonElements?.forEach((element) => {
    element.className +=
      OPERATOR_BUTTON_STYLE_CLASS + OPERATOR_BUTTON_HOVER_STYLE_CLASS;
  });
};

const displayElement = getOneElement(getElementIdSelector(DISPLAY_ELEMENT_ID));

const expressionElement = getOneElement(
  getElementIdSelector(EXPRESSION_ELEMENT_ID)
);

const errorMessageElement = getOneElement(
  getElementIdSelector(ERROR_MESSAGE_ELEMENT_ID)
);

const operatorButtonElements = getAllElements(
  getElementClassSelector(OPERATOR_BUTTON_CLASS)
);

const numericButtonElements = getAllElements(
  getElementClassSelector(NUMERIC_BUTTON_CLASS)
);

addNumericButtonStyleClasses(numericButtonElements);
addOperatorButtonStyleClasses(operatorButtonElements);

let displayState = "0";
let expressionState = "";
let isOperatorSelected = false;

const OPERATORS = ["+", "-", "*", "/"];
const ERROR_DISPLAY = "Error";

const updateDisplay = () => {
  displayElement.textContent = displayState;
};

const updateExpression = () => {
  expressionElement.textContent = expressionState;
};

const showError = (message) => {
  displayState = ERROR_DISPLAY;
  updateDisplay();
  errorMessageElement.textContent = message;
  setTimeout(() => {
    errorMessageElement.textContent = "";
  }, CLEAR_ERROR_TIMEOUT);
};

const clearCalculator = () => {
  displayState = "0";
  expressionState = "";
  isOperatorSelected = false;
  updateDisplay();
  updateExpression();
};

const validateInput = (currentValue) => {
  if (currentValue.length > MAX_INPUT_LENGTH) {
    showError("Maximum input length exceeded");
    return false;
  }
  return true;
};

const calculateExpression = () => {
  try {
    const cleanExpression = expressionState.replace(/[+\-*/]$/, "");
    if (!cleanExpression) return "0";

    const result = eval(cleanExpression);

    if (!isFinite(result)) {
      throw new Error("Division by zero");
    }

    const formattedResult = Number(result.toFixed(8)).toString();
    if (formattedResult.length > MAX_INPUT_LENGTH) {
      throw new Error("Result too large");
    }

    return formattedResult;
  } catch (error) {
    throw new Error("Invalid expression");
  }
};

const handleNumericInput = (value) => {
  if (isOperatorSelected) {
    displayState = value;
    isOperatorSelected = false;
  } else {
    displayState = displayState === "0" ? value : displayState + value;
  }

  if (!validateInput(displayState)) return;

  expressionState += value;
  updateDisplay();
  updateExpression();
};

const handleOperatorInput = (operator) => {
  if (operator === "Clear") {
    clearCalculator();
    return;
  }

  if (operator === "Del") {
    if (displayState.length > 0 && !isOperatorSelected) {
      displayState = displayState.slice(0, -1) || "0";
      expressionState = expressionState.slice(0, -1) || "";
      updateDisplay();
      updateExpression();
    }
    return;
  }

  if (operator === "=") {
    try {
      const result = calculateExpression();
      displayState = result;
      expressionState = result;
      updateDisplay();
      updateExpression();
    } catch (error) {
      showError(error.message);
      clearCalculator();
    }
    return;
  }

  if (operator === "." && displayState.includes(".")) {
    showError("Invalid decimal point");
    return;
  }

  if (OPERATORS.includes(operator)) {
    if (isOperatorSelected) {
      expressionState = expressionState.slice(0, -1) + operator;
    } else {
      expressionState += operator;
      isOperatorSelected = true;
    }
    updateExpression();
  } else {
    handleNumericInput(operator);
  }
};

numericButtonElements.forEach((button) => {
  button.addEventListener("click", () => {
    handleNumericInput(button.textContent);
  });
});

operatorButtonElements.forEach((button) => {
  button.addEventListener("click", () => {
    handleOperatorInput(button.textContent);
  });
});

clearCalculator();
