
const savedDetails = sessionStorage.getItem("userDetails");

const bmiValue = document.getElementById("bmi-value");
const bmiCategory = document.getElementById("bmi-category");
const bmiFormula = document.getElementById("bmi-formula");

if (bmiValue && bmiCategory && bmiFormula) {
    if (!savedDetails) {
        bmiValue.textContent = "Please enter your details first.";
        bmiCategory.textContent = "";
        bmiFormula.textContent =
            "Return to the homepage and enter your measurements.";
    } else {
        const userDetails = JSON.parse(savedDetails);

        const heightM = userDetails.height / 100;
        const weightKg = userDetails.weight;

        if (
            !Number.isFinite(heightM) ||
            !Number.isFinite(weightKg) ||
            heightM <= 0 ||
            weightKg <= 0
        ) {
            bmiValue.textContent = "Invalid measurements.";
            bmiCategory.textContent = "";
            bmiFormula.textContent =
                "Please return and enter valid height and weight.";
        } else {
            const bmi = weightKg / (heightM * heightM);

            let category;

            if (bmi < 18.5) {
                category = "Underweight";
            } else if (bmi < 25) {
                category = "Healthy weight range";
            } else if (bmi < 30) {
                category = "Overweight";
            } else {
                category = "Obesity range";
            }

            bmiFormula.textContent =
                weightKg + " kg ÷ (" +
                heightM.toFixed(2) + " m × " +
                heightM.toFixed(2) + " m) = " +
                bmi.toFixed(1);

            bmiValue.textContent = bmi.toFixed(1);
            bmiCategory.textContent = "Category: " + category;
        }
    }
}
