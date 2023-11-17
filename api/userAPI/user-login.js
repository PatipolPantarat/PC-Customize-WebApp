document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username_login").value;
    const password = document.getElementById("password_login").value;
    const userValidate = document.getElementById("username_login");
    const passValidate = document.getElementById("password_login");
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.status == "success") {
        localStorage.setItem("token", data.token);
        window.location.href = "/index.html";
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
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
