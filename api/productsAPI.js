document.addEventListener("DOMContentLoaded", async () => {
  const getData = async (params) => {
    let apiUrl = "http://localhost:5000/api/products/all";
    if (params) {
      apiUrl += `?${params}`;
    }
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();
    renderTable(data);
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
          <td class="text-truncate">${item.category_name}</td>
          <td class="text-truncate">${item.brand_name}</td>
          <td>${item.product_name}</td>
          <td>${item.price}</td>
          <td class="text-center"><button class="btn btn-info">Detail</button></td>
        </tr>`;
      userIDs.push(item.product_id);
    });
    document.getElementById("table-body-products").innerHTML = itemsHTML;
  };

  // Show all products
  let productsObj = await getData();
  renderTable(productsObj);

  // Search Input
  document
    .getElementById("searchInputProduct")
    .addEventListener("input", () => {
      const searchValue = document
        .getElementById("searchInputProduct")
        .value.toLowerCase();
      console.log(productsObj);
      const filteredProducts = productsObj.filter((item) => {
        return (
          item.category_name.toLowerCase().includes(searchValue) ||
          item.brand_name.toLowerCase().includes(searchValue) ||
          item.product_name.toLowerCase().includes(searchValue) ||
          item.price.toString().includes(searchValue)
        );
      });
      renderTable(filteredProducts);
    });

  // Filter products
  let productsCategoryIds = [];
  let productsBrandIds = [];
  const getProductsBrand = async (category_id) => {
    if (!category_id) {
      const response = await fetch("http://localhost:5000/api/products/brand");
      const data = await response.json();
      let itemsHTML = `<option value="All">All</option>`;
      data.forEach((item) => {
        itemsHTML += `<option value="${item.brand_id}">${item.brand_name}</option>`;
        productsBrandIds.push(item.brand_id);
      });
      document.getElementById("filterBrand").innerHTML = itemsHTML;
      return;
    }

    const response = await fetch(
      `http://localhost:5000/api/products/brand?category_id=${category_id}`
    );
    const data = await response.json();
    let itemsHTML = `<option value="All">All</option>`;
    data.forEach((item) => {
      itemsHTML += `<option value="${item.brand_id}">${item.brand_name}</option>`;
      productsBrandIds.push(item.id);
    });
    document.getElementById("filterBrand").innerHTML = itemsHTML;
  };
  getProductsBrand();
  const getProductsCategory = async () => {
    const response = await fetch("http://localhost:5000/api/products/category");
    const data = await response.json();
    let itemsHTML = `<option value="All">All</option>`;
    data.forEach((item) => {
      itemsHTML += `<option value="${item.category_id}">${item.category_name}</option>`;
      productsCategoryIds.push(item.category_id);
    });
    document.getElementById("filterCategory").innerHTML = itemsHTML;
  };
  getProductsCategory();

  const filterCategory = document.getElementById("filterCategory");
  filterCategory.addEventListener("change", async () => {
    if (filterCategory.value == "All") {
      productsObj = await getData();
      getProductsBrand();
      renderTable(productsObj);
      return;
    }
    productsObj = await getData(`category_id=${filterCategory.value}`);
    renderTable(productsObj);
    getProductsBrand(filterCategory.value);
  });
  const filterBrand = document.getElementById("filterBrand");
  filterBrand.addEventListener("change", async () => {
    console.log("Cate : ", filterCategory.value);
    console.log("Brand : ", filterBrand.value);
    if (filterCategory.value != "All" && filterBrand.value == "All") {
      productsObj = await getData(`category_id=${filterCategory.value}`);
      renderTable(productsObj);
      return;
    }
    if (filterCategory.value == "All" && filterBrand.value != "All") {
      productsObj = await getData(`brand_id=${filterBrand.value}`);
      renderTable(productsObj);
      return;
    }
    if (filterCategory.value == "All" && filterBrand.value == "All") {
      productsObj = await getData();
      renderTable(productsObj);
      return;
    }
    productsObj = await getData(
      `category_id=${filterCategory.value}&brand_id=${filterBrand.value}`
    );
    renderTable(productsObj);
  });

  // Add Product
  let addProductCategoryIds;
  let addProductBrandIds;
  const getCategory = async () => {
    const response = await fetch("http://localhost:5000/api/products/category");
    const data = await response.json();
    let itemsHTML = `<option value="please_select">Please Select</option>`;
    data.forEach((item) => {
      itemsHTML += `<option value="${item.category_id}">${item.category_name}</option>`;
    });
    document.getElementById("categoryAddProducts").innerHTML = itemsHTML;
  };
  getCategory();
  const getBrand = async (category_id) => {
    let response, data;
    if (!category_id) {
      response = await fetch("http://localhost:5000/api/products/brand");
      data = await response.json();
    } else {
      response = await fetch(
        `http://localhost:5000/api/products/brand?category_id=${category_id}`
      );
      data = await response.json();
    }
    let itemsHTML = `<option value="please_select">Please Select</option>`;
    data.forEach((item) => {
      itemsHTML += `<option value="${item.brand_id}">${item.brand_name}</option>`;
    });
    document.getElementById("brandAddProducts").innerHTML = itemsHTML;
  };
  getBrand();

  const categoryAddProducts = document.getElementById("categoryAddProducts");
  categoryAddProducts.addEventListener("change", async () => {
    if (categoryAddProducts.value == "please_select") {
      return;
    }
    getBrand(categoryAddProducts.value);
  });
  const brandAddProducts = document.getElementById("brandAddProducts");

  const addProductForm = document.getElementById("addProductForm");
  const title_image = document.getElementById("title_image");
  const detail_images = document.getElementById("detail_images");
  const addProductModal = new bootstrap.Modal(
    document.getElementById("addProductModal")
  );
  addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Close modal
    if (
      categoryAddProducts.value == "please_select" ||
      brandAddProducts.value == "please_select"
    ) {
      alert("Please select category and brand");
      return;
    }
    const formData = new FormData(addProductForm);

    try {
      const response = await fetch(
        "http://localhost:5000/api/products/add_products",
        {
          method: "POST",
          body: formData,
        }
      );
      addProductModal.hide();
      const data = await response.json();
      if (data.status == "success") {
        productsObj = await getData();
        setTimeout(() => {
          renderTable(productsObj);
        }, 100);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });
});
