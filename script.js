let submitCount = 0;

function validateForm(event) {
  event.preventDefault();

  //Inputs

  let firstName = document.getElementById("first-name").value;
  let lastName = document.getElementById("last-name").value;
  let email = document.getElementById("contact-email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  //Errors

  let nameError = document.getElementById("name-error");
  let emailError = document.getElementById("emailError");
  let subjectError = document.getElementById("subjectError");
  let messageError = document.getElementById("messageError");

  let isValid = true;

  //Validate First name and Last name

  if (firstName === "") {
    nameError.textContent = "First Name is required";
    isValid = false;
  } else if (lastName === "") {
    nameError.textContent = "Last Name is required";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  // Validate Email Address

  if (email === "") {
    emailError.textContent = "Email Address is required";
    isValid = false;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Email format is not valid";
  } else {
    emailError.textContent = "";
  }
  //Validate Subject
  if (subject === "") {
    subjectError.textContent = "Subject is required";
    isValid = false;
  } else if (subject.length < 5) {
    subjectError.innerText = "Subject cannot be shorter than 5 characters";
    isValid = false;
  } else {
    subjectError.innerText = "";
  }

  //Validate Message

  if (message === "") {
    messageError.textContent = "A message is required";
    isValid = false;
  } else if (message.length < 20) {
    messageError.textContent =
      "The message cannot be shorter than 20 characters";
    isValid = false;
    console.log(message.length);
  } else{
    messageError.textContent="";
  }

  //Increase Submit Count
  if(isValid) {
    
submitCount++
document.getElementById('submitCount').innerText = submitCount;
console.log(submitCount);
  }
  return isValid;
}
//Validate Email Format
function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
