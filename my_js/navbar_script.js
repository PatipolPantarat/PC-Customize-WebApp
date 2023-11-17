document.addEventListener("DOMContentLoaded", () => {
  // check jwt token
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/userLogin.html";
  }
  const authenticationWithAPI = async () => {
    const response = await fetch(
      "http://localhost:5000/api/user/authenticate",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (data.status == "ok") {
      document.getElementById("showAccount").textContent = data.message;
    } else {
      localStorage.removeItem("token");
      window.location.href = "/userLogin.html";
    }
  };
  authenticationWithAPI();
  // Navbar Active
  const navLink = document.querySelectorAll(".nav-link");
  navLink.forEach((link) => {
    link.addEventListener("click", () => {
      if (link) {
        navLink.forEach((link) => {
          link.classList.remove("active");
        });
        link.classList.add("active");
      }
    });
  });

  // Tab Content
  const setSpecTab = document.getElementById("setSpecTab");
  const mySpecTab = document.getElementById("mySpecTab");
  const setSpecContent = document.getElementById("setSpecContent");
  const mySpecContent = document.getElementById("mySpecContent");

  setSpecTab.addEventListener("click", () => {
    setSpecContent.style.display = "block";
    mySpecContent.style.display = "none";
  });
  mySpecTab.addEventListener("click", () => {
    setSpecContent.style.display = "none";
    mySpecContent.style.display = "block";
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/userLogin.html";
  });
});
