document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "http://localhost:5000/";

  // Check Authentication
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/Management/login.html";
  } else {
    fetch(baseURL + "api/auth/authenticate", {
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
        console.log(data);
      });
  }

  // Show all User
  fetch(baseURL + "api/auth/alluser")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("API request failed");
      }
    })
    .then((data) => {
      let itemsHTML = "";
      data.forEach((item) => {
        itemsHTML += `<tr>
        <th scope="col" class="text-center"><input type="checkbox" /></th>
        <td>${item.username}</td>
        <td>${item.email}</td>
        <td>${item.account_type}</td>
        <td>${item.created_at}</td>
        <td>${item.updated_at}</td>
        
      </tr>`;
      });
      document.getElementById("table-body").innerHTML = itemsHTML;
    });

  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/Management/login.html";
  });

  // Swap content with navbar tab
  const accountTab = document.getElementById("accountTab");
  const productTab = document.getElementById("productTab");
  const accountsContent = document.getElementById("accountsContent");
  const productsContent = document.getElementById("productsContent");
  accountTab.addEventListener("click", () => {
    accountsContent.style.display = "block";
    productsContent.style.display = "none";
  });
  productTab.addEventListener("click", () => {
    productsContent.style.display = "block";
    accountsContent.style.display = "none";
  });

  //Show all Product
});
