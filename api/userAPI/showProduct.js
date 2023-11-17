document.addEventListener("DOMContentLoaded", () => {
  let modalProduct_id;
  const detailModalData = () => {
    const detailBtn = document.querySelectorAll(".setSpec");
    console.log("detailBtn : ", detailBtn);
    detailBtn.forEach((btn) => {
      btn.addEventListener("click", async () => {
        modalProduct_id = btn.getAttribute("data-product-id");
        console.log("data-product-id : ", modalProduct_id);
        const response = await fetch(
          "http://localhost:5000/api/products/product?product_id=" +
            modalProduct_id
        );
        const data = await response.json();
        console.log(data);
        document.getElementById(
          "image_detail"
        ).innerHTML = `<img src="${data[0].title_image}" width="300" height="300" class="me-3">`;
        document.getElementById("category_detail").innerHTML = data[0].pc_name;
        document.getElementById("brand_detail").innerHTML = data[0].pb_name;
        document.getElementById("name_detail").innerHTML = data[0].name;
        document.getElementById("price_detail").innerHTML =
          data[0].price.toLocaleString("en-US") + " ฿";
        document.getElementById("product_detail").innerHTML =
          data[0].detail || "N/A";
      });
    });
  };
  const renderProducts = (data) => {
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
          <button class="btn btn-info setSpec" data-product-id="${
            item.product_id
          }" data-bs-toggle="modal" data-bs-target="#detailProductModal"
          >Detail</button>
        </div>
        </div>
      </div>`;
    });
    document.getElementById("cardsContent").innerHTML = itemsHTML;
  };
  const getProducts = async (params) => {
    let apiUrl = "http://localhost:5000/api/products/all";
    if (params) {
      apiUrl += `?${params}`;
    }
    const response = await fetch(apiUrl);
    const data = await response.json();
    renderProducts(data);
    detailModalData();
  };
  getProducts();
  document.getElementById("setSpecTab").addEventListener("click", () => {
    getProducts();
  });
  document.getElementById(
    "filterBrand"
  ).innerHTML = `<option value="All">All</option>`;
  let category_id;
  let productsObj = {};

  const getBrand = async (category_id) => {
    const response = await fetch(
      `http://localhost:5000/api/products/brand?category_id=${category_id}`
    );
    const data = await response.json();
    let itemsHTML = `<option value="All">All</option>`;
    data.forEach((item) => {
      itemsHTML += `<option value="${item.brand_id}">${item.brand_name}</option>`;
    });
    document.getElementById("filterBrand").innerHTML = itemsHTML;
  };
  const filterCategory = document.querySelectorAll(".set-spec-item");
  filterCategory.forEach((categoryMenu) => {
    categoryMenu.addEventListener("click", async () => {
      category_id = categoryMenu.getAttribute("data-category-id");
      const response = await fetch(
        `http://localhost:5000/api/products/all?category_id=${category_id}`
      );
      const data = await response.json();
      renderProducts(data);
      detailModalData();
      getBrand(category_id);
    });
  });
  const filterBrand = document.getElementById("filterBrand");
  filterBrand.addEventListener("change", async () => {
    console.log("Category : ", category_id);
    console.log("Brand : ", filterBrand.value);
    if (filterBrand.value != "All") {
      await getProducts(
        `category_id=${category_id}&brand_id=${filterBrand.value}`
      );
    } else {
      await getProducts(`category_id=${category_id}`);
    }
  });

  document.getElementById("setSpecTab").addEventListener("click", async () => {
    await getProducts();
    detailModalData();
  });
});
