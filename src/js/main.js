import "../css/index.css";

const valuesAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const inputsText = document.querySelectorAll('input[type="text"]');
const isNumber = (value) => {
  return valuesAllowed.some((number) => number.includes(value.at(-1)));
};

function validateInputContent() {
  inputsText.forEach(inputTypeText);

  function inputTypeText(input) {
    input.addEventListener("input", (e) => {
      const currentValue = e.target.value;

      if (!isNumber(currentValue)) {
        const previosValue = currentValue.at(-2);
        if (!previosValue) {
          e.target.value = "";
          return;
        }

        const lastValue = currentValue.at(-1);
        if (!isNumber(lastValue)) {
          const result = e.target.value.split("");
          const index = result.findIndex((item) => item === lastValue);
          e.target.value = result.splice(0, index).join("");
        }
        return;
      }

      if (currentValue.split("").length >= 4) {
        const result = e.target.value.split("");
        e.target.value = result.slice(0, -1).join("");
      }
    });
  }
}

function main() {
  validateInputContent();
}

window.addEventListener("load", main);
