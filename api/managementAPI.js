document.addEventListener("DOMContentLoaded", async () => {
  const baseURL = "http://localhost:5000/";

  let userIDs = [];
  let isUserLogin;

  // Get data from api
  const getData = async () => {
    const response = await fetch(baseURL + "api/auth/alluser");
    const data = await response.json();
    return data;
  };
  // Render table function
  const renderTable = (data) => {
    let rows = 1;
    let itemsHTML = "";
    data.forEach((item) => {
      if (item.username != isUserLogin) {
        itemsHTML += `
              <tr>
                <th scope="col" class="text-center"><input type="checkbox"  class="form-check-input" name="selected[]" /></th>
                <th scope="col" class="text-center">${rows++}</th>
                <td>${item.username}</td>
                <td>${item.email}</td>
                <td>${item.account_type}</td>
                <td>${item.created_at}</td>
                <td>${item.updated_at}</td>
              </tr>`;
        userIDs.push(item.id);
      }
    });
    document.getElementById("table-body-accounts").innerHTML = itemsHTML;
  };

  // Check JWT account
  const token = localStorage.getItem("token");
  const userAcc = document.getElementById("showAccount");
  const authenticationWithAPI = async () => {
    const response = await fetch(baseURL + "api/auth/authenticate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.status == "ok") {
      userAcc.textContent = data.message;
      isUserLogin = data.message;
    } else {
      localStorage.removeItem("token");
      window.location.href = "/Management/login.html";
    }
  };
  authenticationWithAPI();

  // Show all User
  let accountObj = await getData();
  renderTable(accountObj);

  // if (!token) {
  //   window.location.href = "/Management/login.html";
  // } else {
  //   fetch(baseURL + "api/auth/authenticate", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error("API request failed");
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/Management/login.html";
  });

  // Swap content with navbar tab
  const accountTab = document.getElementById("accountTab");
  const productTab = document.getElementById("productTab");
  const setSpecTab = document.getElementById("setSpecTab");
  const accountsContent = document.getElementById("accountsContent");
  const productsContent = document.getElementById("productsContent");
  const setSpecContent = document.getElementById("setSpecContent");
  accountTab.addEventListener("click", () => {
    accountsContent.style.display = "block";
    productsContent.style.display = "none";
    setSpecContent.style.display = "none";
  });
  productTab.addEventListener("click", () => {
    accountsContent.style.display = "none";
    productsContent.style.display = "block";
    setSpecContent.style.display = "none";
  });
  setSpecTab.addEventListener("click", () => {
    productsContent.style.display = "none";
    accountsContent.style.display = "none";
    setSpecContent.style.display = "block";
  });

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

  // Edit this account
  let oldUsername;
  const usernameEdit = document.getElementById("usernameEdit");
  const emailEdit = document.getElementById("emailEdit");
  const passwordEdit = document.getElementById("passwordEdit");
  userAcc.addEventListener("click", async () => {
    const response = await fetch(baseURL + "api/auth/find_account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isUserLogin }),
    });
    const data = await response.json();
    oldUsername = data.message.username;
    usernameEdit.value = data.message.username;
    emailEdit.value = data.message.email;
  });
  const editAccountForm = document.getElementById("editAccountForm");
  editAccountForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUsername = document.getElementById("usernameEdit").value;
    const newPassword = document.getElementById("passwordEdit").value;
    // Close modal
    const editThisAccountModal = new bootstrap.Modal(
      document.getElementById("editThisAccountModal")
    );
    const response = await fetch(baseURL + "api/auth/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldUsername, newUsername, newPassword }),
    });
    const data = await response.json();
    if (data.status == "success") {
      editThisAccountModal.hide();
      setTimeout(() => {
        location.reload();
      }, 100);
    } else {
      alert("status : error\nmessage : " + data.message);
    }
  });

  // Close modal
  const addAccountModal = new bootstrap.Modal(
    document.getElementById("addAccountModal")
  );
  // Add Account
  const addAccountForm = document.getElementById("addAccountForm");
  addAccountForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const account_type = document.getElementById("account_type").value;

    try {
      const response = await fetch(baseURL + "api/auth/add_account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, account_type }),
      });
      const data = await response.json();

      if (data.status == "success") {
        addAccountModal.hide();
        setTimeout(() => {
          location.reload();
        }, 100);
      } else {
        alert("status : error\nmessage : " + data.message);
      }
    } catch (error) {
      console.error("real fetch na Error:", error);
    }
  });

  // Hard delete checkboxes selected
  const delAccount = document.getElementById("delAccount");
  delAccount.addEventListener("click", async () => {
    const selected = document.getElementsByName("selected[]");
    let selectedIDs = [];
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].checked) {
        selectedIDs.push(userIDs[i]);
      }
    }
    if (selectedIDs.length == 0) {
      alert("Please select at least one account to delete");
      return;
    }
    const response = await fetch(baseURL + "api/auth/delete/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedIDs }),
    });
    const data = await response.json();
    if (data.status == "success") {
      setTimeout(() => {
        location.reload();
      }, 100);
    }
  });

  // Sort item
  let usernameSorted = false;
  const sortUsername = () => {
    if (usernameSorted) {
      accountObj.sort((a, b) => a.username.localeCompare(b.username));
    } else {
      accountObj.sort((a, b) => b.username.localeCompare(a.username));
    }
    usernameSorted = !usernameSorted;
    renderTable(accountObj);
  };
  let emailSorted = false;
  const sortEmail = () => {
    if (emailSorted) {
      accountObj.sort((a, b) => a.email.localeCompare(b.email));
    } else {
      accountObj.sort((a, b) => b.email.localeCompare(a.email));
    }
    emailSorted = !emailSorted;
    renderTable(accountObj);
  };
  let createSorted = false;
  const sortCreate = () => {
    if (createSorted) {
      accountObj.sort((a, b) => a.created_at.localeCompare(b.created_at));
    } else {
      accountObj.sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
    createSorted = !createSorted;
    renderTable(accountObj);
  };
  let updateSorted = false;
  const sortUpdate = () => {
    if (updateSorted) {
      accountObj.sort((a, b) => a.updated_at.localeCompare(b.updated_at));
    } else {
      accountObj.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    }
    updateSorted = !updateSorted;
    renderTable(accountObj);
  };

  // Sort Username
  const sortBtnUsername = document.getElementById("sortBtnUsername");
  sortBtnUsername.addEventListener("click", sortUsername);
  // Sort Email
  const sortBtnEmail = document.getElementById("sortBtnEmail");
  sortBtnEmail.addEventListener("click", sortEmail);
  // Sort Created At
  const sortBtnCreate = document.getElementById("sortBtnCreate");
  sortBtnCreate.addEventListener("click", sortCreate);
  // Sort Updated At
  const sortBtnUpdate = document.getElementById("sortBtnUpdate");
  sortBtnUpdate.addEventListener("click", sortUpdate);

  // Search Input
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    const filtered = accountObj.filter((item) => {
      return (
        item.username.toLowerCase().includes(searchValue) ||
        item.email.toLowerCase().includes(searchValue)
      );
    });
    renderTable(filtered);
  });
});
