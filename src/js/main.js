import "../css/index.css";

const valuesAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const inputsText = document.querySelectorAll('input[type="text"]');
const inputsRadio = document.querySelectorAll('input[type="radio"]');
const resultBMI = document.getElementById("result-bmi");
const formMetric = document.getElementById("form-metric");
const formImperial = document.getElementById("form-imperial");

let whatSystemNow = "Metric";

// check if it is a number
const isNumber = (value) => {
  return valuesAllowed.some((number) => number.includes(value.at(-1)));
};

function validateInputContent() {
  inputsText.forEach((input) => {
    input.addEventListener("input", (e) => {
      const currentValue = e.currentTarget.value;

      if (!inputsText[0].value && !inputsText[1].value) {
        bmiResetResult();
      }

      standardInputTextContent(currentValue, 4, e);

      if (
        inputsText[0].value &&
        inputsText[1].value &&
        whatSystemNow === "Metric"
      ) {
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
      }

      if (
        inputsText[2].value &&
        inputsText[3].value &&
        inputsText[4].value &&
        inputsText[5].value &&
        whatSystemNow === "Imperial"
      ) {
        const measures = {
          ft: +inputsText[2].value,
          in: +inputsText[3].value,
          st: +inputsText[4].value,
          lbs: +inputsText[5].value,
        };
        const BMI = bmiCalculator("Imperial", measures);
        const weightRange = calculateWeightRange("Imperial", measures);
        if (
          measures.in >= 40 ||
          measures.st >= 90 ||
          measures.lbs >= 250 ||
          measures.st <= 3
        )
          return;

        printResultBmi(BMI);

        messageForEveryBmiResult(BMI, weightRange);
      }
    });
  });
}

function bmiResultController(system) {
  if (system === "Metric") {
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
    } else {
      bmiResetResult();
    }
  }

  if (system === "Imperial") {
    if (
      inputsText[2].value &&
      inputsText[3].value &&
      inputsText[4].value &&
      inputsText[5].value
    ) {
      const measures = {
        ft: +inputsText[2].value,
        in: +inputsText[3].value,
        st: +inputsText[4].value,
        lbs: +inputsText[5].value,
      };
      const BMI = bmiCalculator("Imperial", measures);
      const weightRange = calculateWeightRange("Imperial", measures);
      if (
        measures.in >= 40 ||
        measures.st >= 90 ||
        measures.lbs >= 250 ||
        measures.st <= 3
      )
        return;

      printResultBmi(BMI);

      messageForEveryBmiResult(BMI, weightRange);
    } else {
      bmiResetResult();
    }
  }
}

function printResultBmi(BMI) {
  resultBMI.classList.remove("gap-4");
  resultBMI.classList.add("gap-6", "md:grid", "md:grid-cols-2");
  resultBMI.firstElementChild.firstElementChild.textContent = "Your BMI is...";
  resultBMI.firstElementChild.firstElementChild.classList.remove(
    "text-2xl",
    "2xl:text-4xl"
  );
  resultBMI.firstElementChild.firstElementChild.classList.add(
    "text-base",
    "2xl:text-lg"
  );
  resultBMI.firstElementChild.lastElementChild.textContent = BMI;
  resultBMI.lastElementChild.classList.toggle("md:max-w-[17rem]");
}

function standardInputTextContent(currentValue, lengthInput, event) {
  if (!isNumber(currentValue)) {
    const previosValue = currentValue.at(-2);

    // Check if it the previos value is
    if (!previosValue) {
      event.currentTarget.value = "";
      return;
    }

    const lastValue = currentValue.at(-1);
    if (!isNumber(lastValue)) {
      const result = event.currentTarget.value.split("");
      const index = result.findIndex((item) => item === lastValue);
      event.currentTarget.value = result.splice(0, index).join("");
    }
    return;
  }

  minLengthCustomizer(event, 2, 2);

  minLengthCustomizer(event, 4, 3);

  minLengthCustomizer(event, 3, 3);

  if (currentValue.split("").length >= lengthInput) {
    const result = event.currentTarget.value.split("");
    event.currentTarget.value = result.slice(0, -1).join("");
    return;
  }
}

function minLengthCustomizer(event, index, lengthInput) {
  if (inputsText[index].value.split("").length >= lengthInput) {
    const result = event.currentTarget.value.split("");
    event.currentTarget.value = result.slice(0, -1).join("");
    return;
  }
}

function bmiResetResult() {
  resultBMI.classList.remove("gap-6");
  resultBMI.classList.remove("md:grid-cols-2");
  resultBMI.classList.add("gap-4");
  resultBMI.firstElementChild.firstElementChild.textContent = "Welcome!";
  resultBMI.firstElementChild.firstElementChild.classList.remove(
    "text-base",
    "2xl:text-lg"
  );
  resultBMI.firstElementChild.firstElementChild.classList.add(
    "text-2xl",
    "2xl:text-4xl"
  );
  resultBMI.firstElementChild.lastElementChild.textContent = "";
  resultBMI.lastElementChild.classList.remove("md:max-w-[17rem]");

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
    const weightKg = measures.st * 6.35029 + measures.lbs * 0.453592;
    const heightM = totalHeightIn * 0.0254;
    const BMI = (weightKg / heightM ** 2).toFixed(1);
    return BMI;
  } else {
    const BMI = (measures.kg / (measures.cm / 100) ** 2).toFixed(1);
    return BMI;
  }
}

function calculateWeightRange(system, measures) {
  if (system === "Imperial") {
    const heightTotal = measures.ft * 12 + measures.in;
    const minWeight =
      Math.round(((18.5 * (heightTotal / 39.37) ** 2) / 0.45359237) * 10) / 10;
    const maxWeight =
      Math.round(((24.9 * (heightTotal / 39.37) ** 2) / 0.45359237) * 10) / 10;
    const minSt = Math.floor(minWeight / 14);
    const minLb = Math.floor((minWeight % 14) * 10) / 10;
    const maxSt = Math.floor(maxWeight / 14);
    const maxLb = Math.floor((maxWeight % 14) * 10) / 10;
    const lowerLimit = `${minSt}st ${minLb.toFixed(0) - 1}lbs`;
    const upperLimit = `${maxSt}st ${maxLb.toFixed(0) - 1}lbs`;
    const weightRange = `${lowerLimit} - ${upperLimit}`;
    return weightRange;
  } else {
    const lowerLimit = (
      measures.cm -
      100 -
      (measures.cm - 150) / 2.5 -
      7.7
    ).toFixed(1);
    const upperLimit = (
      measures.cm -
      100 -
      (measures.cm - 150) / 4 +
      8.9
    ).toFixed(1);
    const weightRange = `${lowerLimit}kgs - ${upperLimit}kgs.`;
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
        formMetric.classList.add("md:hidden");
        formImperial.classList.add("opacity-100");
        formImperial.classList.add("md:relative");
        formImperial.classList.add("md:top-0");
        formImperial.classList.remove("opacity-0", "translate-x-full");
        formImperial.classList.remove("md:hidden");

        inputsText.forEach((input, index) => {
          input.setAttribute("tabindex", index + 1);
        });

        bmiResultController("Imperial");
        whatSystemNow = "Imperial";
      } else {
        formMetric.classList.remove("-translate-x-full", "opacity-0");
        formMetric.classList.add("translate-x-0", "opacity-100");
        formMetric.classList.remove("md:hidden");
        formImperial.classList.add("md:hidden");
        formImperial.classList.add("translate-x-full", "opacity-0");

        inputsText.forEach((input, index) => {
          if (index >= 2) {
            input.setAttribute("tabindex", -1);
            return;
          }
          input.setAttribute("tabindex", index + 1);
        });

        bmiResultController("Metric");
        whatSystemNow = "Metric";
      }
    });
  });
}

function main() {
  validateInputContent();
  changeSystemMeasure();
}

window.addEventListener("load", main);
