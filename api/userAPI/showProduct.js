document.addEventListener("DOMContentLoaded", async () => {
  let modalProduct_id;
  const detailModalData = () => {
    const detailBtn = document.querySelectorAll(".detailBtn");
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

    const setSpecBtn = document.querySelectorAll(".setSpecBtn");
    console.log("setSpecBtn : ", setSpecBtn);
    setSpecBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const category_id = btn.getAttribute("data-pcid");
        const product_id = btn.getAttribute("data-pid");
        const imageUrl = btn.getAttribute("data-image");
        console.log(imageUrl);
        const product_price = Number(btn.getAttribute("data-product-price"));
        switch (category_id) {
          case "620091bf-f3da-4120-857a-399a9714cacc": {
            document.getElementById("setSpecCpu").innerHTML = `
            <div class="d-flex align-items-center" style="width: 100%">
              <img src="${imageUrl}" />
              <a href="#" class="text-truncate" style="width: 40%">${product_id}</a>
              <span>${product_price.toLocaleString("en-US")} ฿</span>
              <button type="button" class="btn-close"></button>
            </div>`;
            break;
          }
          case "8d4453e3-090a-412c-9209-4c64201e9398": {
            document.getElementById("setSpecMB").innerHTML = `
            <div class="d-flex align-items-center" style="width: 100%">
              <img src="${imageUrl}" />
              <a href="#" class="text-truncate" style="width: 40%">${product_id}</a>
              <span>${product_price.toLocaleString("en-US")} ฿</span>
              <button type="button" class="btn-close"></button>
            </div>`;
            break;
          }
          case "62f77fa1-657e-43a4-a9fd-104db85b3d3b": {
            document.getElementById("setSpecMemory").innerHTML = `
            <div class="d-flex align-items-center" style="width: 100%">
              <img src="${imageUrl}" />
              <a href="#" class="text-truncate" style="width: 40%">${product_id}</a>
              <span>${product_price.toLocaleString("en-US")} ฿</span>
              <button type="button" class="btn-close"></button>
            </div>`;
            break;
          }
          case "028533fc-d5b1-4a76-b9bb-5f84fbb51759": {
            document.getElementById("setSpecGpu").innerHTML = `
            <div class="d-flex align-items-center" style="width: 100%">
              <img src="${imageUrl}" />
              <a href="#" class="text-truncate" style="width: 40%">${product_id}</a>
              <span>${product_price.toLocaleString("en-US")} ฿</span>
              <button type="button" class="btn-close"></button>
            </div>`;
            break;
          }
          case "8fe95749-eb90-4765-903c-7ce43de22a07": {
            document.getElementById("setSpecHdd").innerHTML = `
            <div class="d-flex align-items-center" style="width: 100%">
              <img src="${imageUrl}" />
              <a href="#" class="text-truncate" style="width: 40%">${product_id}</a>
              <span>${product_price.toLocaleString("en-US")} ฿</span>
              <button type="button" class="btn-close"></button>
            </div>`;
            break;
          }
          case "8f6ed689-4613-4e60-bacc-8753c6936574": {
            document.getElementById("setSpecSsdsata").innerHTML = `
            <div class="d-flex align-items-center" style="width: 100%">
              <img src="${imageUrl}" />
              <a href="#" class="text-truncate" style="width: 40%">${product_id}</a>
              <span>${product_price.toLocaleString("en-US")} ฿</span>
              <button type="button" class="btn-close"></button>
            </div>`;
            break;
          }
          case "cfc7bafe-fc30-4aeb-9164-36d9a0ab3052": {
            document.getElementById("setSpecSsdpcie").innerHTML = `
            <div class="d-flex align-items-center" style="width: 100%">
              <img src="${imageUrl}" />
              <a href="#" class="text-truncate" style="width: 40%">${product_id}</a>
              <span>${product_price.toLocaleString("en-US")} ฿</span>
              <button type="button" class="btn-close"></button>
            </div>`;
            break;
          }
          case "db8e2dee-1252-466d-87fc-5784905be2ff": {
            document.getElementById("setSpecPSU").innerHTML = `
            <div class="d-flex align-items-center" style="width: 100%">
              <img src="${imageUrl}" />
              <a href="#" class="text-truncate" style="width: 40%">${product_id}</a>
              <span>${product_price.toLocaleString("en-US")} ฿</span>
              <button type="button" class="btn-close"></button>
            </div>`;
            break;
          }
          case "386c298b-4370-443d-93b5-aec5a6cca408": {
            document.getElementById("setSpecCooler").innerHTML = `
            <div class="d-flex align-items-center" style="width: 100%">
              <img src="${imageUrl}" />
              <a href="#" class="text-truncate" style="width: 40%">${product_id}</a>
              <span>${product_price.toLocaleString("en-US")} ฿</span>
              <button type="button" class="btn-close"></button>
            </div>`;
            break;
          }
          case "c69ddd27-f44a-4b7b-86b5-3b53d2b64ba4": {
            document.getElementById("setSpecCase").innerHTML = `
            <div class="d-flex align-items-center" style="width: 100%">
              <img src="${imageUrl}" />
              <a href="#" class="text-truncate" style="width: 40%">${product_id}</a>
              <span>${product_price.toLocaleString("en-US")} ฿</span>
              <button type="button" class="btn-close"></button>
            </div>`;
            break;
          }
        }
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
          <button class="btn btn-success setSpecBtn" data-product-price="${
            item.price
          }" data-pid="${item.product_name}" data-pcid="${
        item.category_id
      }" data-image="${item.title_image}">Set Spec</button>
          <button class="btn btn-info detailBtn" data-product-id="${
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

  // set spec
});
