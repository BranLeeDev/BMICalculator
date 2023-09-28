import "../css/index.css";

const valuesAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const inputsText = document.querySelectorAll('input[type="text"]');
const inputsRadio = document.querySelectorAll('input[type="radio"]');
const resultBMI = document.getElementById("result-bmi");
const formMetric = document.getElementById("form-metric");
const formImperial = document.getElementById("form-imperial");

const isNumber = (value) => {
  return valuesAllowed.some((number) => number.includes(value.at(-1)));
};

function validateInputContent() {
  inputsText.forEach(inputTypeText);

  function inputTypeText(input) {
    input.addEventListener("input", (e) => {
      const currentValue = e.target.value;

      // Resets both inputs has if it has value
      if (!inputsText[0].value && !inputsText[1].value) {
        resultBMI.classList.remove("gap-6");
        resultBMI.classList.add("gap-4");
        resultBMI.firstElementChild.firstElementChild.textContent = "Welcome";
        resultBMI.firstElementChild.firstElementChild.classList.remove("text-base");
        resultBMI.firstElementChild.firstElementChild.classList.add("text-2xl");
        resultBMI.firstElementChild.lastElementChild.textContent = "";

        resultBMI.lastElementChild.textContent =
          "Enter your height and weight and you'll see your BMI result here";
        const spanWeightRange = document.createElement("span");
        spanWeightRange.textContent = "";
        resultBMI.lastElementChild.appendChild(spanWeightRange);
        return;
      }

      // Verify that the input is a number
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

      // Verify that the value of both inputs is not greater than four digits
      if (currentValue.split("").length >= 4) {
        const result = e.target.value.split("");
        e.target.value = result.slice(0, -1).join("");
        return;
      }

      // Verify that both input has a value
      if (inputsText[0].value && inputsText[1].value) {
        const height = +inputsText[0].value / 100;
        const weight = +inputsText[1].value;
        const BMI = (weight / height ** 2).toFixed(1);
        const weightRange = `${(height * 100 - 100 - (height * 100 - 150) / 2.5 - 7.7).toFixed(
          1
        )}kgs - ${(height * 100 - 100 - (height * 100 - 150) / 4 + 8.9).toFixed(1)}kgs.`;
        if (height >= 2.8 || weight >= 600 || height <= 0.5 || weight <= 20) return;
        resultBMI.classList.remove("gap-4");
        resultBMI.classList.add("gap-6");
        resultBMI.firstElementChild.firstElementChild.textContent = "Your BMI is...";
        resultBMI.firstElementChild.firstElementChild.classList.remove("text-2xl");
        resultBMI.firstElementChild.firstElementChild.classList.add("text-base");
        resultBMI.firstElementChild.lastElementChild.textContent = BMI;

        const spanWeightRange = document.createElement("span");

        switch (true) {
          case BMI < 18.5:
            resultBMI.lastElementChild.textContent =
              "Your BMI suggests you are underweight. Your ideal weight may be higher, ideally between ";
            spanWeightRange.textContent = weightRange;
            resultBMI.lastElementChild.appendChild(spanWeightRange);
            resultBMI.lastElementChild.firstElementChild.classList.add("font-semibold");
            break;
          case BMI >= 18.5 && BMI < 24.9:
            resultBMI.lastElementChild.textContent =
              "Your BMI suggests you’re a healthy weight. Your ideal weight is between ";
            spanWeightRange.textContent = weightRange;
            resultBMI.lastElementChild.appendChild(spanWeightRange);
            resultBMI.lastElementChild.firstElementChild.classList.add("font-semibold");
            break;
          case BMI >= 24.9 && BMI < 29.9:
            resultBMI.lastElementChild.textContent =
              "Your BMI suggests you are overweight. Your ideal weight may be lower, ideally between ";
            spanWeightRange.textContent = weightRange;
            resultBMI.lastElementChild.appendChild(spanWeightRange);
            resultBMI.lastElementChild.firstElementChild.classList.add("font-semibold");
            break;
          case BMI >= 30:
            resultBMI.lastElementChild.textContent =
              "Your BMI suggests you are obese. Your ideal weight may be lower, ideally between ";
            spanWeightRange.textContent = weightRange;
            resultBMI.lastElementChild.appendChild(spanWeightRange);
            resultBMI.lastElementChild.firstElementChild.classList.add("font-semibold");
        }
        return;
      }
    });
  }
}

function whatSystemMeasure() {
  inputsRadio.forEach((input) => {
    input.addEventListener("input", (e) => {
      const currentValue = e.target.value;
      if (currentValue === "Imperial") {
        formMetric.classList.add("-translate-x-full", "opacity-0");
        formImperial.classList.remove("opacity-0", "translate-x-full");
        formImperial.classList.add("opacity-100");
      } else {
        formMetric.classList.remove("-translate-x-full", "opacity-0");
        formMetric.classList.add("translate-x-0", "opacity-100");
        formImperial.classList.add("translate-x-full", "opacity-0");
      }
    });
  });
}

function main() {
  validateInputContent();
  whatSystemMeasure();
}

window.addEventListener("load", main);
