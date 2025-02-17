const NUMERIC_BUTTONS_CLASS = "numeric-buttons";
const OPERATORS_CLASS = "operator";

const NUMERIC_BUTTON_STYLE_CLASS =
  "w-18 h-18 bg-[#3B4252] text-[#EBDBB2] border-4 border-[#4C566A] shadow-[4px_4px_0px_0px_rgba(76,86,106,0.5)] font-bold text-xl flex items-center justify-center ";
const NUMERIC_BUTTON_HOVER_STYLE_CLASS =
  "hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all hover:bg-[#434C5E]";

const OPERATOR_BUTTON_STYLE_CLASS =
  "w-18 h-18 bg-[#2E3440] text-[#FE8019] p-2 border-4 border-[#D08770] shadow-[4px_4px_0px_0px_rgba(208,135,112,0.5)]";
const OPERATOR_BUTTON_HOVER_STYLE_CLASS =
  "hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all font-bold text-xl flex items-center justify-center hover:bg-[#3B4252]";

const getClass = (className) => `.${className}`;

const numericButtons = document.querySelectorAll(
  getClass(NUMERIC_BUTTONS_CLASS)
);

const operatorClass = document.querySelectorAll(getClass(OPERATORS_CLASS));

operatorClass?.forEach(
  (element) =>
    (element.classList +=
      OPERATOR_BUTTON_STYLE_CLASS + OPERATOR_BUTTON_HOVER_STYLE_CLASS)
);

numericButtons?.forEach(
  (element) =>
    (element.classList +=
      NUMERIC_BUTTON_STYLE_CLASS + NUMERIC_BUTTON_HOVER_STYLE_CLASS)
);
