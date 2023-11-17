document.addEventListener("DOMContentLoaded", async () => {
  const renderCard = (data) => {
    let itemsHTML = "";
    data.forEach((item) => {
      itemsHTML += `
      <div class="col">
        <div class="card">
          <div class="card-header mx-auto">
            <img
              src="${item.title_image}"
              style="height: 200px; width: 200px"
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
      </div>
      `;
    });
    document.getElementById("cardsContent").innerHTML = itemsHTML;
  };
  const getData = async () => {
    let apiUrl = "http://localhost:5000/api/products/all";
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  };
  const result = await getData();
  renderCard(result);

  let modalProduct_id;
  const detailModalData = () => {
    const detailBtn = document.querySelectorAll(".setSpec");
    console.log(detailBtn);
    detailBtn.forEach((btn) => {
      btn.addEventListener("click", async () => {
        modalProduct_id = btn.getAttribute("name");
        console.log("product_id : ", modalProduct_id);
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
  detailModalData();

  document.getElementById("setSpecTab").addEventListener("click", async () => {
    const result = await getData();
    renderCard(result);
    detailModalData();
  });
});
