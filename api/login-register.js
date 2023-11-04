document.addEventListener("DOMContentLoaded", () => {
  const baseAPIUrl = "http://localhost:5000/api/auth/";

  // Login Form
  const login_form = document.getElementById("loginForm");
  login_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username_login").value;
    const password = document.getElementById("password_login").value;

    const userValidate = document.getElementById("username_login");
    const passValidate = document.getElementById("password_login");

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
            window.location.href = "/Management/index.html";
            userValidate.classList.remove("is-invalid");
            passValidate.classList.remove("is-invalid");
          } else if (
            data.status == "user_error" ||
            data.status == "user_not_found"
          ) {
            userValidate.classList.add("is-invalid");
            alert("status : error\nmessage : " + data.message);
          } else if (data.status == "password_error") {
            userValidate.classList.remove("is-invalid");
            passValidate.classList.add("is-invalid");
          } else if (data.status == "user_not_allow") {
            alert("status : error\nmessage : " + data.message);
          }
        });
      });
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // Register form
  // const register_form = document.getElementById("registerForm");
  // register_form.addEventListener("submit", async (e) => {
  //   e.preventDefault();
  //   const username = document.getElementById("username_register").value;
  //   const password = document.getElementById("password_register").value;
  //   const role = document.getElementById("role").value;

  //   try {
  //     fetch(baseAPIUrl + "register/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password, role }),
  //     }).then((response) => {
  //       response.json().then((data) => {
  //         if (data.status == "error") {
  //           alert("status : error\nmessage : " + data.message);
  //         } else {
  //           alert("status : ok\nmessage : " + data.message);
  //           loginWrapper.style.display = "block";
  //           registerWrapper.style.display = "none";
  //         }
  //       });
  //     });
  //   } catch (error) {
  //     console.error("real fetch na Error:", error);
  //   }
  // });
});
