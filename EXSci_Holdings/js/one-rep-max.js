const oneRepMaxForm = document.getElementById("one-rep-max-form");

if (oneRepMaxForm) {
    oneRepMaxForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const weightInput = document.getElementById("lift-weight");
        const repsInput = document.getElementById("repetitions");

        const weight = Number(weightInput.value);
        const reps = Number(repsInput.value);

        const resultsSection = document.getElementById("one-rep-max-results");
        const resultValue = document.getElementById("one-rep-max-value");
        const resultFormula = document.getElementById("one-rep-max-formula");

        if (
            !Number.isFinite(weight) ||
            !Number.isInteger(reps) ||
            weight <= 0 ||
            reps < 1 ||
            reps > 10
        ) {
            alert("Enter a valid weight and between 1 and 10 repetitions.");
            return;
        }

        // Epley equation
        const oneRepMax = weight * (1 + reps / 30);

        resultValue.textContent = oneRepMax.toFixed(1) + " kg";

        resultFormula.textContent =
            weight + " kg × (1 + " + reps + " ÷ 30) = " +
            oneRepMax.toFixed(1) + " kg";

        resultsSection.hidden = false;

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}
