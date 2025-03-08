//contact form

document.getElementById('newslform').addEventListener('submit', function(event) {
    event.preventDefault();
    submitData();
  });
  
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