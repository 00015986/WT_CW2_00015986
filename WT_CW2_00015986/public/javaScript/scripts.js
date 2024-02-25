document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const errorElement = document.getElementById("error");
        if (errorElement) errorElement.textContent = "";

        const fullname = document.getElementById("fullname").value;
        const phone_number = document.getElementById("phone_number").value;
        const address = document.getElementById("address").value;
        const gender = document.getElementById("gender").value;
        const birth_date = document.getElementById("birth_date").value;
        const analysis = document.getElementById("analysis").value;

        if (!validateName(fullname)) {
            showError("Please enter your name properly.", form)
            return
        }
        if (!validateNumber(phone_number)) {
            showError("Please enter a valid phone number.", form);
            return;
        }
        if (!validateAddress(address)) {
            showError("Please enter a valid address", form);
            return;
        }
        if (!validateAnalysis(analysis)) {
            showError("Please enter your analysis", form);
            return;
        }

        axios
            .post("/api/user/register", { fullname, phone_number, address, gender, birth_date, analysis })
            .then(function (response) {
                alert("User has been successfully added");
                location.href = "/all-users";
            })
            .catch(function (error) {
                if (error.response && error.response.data) {
                    showError(
                        error.response.data.errors
                            .map((error) => error.msg)
                            .join(" "),
                        form
                    );
                } else {
                    showError("An error occurred. Please try again.", form);
                }
            });
    });
});

function validateName(fullname) {
    const name_regEx = /^[a-zA-Z]{3,}( {1,2}[a-zA-Z]{3,}){0,}$/
    return name_regEx.test(String(fullname))
}

function validateAddress(address) {
    const address_regEx = /^[a-zA-Z0-9\s\.,#\-]+$/
    return address_regEx.test(String(address))
}

function validateNumber(phone_number) {
    const phone_regEx = /^\+998([- ])?(90|91|93|94|95|98|99|33|97|71)([- ])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/;
    return phone_regEx.test(phone_number);
}
function validateAnalysis(analysis) {
    const analysis_regEx = /^(?=\s*\S)(.{4,})$/
    return analysis_regEx.test(String(analysis))
}

function showError(message, form) {
    let errorElement = document.getElementById("error");
    if (!errorElement) {
        errorElement = document.createElement("div");
        errorElement.id = "error";
        errorElement.style.color = "red";
    }
    errorElement.textContent = message;
}
