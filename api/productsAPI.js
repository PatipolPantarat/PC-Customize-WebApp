document.addEventListener("DOMContentLoaded", async () => {
  const getData = async () => {
    const response = await fetch("http://localhost:5000/api/products/all");
    const data = await response.json();
    return data;
  };
  let userIDs = [];
  const renderTable = (data) => {
    let rows = 1;
    let itemsHTML = "";
    data.forEach((item) => {
      itemsHTML += `
        <tr>
          <th scope="col" class="text-center"><input type="checkbox"  class="form-check-input" name="selected[]" /></th>
          <th scope="col" class="text-center">${rows++}</th>
          <td>${item.name}</td>
          <td>${item.title_image}</td>
          <td>${item.price}</td>
          <td>${item.created_at}</td>
          <td>${item.updated_at}</td>
        </tr>`;
      userIDs.push(item.id);
    });
    document.getElementById("table-body-products").innerHTML = itemsHTML;
  };
  // Show all User
  let productsObj = await getData();
  renderTable(productsObj);

  // Add Product
  const addProductForm = document.getElementById("addProductForm");
  const title_image = document.getElementById("title_image");
  const detail_images = document.getElementById("detail_images");
  addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(detail_images.files);
    const formData = new FormData();
    for (let i = 0; i < detail_images.files.length; i++) {
      formData.append("detail_images", detail_images.files[i]);
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/upload",
        {
          method: "POST",
          body: formData,
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});
