document.addEventListener("DOMContentLoaded", () => {
  const renderProducts = async (data) => {
    let itemsHTML = ``;
    data.forEach((item) => {
      itemsHTML += `
      <div class="col">
        <div class="card">
        <div class="card-header mx-auto">
          <img
            src="${item.title_image}"
            style="height: 150px; width: 150px"
          />
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h5 class="card-title">${item.brand_name}</h5>
            <p class="card-text">${item.price.toLocaleString("en-US")} ฿</p>
            </div>
            <div>
            <p class="card-text text-truncate">${item.product_name}</p>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-evenly">
          <button class="btn btn-success">Set Spec</button>
          <button class="btn btn-info setSpec" name="${
            item.product_id
          }" data-bs-toggle="modal" data-bs-target="#detailProductModal"
          >Detail</button>
        </div>
        </div>
      </div>`;
    });
    document.getElementById("cardsContent").innerHTML = itemsHTML;
  };
  const filterCategory = document.querySelectorAll(".set-spec-item");
  const filterBrand = document.getElementById("filterBrand");

  const getBrand = async (category_id) => {
    let response;
    if (!category_id) {
      response = await fetch("http://localhost:5000/api/products/brand");
    } else {
      response = await fetch(
        `http://localhost:5000/api/products/brand?category_id=${category_id}`
      );
    }
    const data = await response.json();
    let itemsHTML = `<option value="please_select">Please Select</option>`;
    data.forEach((item) => {
      itemsHTML += `<option value="${item.brand_id}">${item.brand_name}</option>`;
    });
    document.getElementById("filterBrand").innerHTML = itemsHTML;
  };

  filterCategory.forEach((categoryMenu) => {
    categoryMenu.addEventListener("click", async () => {
      const category_id = categoryMenu.getAttribute("data-category-id");
      const response = await fetch(
        `http://localhost:5000/api/products/all?category_id=${category_id}`
      );
      const data = await response.json();
      renderProducts(data);
    });
  });
});
