window.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements AFTER DOM is loaded
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const linksContainer = document.getElementById("linksContainer");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const showSignup = document.getElementById("showSignup");
  const showLogin = document.getElementById("showLogin");
  const logoutContainer = document.getElementById("logoutContainer");

  const togglePassword = document.getElementById("togglePassword");
  const toggleNewPassword = document.getElementById("toggleNewPassword");

  const accountIcon = document.getElementById("accountIcon");
  const accountMenu = document.getElementById("accountMenu");
  const accountUserName = document.getElementById("accountUserName");
  const logoutButton = document.getElementById("logoutButton");

  // Function to toggle password visibility
  function togglePassVisibility(inputId, toggleBtn) {
    const input = document.getElementById(inputId);
    toggleBtn.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        toggleBtn.textContent = "🙈";
      } else {
        input.type = "password";
        toggleBtn.textContent = "👁️";
      }
    });
  }

  if (togglePassword) togglePassVisibility("password", togglePassword);
  if (toggleNewPassword) togglePassVisibility("new-password", toggleNewPassword);

  // Show signup form
  if (showSignup) {
    showSignup.addEventListener("click", () => {
      loginForm.style.display = "none";
      signupForm.style.display = "flex";
      linksContainer.style.display = "none";
      welcomeMessage.style.display = "none";
      logoutContainer.style.display = "none";
      accountMenu.style.display = "none";
    });
  }

  // Show login form
  if (showLogin) {
    showLogin.addEventListener("click", () => {
      signupForm.style.display = "none";
      loginForm.style.display = "flex";
      linksContainer.style.display = "none";
      welcomeMessage.style.display = "none";
      logoutContainer.style.display = "none";
      accountMenu.style.display = "none";
    });
  }

  // Signup handler
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const newId = document.getElementById("new-student-id").value.trim();
      const fullName = document.getElementById("full-name").value.trim();
      const email = document.getElementById("email").value.trim();
      const newPass = document.getElementById("new-password").value;

      if (!newId || !fullName || !email || !newPass) {
        alert("Please fill all fields.");
        return;
      }

      let users = JSON.parse(localStorage.getItem("marianUsers")) || {};

      if (users[newId]) {
        alert("User ID already exists.");
        return;
      }

      users[newId] = {
        fullName,
        email,
        password: newPass
      };

      localStorage.setItem("marianUsers", JSON.stringify(users));
      localStorage.setItem("loggedInUser", newId); // store session

      alert("Signup successful! Logged in as " + fullName);

      signupForm.reset();

      updateAccountIcon();

      // Show dashboard
      showDashboard(newId, fullName, true);
    });
  }

  // Login handler
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const id = document.getElementById("student-id").value.trim();
      const pass = document.getElementById("password").value;

      let users = JSON.parse(localStorage.getItem("marianUsers")) || {};

      if (Object.keys(users).length === 0) {
        welcomeMessage.textContent = "No users found. Please sign up first.";
        welcomeMessage.style.display = "block";
        welcomeMessage.style.color = "orange";
        return;
      }

      if (users[id] && users[id].password === pass) {
        localStorage.setItem("loggedInUser", id); // store session
        updateAccountIcon();
        showDashboard(id, users[id].fullName);
      } else {
        welcomeMessage.textContent = "Invalid student ID or password ❌";
        welcomeMessage.style.display = "block";
        welcomeMessage.style.color = "red";
        linksContainer.style.display = "none";
        logoutContainer.style.display = "none";
      }
    });
  }

  // Dashboard display
  function showDashboard(id, name, firstTime = false) {
    if (firstTime) {
      welcomeMessage.textContent = `Welcome, ${name}! Your account has been created 🎉`;
    } else {
      welcomeMessage.textContent = `Welcome back, ${name}! 🎉`;
    }
    welcomeMessage.style.display = "block";
    welcomeMessage.style.color = "green";

    loginForm.style.display = "none";
    signupForm.style.display = "none";
    linksContainer.style.display = "flex";
    logoutContainer.style.display = "block";
    accountMenu.style.display = "none";
  }

  // Logout button inside account menu
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      accountMenu.style.display = "none";
      updateAccountIcon();

      loginForm.style.display = "flex";
      signupForm.style.display = "none";
      linksContainer.style.display = "none";
      welcomeMessage.style.display = "none";
      logoutContainer.style.display = "none";

      loginForm.reset();
    });
  }

  // Forgot password click
  const forgotPassword = document.getElementById("forgotPassword");
  if (forgotPassword) {
    forgotPassword.addEventListener("click", () => {
      alert("Password reset feature coming soon!");
    });
  }

  // Account icon click toggles dropdown or login form
  if (accountIcon) {
    accountIcon.addEventListener("click", () => {
      const user = getCurrentUser();
      if (accountMenu.style.display === "block") {
        accountMenu.style.display = "none";
      } else {
        if (user) {
          accountUserName.textContent = user.fullName;
          accountMenu.style.display = "block";

          // Hide other forms/links
          loginForm.style.display = "none";
          signupForm.style.display = "none";
          linksContainer.style.display = "none";
          welcomeMessage.style.display = "none";
          logoutContainer.style.display = "none";
        } else {
          accountMenu.style.display = "none";
          loginForm.style.display = "flex";
          signupForm.style.display = "none";
          linksContainer.style.display = "none";
          welcomeMessage.style.display = "none";
          logoutContainer.style.display = "none";
        }
      }
    });
  }

  // Helper to get current logged in user info
  function getCurrentUser() {
    const sessionUser = localStorage.getItem("loggedInUser");
    const users = JSON.parse(localStorage.getItem("marianUsers")) || {};
    if (sessionUser && users[sessionUser]) {
      return { id: sessionUser, ...users[sessionUser] };
    }
    return null;
  }

  // Update account icon initials or icon
  function updateAccountIcon() {
    const user = getCurrentUser();
    if (user) {
      const names = user.fullName.trim().split(" ");
      let initials = "";
      if (names.length === 1) {
        initials = names[0][0].toUpperCase();
      } else {
        initials = (names[0][0] + names[1][0]).toUpperCase();
      }
      document.getElementById("accountInitials").textContent = initials;
    } else {
      document.getElementById("accountInitials").textContent = "👤";
    }
  }

  // On page load logic
  const sessionUser = localStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("marianUsers")) || {};

  if (sessionUser && users[sessionUser]) {
    showDashboard(sessionUser, users[sessionUser].fullName);
  } else {
    loginForm.style.display = "flex";
    signupForm.style.display = "none";
    linksContainer.style.display = "none";
    welcomeMessage.style.display = "none";
    logoutContainer.style.display = "none";
  }

  updateAccountIcon();
  accountMenu.style.display = "none";

  // Set year in footer if exists
  const yearElem = document.getElementById("year");
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
});
