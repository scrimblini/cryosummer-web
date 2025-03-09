//contact form

document.addEventListener("DOMContentLoaded", function () {
  const positiveRadio = document.getElementById("positive");
  const negativeRadio = document.getElementById("negative");
  const checkboxSection = document.getElementById("checkboxSection");
  const subjectInput = document.getElementById("subject");

  //positive radio hides checkboxes while negative radio unhides them. both affect the subject input
  function updateForm() {
      if (positiveRadio.checked) {
          checkboxSection.style.display = "none";
          subjectInput.value = "Positive Feedback";
      } else if (negativeRadio.checked) {
          checkboxSection.style.display = "block";
          subjectInput.value = "Negative Feedback";
      }
  }

  // Run on page load (to set initial state)
  updateForm();

  positiveRadio.addEventListener("change", updateForm);
  negativeRadio.addEventListener("change", updateForm);
});


//prevents default event of submit button
document.getElementById('formthing').addEventListener('submit', function(event) {
    event.preventDefault();
    submitData();
  });
  
  //and validates the input
  function submitData() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!name || !email || !emailPattern.test(email)) {
      document.getElementById("popupWindow").style.display = "flex";
      document.getElementById("windowTitl").innerText = 'Error';
      document.getElementById("windowP").innerText = 'Please enter the corresponding data in the required fields.';
    } else {
      console.log("Form submitted");
      document.getElementById("popupWindow").style.display = "flex";
      document.getElementById("windowTitl").innerText = 'Success!';
      document.getElementById("windowP").innerText = 'The data was submitted successfully.';
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    }
  }
  
  function closeWindow() {
    document.getElementById("windowTitl").innerText = '';
    document.getElementById("windowP").innerText = '';
    document.getElementById("popupWindow").style.display = "none";
  }