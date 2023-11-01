document.addEventListener("DOMContentLoaded", () => {
  const baseAPIUrl = "http://localhost:5000/";

  // Show all item
  fetch(baseAPIUrl + "api/name")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("API request failed");
      }
    })
    .then((data) => {
      const dataTable = document.getElementById("table-body");
      let itemsHTML = "";
      data.forEach((item) => {
        itemsHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td class="truncate"><a href="${item.image}" target="_blank">${item.image}</td>
          <td><i class='bx bxs-edit-alt' ></i><i class='bx bxs-trash-alt' ></i></td>
        </tr>
        `;
      });
      dataTable.innerHTML += itemsHTML;
    })
    .catch((error) => {
      console.error(error);
    });

  // Upload Button
  const uploadForm = document.getElementById("imageUploadForm");
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(uploadForm);
    try {
      const response = await fetch(baseAPIUrl + "api/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        // Handle the success response
        console.log("JS Image uploaded successfully.");
        alert("JS Image uploaded successfully.");
      } else {
        // Handle errors
        console.error("Image upload failed.");
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("real fetch na Error:", error);
    }
  });

  // Go to User Interface
  const userInterface = document.getElementById("user-btn");
  userInterface.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
