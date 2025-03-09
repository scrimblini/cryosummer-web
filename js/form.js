//contact form
//contact form

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formthing");
    const positiveRadio = document.getElementById("positive");
    const negativeRadio = document.getElementById("negative");
    const messageField = document.getElementById("message");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const checkboxInputs = document.querySelectorAll("input[name='issues[]']");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let valid = true;
      let errorMessage = "";

      if (nameField.value.trim() === "") {
          valid = false;
          errorMessage += "&times; Name is required.<br>";
      }

      if (!validateEmail(emailField.value)) {
          valid = false;
          errorMessage += "&times; Please enter a valid email address.<br>";
      }

      if (messageField.value.trim() === "") {
          valid = false;
          errorMessage += "&times; Message is required.<br>";
      }

      if (negativeRadio.checked) {
          const checkedIssues = Array.from(checkboxInputs).filter(input => input.checked);
          if (checkedIssues.length === 0) {
              valid = false;
              errorMessage += "&times; Please select at least one issue for Negative Feedback.<br>";
          }
      }

      if (valid) {
          subjectInput.value = positiveRadio.checked ? "Positive Feedback" : "Negative Feedback";

          form.submit();
      } else {
          showPopup(errorMessage);
      }
  });


  function validateEmail(email) {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
  }


  function showPopup(message) {
      const popup = document.getElementById("popupWindow");
      const windowP = document.getElementById("windowP");

      windowP.innerHTML = message;
      popup.style.display = "flex";
  }


  function updateForm() {
    if (positiveRadio.checked) {
        checkboxSection.style.display = "none";
        subjectInput.value = "Positive Feedback";
    } else if (negativeRadio.checked) {
        checkboxSection.style.display = "block";
        subjectInput.value = "Negative Feedback";
    }
}

updateForm();

positiveRadio.addEventListener("change", updateForm);
negativeRadio.addEventListener("change", updateForm);
});

function closeWindow() {
  const popup = document.getElementById("popupWindow");
  popup.style.display = "none";
}

