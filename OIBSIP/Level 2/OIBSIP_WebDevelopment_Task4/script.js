function showMessage(msg, color = "black") {
  const box = document.getElementById("message");
  if (box) {
    box.innerText = msg;
    box.style.color = color;
  }
}

function register() {
  const user = document.getElementById("regUser").value.trim();
  const pass = document.getElementById("regPass").value.trim();

  if (!user || !pass) {
    showMessage("❌ Please fill both fields.", "red");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[user]) {
    showMessage("⚠️ Username already exists.", "orange");
    return;
  }

  users[user] = pass;
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("✅ Registered successfully!", "green");
}

function login() {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[user] === pass) {
    localStorage.setItem("loggedInUser", user);
    window.location.href = "secured.html";
  } else {
    showMessage("❌ Wrong username or password.", "red");
  }
}

function checkAccess() {
  const currentUser = localStorage.getItem("loggedInUser");

  if (!currentUser) {
    alert("Access denied. Please login first.");
    window.location.href = "login.html";
  } else {
    const welcome = document.getElementById("welcomeMsg");
    if (welcome) {
      welcome.innerText = `Welcome, ${currentUser}! You have access to this secured page.`;
    }
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
