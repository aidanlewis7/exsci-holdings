
const savedDetails = sessionStorage.getItem("userDetails");

const bmrValue = document.getElementById("bmr-value");
const tdeeValue = document.getElementById("tdee-value");
const energyFormula = document.getElementById("energy-formula");

if (bmrValue && tdeeValue && energyFormula) {
    if (!savedDetails) {
        bmrValue.textContent = "Please enter your details first.";
        tdeeValue.textContent = "No result available.";
        energyFormula.textContent =
            "Return to the homepage and enter your details.";
    } else {
        const userDetails = JSON.parse(savedDetails);

        const age = Number(userDetails.age);
        const sex = userDetails.sex;
        const height = Number(userDetails.height);
        const weight = Number(userDetails.weight);
        const activityLevel = userDetails.activityLevel;

        const activityMultipliers = {
            sedentary: 1.2,
            lightly_active: 1.375,
            moderately_active: 1.55,
            very_active: 1.725,
            extra_active: 1.9
        };

        const activityNames = {
            sedentary: "Sedentary",
            lightly_active: "Lightly active",
            moderately_active: "Moderately active",
            very_active: "Very active",
            extra_active: "Extra active"
        };

        const validDetails =
            Number.isFinite(age) &&
            Number.isFinite(height) &&
            Number.isFinite(weight) &&
            age > 0 &&
            height > 0 &&
            weight > 0;

        if (!validDetails) {
            bmrValue.textContent = "Invalid personal details.";
            tdeeValue.textContent = "Unable to calculate.";
            energyFormula.textContent =
                "Return to the homepage and check your entries.";
        } else if (sex !== "male" && sex !== "female") {
            bmrValue.textContent = "Sex selection required.";
            tdeeValue.textContent = "Unable to calculate.";
            energyFormula.textContent =
                "Select a supported equation option on the homepage.";
        } else {
            const sexConstant = sex === "male" ? 5 : -161;

            const bmr =
                (10 * weight) +
                (6.25 * height) -
                (5 * age) +
                sexConstant;

            const multiplier = activityMultipliers[activityLevel];

            if (!multiplier) {
                bmrValue.textContent =
                    Math.round(bmr) + " kcal/day";
                tdeeValue.textContent =
                    "Activity level not recognised.";
                energyFormula.textContent =
                    "Please return to the homepage and select an activity level.";
            } else {
                const tdee = bmr * multiplier;

                bmrValue.textContent =
                    Math.round(bmr) + " kcal/day";

                tdeeValue.textContent =
                    Math.round(tdee) + " kcal/day";

                energyFormula.textContent =
                    "Mifflin–St Jeor: (10 × " + weight +
                    ") + (6.25 × " + height +
                    ") − (5 × " + age +
                    ") " + (sex === "male" ? "+ 5" : "− 161") +
                    " = " + Math.round(bmr) + " kcal/day. " +
                    "Estimated TDEE = " + Math.round(bmr) +
                    " × " + multiplier + " (" +
                    activityNames[activityLevel] + ") = " +
                    Math.round(tdee) + " kcal/day.";
            }
        }
    }
}
