document.addEventListener("DOMContentLoaded", function () {
    const lengthInput = document.getElementById("length");
    const widthInput = document.getElementById("width");
    const calculateButton = document.getElementById("calculate");
    const resultElement = document.getElementById("result");

    calculateButton.addEventListener("click", function () {
        const length = parseFloat(lengthInput.value);
        const width = parseFloat(widthInput.value);

        if (isNaN(length) || isNaN(width)) {
            resultElement.textContent = "Please enter valid numbers.";
        } else {
            const rectangleArea = length * width;
            const triangleArea = (length * width) / 2;

            resultElement.textContent = `Area of Rectangle: ${rectangleArea}, Area of Triangle: ${triangleArea}`;
        }
    });
});
