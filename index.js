// Regular expression for basic email validation
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Modal and form elements
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");
const getStartedBtns = document.querySelectorAll("#get-started");
const loginSubmitBtn = document.getElementById('login-btn');
const signupSubmitBtn = document.getElementById('signup-btn');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Open modal when clicking "Login" or "Get Started"
getStartedBtns.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block"; // Show modal
    loginForm.style.display = "block"; // Show the login form by default
    signupForm.style.display = "none"; // Hide the sign-up form by default
  });
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none"; // Close modal
});

// Switch to sign-up form from login form
document.getElementById('switch-to-signup').addEventListener("click", () => {
  loginForm.style.display = "none";
  signupForm.style.display = "block";
});

// Switch to login form from sign-up form
document.getElementById('switch-to-login').addEventListener("click", () => {
  signupForm.style.display = "none";
  loginForm.style.display = "block";
});

// Handle login form submission
loginSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  const email = loginForm.querySelector("input[type='email']").value;
  const password = loginForm.querySelector("input[type='password']").value;
  
  // Check if email and password are provided
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }
  
  // Validate the email format
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  
  // If everything is valid, simulate login success
  window.location.href = "dashboard.html"; // Replace with your dashboard URL
});

// Handle sign-up form submission
signupSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  const username = signupForm.querySelector("input[type='text']").value;
  const email = signupForm.querySelector("input[type='email']").value;
  const password = signupForm.querySelector("input[type='password']").value;
  
  // Check if all fields are filled
  if (!username || !email || !password) {
    alert("Please fill out all fields.");
    return;
  }
  
  // Validate the email format
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  
  // If everything is valid, simulate sign-up success
  window.location.href = "dashboard.html"; // Replace with your dashboard URL
});

