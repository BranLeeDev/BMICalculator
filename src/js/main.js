import "../css/index.css";

const valuesAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const inputsText = document.querySelectorAll('input[type="text"]');
const inputsRadio = document.querySelectorAll('input[type="radio"]');
const resultBMI = document.getElementById("result-bmi");
const formMetric = document.getElementById("form-metric");
const formImperial = document.getElementById("form-imperial");

// check if it is a number
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
        bmiResetResult();
        return;
      }

      standardInputTextContent(currentValue, 4, e);

      // Verify that both input has a value
      if (inputsText[0].value && inputsText[1].value) {
        const measures = {
          kg: +inputsText[1].value,
          cm: +inputsText[0].value,
        };
        const BMI = bmiCalculator("Metric", measures);
        const weightRange = calculateWeightRange("Metric", measures);
        const isValidMeasures =
          measures.cm >= 280 ||
          measures.kg >= 600 ||
          measures.cm <= 50 ||
          measures.kg <= 20;
        if (isValidMeasures) return;

        printResultBmi(BMI);

        messageForEveryBmiResult(BMI, weightRange);

        return;
      }
    });
  }
}

function printResultBmi(BMI) {
  resultBMI.classList.remove("gap-4");
  resultBMI.classList.add("gap-6");
  resultBMI.firstElementChild.firstElementChild.textContent = "Your BMI is...";
  resultBMI.firstElementChild.firstElementChild.classList.remove("text-2xl");
  resultBMI.firstElementChild.firstElementChild.classList.add("text-base");
  resultBMI.firstElementChild.lastElementChild.textContent = BMI;
}

function standardInputTextContent(currentValue, lengthInput, event) {
  if (!isNumber(currentValue)) {
    const previosValue = currentValue.at(-2);

    // Check if it the previos value is
    if (!previosValue) {
      event.target.value = "";
      return;
    }

    const lastValue = currentValue.at(-1);
    if (!isNumber(lastValue)) {
      const result = event.target.value.split("");
      const index = result.findIndex((item) => item === lastValue);
      event.target.value = result.splice(0, index).join("");
    }
    return;
  }

  if (currentValue.split("").length >= lengthInput) {
    const result = e.target.value.split("");
    event.target.value = result.slice(0, -1).join("");
    return;
  }
}

function bmiResetResult() {
  resultBMI.classList.remove("gap-6");
  resultBMI.classList.add("gap-4");
  resultBMI.firstElementChild.firstElementChild.textContent = "Welcome!";
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

function bmiCalculator(system, measures) {
  if (system === "Imperial") {
    const totalHeightIn = measures.ft * 12 + measures.in;
    const heightCm = totalHeightIn * 2.54;
    const weightKg = measures.st * 6.35029 + measures.lbs * 0.453592;
    const BMI = (weightKg / (heightCm * 0.0254) ** 2).toFixed(1);
    return BMI;
  } else {
    const BMI = (measures.kg / (measures.cm / 100) ** 2).toFixed(1);
    return BMI;
  }
}

function calculateWeightRange(system, measures) {
  if (system === "Imperial") {
    const totalHeightIn = measures.ft * 12 + measures.in;
    const weightLbsMin = 100 + (5 * totalHeightIn - 600) * 0.115;
    const weightLbsMax = 106 + (6 * totalHeightIn - 600) * 0.115;
    const weightStMin = weightLbsMin / 14;
    const weightStMax = weightLbsMax / 14;
    const lowerLimit = `${weightStMin.toFixed(0)}st ${weightLbsMin.toFixed(
      0
    )}lbs`;
    const maximumLimit = `${weightStMax.toFixed(0)}st ${weightLbsMax.toFixed(
      0
    )}lbs`;
    const weightRange = `${lowerLimit} - ${maximumLimit}`;
    return weightRange;
  } else {
    const lowerLimit = (
      measures.cm -
      100 -
      (measures.cm - 150) / 2.5 -
      7.7
    ).toFixed(1);
    const maximumLimit = (
      measures.cm -
      100 -
      (measures.cm - 150) / 4 +
      8.9
    ).toFixed(1);
    const weightRange = `${lowerLimit}kgs - ${maximumLimit}kgs.`;
    return weightRange;
  }
}

function messageForEveryBmiResult(BMI, weightRange) {
  const spanWeightRange = document.createElement("span");

  switch (true) {
    case BMI < 18.5:
      resultBMI.lastElementChild.textContent =
        "Your BMI suggests you are underweight. Your ideal weight may be higher, ideally between ";
      spanWeightRange.textContent = weightRange;
      resultBMI.lastElementChild.appendChild(spanWeightRange);
      resultBMI.lastElementChild.firstElementChild.classList.add(
        "font-semibold"
      );
      break;
    case BMI >= 18.5 && BMI < 24.9:
      resultBMI.lastElementChild.textContent =
        "Your BMI suggests you’re a healthy weight. Your ideal weight is between ";
      spanWeightRange.textContent = weightRange;
      resultBMI.lastElementChild.appendChild(spanWeightRange);
      resultBMI.lastElementChild.firstElementChild.classList.add(
        "font-semibold"
      );
      break;
    case BMI >= 24.9 && BMI < 29.9:
      resultBMI.lastElementChild.textContent =
        "Your BMI suggests you are overweight. Your ideal weight may be lower, ideally between ";
      spanWeightRange.textContent = weightRange;
      resultBMI.lastElementChild.appendChild(spanWeightRange);
      resultBMI.lastElementChild.firstElementChild.classList.add(
        "font-semibold"
      );
      break;
    case BMI >= 30:
      resultBMI.lastElementChild.textContent =
        "Your BMI suggests you are obese. Your ideal weight may be lower, ideally between ";
      spanWeightRange.textContent = weightRange;
      resultBMI.lastElementChild.appendChild(spanWeightRange);
      resultBMI.lastElementChild.firstElementChild.classList.add(
        "font-semibold"
      );
  }
}

function changeSystemMeasure() {
  inputsRadio.forEach((input) => {
    input.addEventListener("input", (e) => {
      const currentValue = e.target.value;
      if (currentValue === "Imperial") {
        formMetric.classList.add("-translate-x-full", "opacity-0");
        formImperial.classList.remove("opacity-0", "translate-x-full");
        formImperial.classList.add("opacity-100");

        bmiResetResult();
      } else {
        formMetric.classList.remove("-translate-x-full", "opacity-0");
        formMetric.classList.add("translate-x-0", "opacity-100");
        formImperial.classList.add("translate-x-full", "opacity-0");

        bmiResetResult();
      }
    });
  });
}

function main() {
  validateInputContent();
  changeSystemMeasure();
}

window.addEventListener("load", main);
