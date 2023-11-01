// Swap Login and Register
const loginWrapper = document.getElementById("wrapper-login");
const registerWrapper = document.getElementById("wrapper-register");
const login = document.getElementById("login");
const register = document.getElementById("register");

login.addEventListener("click", () => {
  loginWrapper.style.display = "block";
  registerWrapper.style.display = "none";
});

register.addEventListener("click", () => {
  loginWrapper.style.display = "none";
  registerWrapper.style.display = "block";
});

const baseAPIUrl = "http://localhost:5000/api/auth/";
// Login Form
const login_form = document.getElementById("loginForm");
login_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username_login").value;
  const password = document.getElementById("password_login").value;
  try {
    fetch(baseAPIUrl + "login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      response.json().then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "/index.html";
        } else {
          alert(data.message);
        }
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

// Register form
const register_form = document.getElementById("registerForm");
register_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username_register").value;
  const password = document.getElementById("password_register").value;
  const role = document.getElementById("role").value;

  try {
    fetch(baseAPIUrl + "register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, role }),
    }).then((response) => {
      response.json().then((data) => {
        if (data.status == "error") {
          alert("status : error\nmessage : " + data.message);
        } else {
          alert("status : ok\nmessage : " + data.message);
          loginWrapper.style.display = "block";
          registerWrapper.style.display = "none";
        }
      });
    });
  } catch (error) {
    console.error("real fetch na Error:", error);
  }
});
