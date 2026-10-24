
const detailsForm = document.getElementById("details-form");

if (detailsForm) {
    detailsForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const userDetails = {
            age: Number(document.getElementById("age").value),
            sex: document.getElementById("sex").value,
            height: Number(document.getElementById("height").value),
            weight: Number(document.getElementById("weight").value),
            restingHeartRate:
                document.getElementById("resting-heart-rate").value,
            activityLevel:
                document.getElementById("activity-level").value
        };

        if (
            !userDetails.age ||
            !userDetails.height ||
            !userDetails.weight ||
            !userDetails.sex ||
            !userDetails.activityLevel
        ) {
            alert("Please complete all required fields.");
            return;
        }

        sessionStorage.setItem(
            "userDetails",
            JSON.stringify(userDetails)
        );

        window.location.href = "calculators.html";
    });
}
