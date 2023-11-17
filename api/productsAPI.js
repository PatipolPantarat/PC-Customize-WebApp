document.addEventListener("DOMContentLoaded", async () => {
  let productIDs = [];
  let editProductID;
  let modalProduct_id;
  let productsCategoryIds = [];
  let productsBrandIds = [];

  const getData = async (params) => {
    let apiUrl = "http://localhost:5000/api/products/all";
    if (params) {
      apiUrl += `?${params}`;
    }
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();
    // renderTable(data);
    return data;
  };
  const renderTable = (data) => {
    // console.log(data);
    let rows = 1;
    let itemsHTML = "";
    productIDs = [];
    data.forEach((item) => {
      productIDs.push(item.product_id);
      itemsHTML += `
        <tr>
          <th scope="col" class="text-center"><input type="checkbox"  class="form-check-input" name="product_selected[]" /></th>
          <th scope="col" class="text-center">${rows++}</th>
          <td class="text-truncate">${item.category_name}</td>
          <td class="text-truncate">${item.brand_name}</td>
          <td class="text-truncate">${item.product_name}</td>
          <td class="text-truncate">${item.price.toLocaleString("en-US")} ฿</td>
          <td class="text-center"><button class="btn btn-info p-edit" 
          name="${item.product_id}"
          data-bs-toggle="modal"
          data-bs-target="#editToggleModal_1"
          >Detail</button></td>
        </tr>`;
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
      detailModalData();
      return;
    }
    productsObj = await getData(`category_id=${filterCategory.value}`);
    renderTable(productsObj);
    detailModalData();
    getProductsBrand(filterCategory.value);
  });
  const filterBrand = document.getElementById("filterBrand");
  filterBrand.addEventListener("change", async () => {
    console.log("Cate : ", filterCategory.value);
    console.log("Brand : ", filterBrand.value);
    if (filterCategory.value != "All" && filterBrand.value == "All") {
      productsObj = await getData(`category_id=${filterCategory.value}`);
      renderTable(productsObj);
      detailModalData();
      return;
    }
    if (filterCategory.value == "All" && filterBrand.value != "All") {
      productsObj = await getData(`brand_id=${filterBrand.value}`);
      renderTable(productsObj);
      detailModalData();
      return;
    }
    if (filterCategory.value == "All" && filterBrand.value == "All") {
      productsObj = await getData();
      renderTable(productsObj);
      detailModalData();
      return;
    }
    productsObj = await getData(
      `category_id=${filterCategory.value}&brand_id=${filterBrand.value}`
    );
    renderTable(productsObj);
    detailModalData();
  });

  // Detail Modal Before Edit

  const detailModalData = async () => {
    const detailBtn = document.querySelectorAll(".p-edit");
    console.log(detailBtn);
    detailBtn.forEach((btn) => {
      btn.addEventListener("click", async () => {
        modalProduct_id = btn.getAttribute("name");
        console.log("detailModalData : ", modalProduct_id);
        const response = await fetch(
          "http://localhost:5000/api/products/product?product_id=" +
            modalProduct_id
        );
        const data = await response.json();
        // send data to edit modal function
        editModalData(data);
        document.getElementById(
          "image_edit_detail"
        ).innerHTML = `<img src="${data[0].title_image}" width="300" height="300" class="me-3">`;
        document.getElementById("category_edit_detail").innerHTML =
          data[0].pc_name;
        document.getElementById("brand_edit_detail").innerHTML =
          data[0].pb_name;
        document.getElementById("name_edit_detail").innerHTML = data[0].name;
        document.getElementById("price_edit_detail").innerHTML =
          data[0].price.toLocaleString("en-US") + " ฿";
        document.getElementById("detail_edit_detail").innerHTML =
          data[0].detail || "N/A";
      });
    });
  };
  document.getElementById("productTab").addEventListener("click", () => {
    detailModalData();
  });

  // Edit Modal

  const editModalData = async (data) => {
    console.log("Func editModalData : ", data);
    editProductID = data[0].id;
    document.getElementById(
      "show_image_edit"
    ).innerHTML = `<img src="${data[0].title_image}" width="300" height="300">`;
    // document.getElementById("form_edit_category").value = data[0].pc_name;
    // document.getElementById("form_edit_brand").value = data[0].pb_name;
    document.getElementById("form_edit_name").value = data[0].name;
    document.getElementById("form_edit_price").value = data[0].price;
    document.getElementById("form_edit_detail").value = data[0].detail;

    // preview image
    document
      .getElementById("form_edit_image")
      .addEventListener("change", (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            document.getElementById(
              "show_image_edit"
            ).innerHTML = `<img src="${reader.result}" width="300" height="300" style="object-fit: contain;">`;
          }
        };
        reader.readAsDataURL(file);
      });
  };
  const form_edit_category = document.getElementById("form_edit_category");
  form_edit_category.addEventListener("change", async () => {
    if (form_edit_category.value == "please_select") {
      getBrand();
      return;
    }
    getBrand(form_edit_category.value);
  });
  // Close modal
  const editToggleModal_2 = new bootstrap.Modal(
    document.getElementById("editToggleModal_2")
  );

  // Edit Button
  document.getElementById("editButton").addEventListener("click", () => {
    getCategory();
    getBrand();
  });

  // edit product form
  const editProductForm = document.getElementById("editProductForm");
  editProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_id", editProductID);
    formData.append("name", document.getElementById("form_edit_name").value);
    formData.append("price", document.getElementById("form_edit_price").value);
    formData.append(
      "detail",
      document.getElementById("form_edit_detail").value
    );
    formData.append(
      "category_id",
      document.getElementById("form_edit_category").value
    );
    formData.append(
      "brand_id",
      document.getElementById("form_edit_brand").value
    );
    formData.append(
      "form_edit_image",
      document.getElementById("form_edit_image").files[0]
    );
    if (
      document.getElementById("form_edit_category").value == "please_select" ||
      document.getElementById("form_edit_brand").value == "please_select"
    ) {
      alert("Please select category and brand");
      return;
    }
    const response = await fetch(
      "http://localhost:5000/api/products/update_product",
      {
        method: "PUT",
        body: formData,
      }
    );
    const data = await response.json();
    editToggleModal_2.hide();
    document.getElementById("form_edit_image").innerHTML = "";
    if (data.status == "success") {
      productsObj = await getData();
      setTimeout(() => {
        renderTable(productsObj);
        detailModalData();
        getProductsCategory();
        getProductsBrand();
      }, 100);
    }
  });

  // Add Product
  const getCategory = async () => {
    const response = await fetch("http://localhost:5000/api/products/category");
    const data = await response.json();

    let itemsHTML = `<option value="please_select">Please Select</option>`;
    data.forEach((item) => {
      itemsHTML += `<option value="${item.category_id}">${item.category_name}</option>`;
    });
    document.getElementById("categoryAddProducts").innerHTML = itemsHTML;
    document.getElementById("form_edit_category").innerHTML = itemsHTML;
    // document.getElementById("categoryEditProducts").innerHTML = itemsHTML;
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
    document.getElementById("form_edit_brand").innerHTML = itemsHTML;
    // document.getElementById("brandEditProducts").innerHTML = itemsHTML;
  };
  getBrand();

  const categoryAddProducts = document.getElementById("categoryAddProducts");
  categoryAddProducts.addEventListener("change", async () => {
    if (categoryAddProducts.value == "please_select") {
      getBrand();
      return;
    }
    getBrand(categoryAddProducts.value);
  });
  const brandAddProducts = document.getElementById("brandAddProducts");

  const addProductForm = document.getElementById("addProductForm");
  const title_image = document.getElementById("title_image");
  const detail_images = document.getElementById("detail_images");
  // Close modal
  const addProductModal = new bootstrap.Modal(
    document.getElementById("addProductModal")
  );
  addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (
      categoryAddProducts.value == "please_select" ||
      brandAddProducts.value == "please_select"
    ) {
      alert("Please select category and brand");
      return;
    }
    const formData = new FormData(addProductForm);
    console.log("formData : ", formData);
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/add_products",
        {
          method: "POST",
          body: formData,
        }
      );
      addProductModal.hide();
      getCategory();
      getBrand();
      document.getElementById("addProductForm").reset();
      const data = await response.json();
      if (data.status == "success") {
        productsObj = await getData();
        setTimeout(() => {
          renderTable(productsObj);
          detailModalData();
        }, 100);
      }
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  });

  // Sort price
  let priceSorted = false;
  const sortPrice = () => {
    if (priceSorted) {
      productsObj.sort((a, b) => a.price - b.price);
    } else {
      productsObj.sort((a, b) => b.price - a.price);
    }
    priceSorted = !priceSorted;
    renderTable(productsObj);
  };
  // Sort Price
  const sortBtnPrice = document.getElementById("sortBtnPrice");
  sortBtnPrice.addEventListener("click", sortPrice);

  // Delete checkboxes selected
  const delProduct = document.getElementById("delProduct");
  delProduct.addEventListener("click", async () => {
    const product_selected = document.getElementsByName("product_selected[]");
    let selectedIDs = [];
    for (let i = 0; i < product_selected.length; i++) {
      if (product_selected[i].checked) {
        selectedIDs.push(productIDs[i]);
      }
    }
    if (selectedIDs.length == 0) {
      alert("Please select at least one product to delete");
      return;
    }
    console.log(selectedIDs);
    const response = await fetch("http://localhost:5000/api/products/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedIDs }),
    });
    const data = await response.json();
    if (data.status == "success") {
      // console.log("category : ", filterCategory.value);
      // console.log("brand : ", filterBrand.value);
      if (filterCategory.value == "All") {
        if (filterBrand.value == "All") {
          // console.log("all all before :", productsObj);
          productsObj = await getData();
          // console.log("all all after :", productsObj);
        } else {
          productsObj = await getData(`brand_id=${filterBrand.value}`);
        }
      } else {
        if (filterBrand.value == "All") {
          productsObj = await getData(`category_id=${filterCategory.value}`);
        } else {
          productsObj = await getData(
            `category_id=${filterCategory.value}&brand_id=${filterBrand.value}`
          );
        }
      }
      renderTable(productsObj);
    }
  });
});
