document.addEventListener("DOMContentLoaded", () => {
  // Show products
  const baseAPIUrl = "http://localhost:5000/";
  fetch(baseAPIUrl + "api/name")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("API request failed");
      }
    })
    .then((data) => {
      const productsCon = document.getElementById("products-container");
      let productItemsHTML = "";
      data.forEach((product) => {
        productItemsHTML += `
      <div class="products-item">
      <div class="product-header">
        <div class="product-brand">AMD</div>
        <div class="product-model">${product.name}</div>
      </div>
      <div class="product-img">
        <img src="${product.image}" alt="Loading..." />
      </div>
      <div class="product-price">
        <div>Price</div>
        <div class="price">120,000 บาท</div>
      </div>
      <div class="product-btn">
        <input type="button" value="Add to Spec" />
        <input type="button" value="Detail" id="detail" name="detail" />
      </div>
    </div>
      `;
      });
      productsCon.innerHTML += productItemsHTML;
    })
    .catch((error) => {
      console.error(error);
    });

  // Login & Logout
  const page = document.getElementById("page");
  const loginButton = document.getElementById("login-btn");
  const logoutButton = document.getElementById("logout-btn");

  // Get token from localStorage
  const token = localStorage.getItem("token");

  if (token) {
    // User is authenticated.
    loginButton.style.display = "none";
    logoutButton.style.display = "block";
  } else {
    // User is not authenticated.
    loginButton.style.display = "block";
    logoutButton.style.display = "none";
  }
  // Login button click event.
  loginButton.addEventListener("click", () => {
    window.location.href = "/login.html";
  });

  // Logout button click event.
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/index.html";
    loginButton.style.display = "block";
    logoutButton.style.display = "none";
  });

  // Check role account
  console.log(token);
  fetch(baseAPIUrl + "api/auth/authen", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("API request failed");
      }
    })
    .then((data) => {
      if (data.status == "ok") {
      }
    });

  // Back Office
  const backOffice = document.getElementById("backoffice-btn");
  backOffice.addEventListener("click", () => {
    window.location.href = "/admin.html";
  });
});
