document.addEventListener("DOMContentLoaded", function () {
    const form_register = document.getElementById("form_register");

    form_register.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullname = document.getElementById("fullname").value;
        const phone_number = document.getElementById("phone_number").value;
        const address = document.getElementById("address").value;
        const gender = document.getElementById("gender").value;
        const birth_date = document.getElementById("birth_date").value;
        const analysis = document.getElementById("analysis").value;

        const errorElement = document.getElementById("error");
        if (errorElement) errorElement.textContent = "";

        if (!validateName(fullname)) {
            showError("Please enter your name properly.", form_register);
            return;
        }
        if (!validateNumber(phone_number)) {
            showError("Please enter a valid phone number.", form_register);
            return;
        }
        if (!validateAddress(address)) {
            showError("Please enter a valid address", form_register);
            return;
        }

        axios
            .post("/api/user/register", {
                fullname,
                phone_number,
                address,
                gender,
                birth_date,
                analysis,
            })
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
                        form_register
                    );
                } else {
                    showError(
                        "An error occurred. Please try again.",
                        form_register
                    );
                }
            });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const form_update = document.getElementById("form_update");
    const user_id = document.getElementById("user_id").value;
    console.log(user_id);
    form_update.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Hello form");
        const fullname = document.getElementById("fullname").value;
        const phone_number = document.getElementById("phone_number").value;
        const address = document.getElementById("address").value;
        const gender = document.getElementById("gender").value;
        const birth_date = document.getElementById("birth_date").value;
        const analysis = document.getElementById("analysis").value;
        const errorElement = document.getElementById("error");
        if (errorElement) errorElement.textContent = "";

        if (!validateName(fullname)) {
            showError("Please enter your name properly.", form_update);
            return;
        }
        if (!validateNumber(phone_number)) {
            showError("Please enter a valid phone number.", form_update);
            return;
        }
        if (!validateAddress(address)) {
            showError("Please enter a valid address", form_update);
            return;
        }

        axios
            .post(`/api/user/update/${user_id}`, {
                fullname,
                phone_number,
                address,
                gender,
                birth_date,
                analysis,
            })
            .then(function (res) {
                alert("User's data has been updated successfully");
                location.href = "/all-users";
            })
            .catch(function (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    showError(
                        error.response.data.errors
                            .map((error) => error.msg)
                            .join(" "),
                        form_update
                    );
                } else {
                    alert("User's data has been updated successfully");
                    location.href = "/all-users";
                }
            });
    });
});

function validateName(fullname) {
    const name_regEx = /^[a-zA-Z]{3,}( {1,2}[a-zA-Z]{3,}){0,}$/;
    return name_regEx.test(String(fullname));
}

function validateAddress(address) {
    const address_regEx = /^[a-zA-Z0-9\s\.,#\-]+$/;
    return address_regEx.test(String(address));
}

function validateNumber(phone_number) {
    const phone_regEx =
        /^\+998([- ])?(90|91|93|94|95|98|99|33|97|71)([- ])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/;
    return phone_regEx.test(phone_number);
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