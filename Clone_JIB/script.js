fetch("http://localhost:5000/products")
  .then((response) => {
    if (response.ok) {
      // Parse the response data as JSON
      return response.json();
    } else {
      throw new Error("API request failed");
    }
  })
  .then((data) => {
    // Process the response data
    data.map((item) => {
      console.info(item.image);
    });
    renderProducts(data);
  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });

function renderProducts(data) {
  const productsContainer = document.getElementById("products-container");
  let productItemsHTML = "";

  data.forEach((product) => {
    productItemsHTML += `
      <div class="products-item">
        <div class="product-img">
          <img src="${product.image}" />
        </div>
        <div class="product-description">${product.description}</div>
      </div>
    `;
  });
  productsContainer.innerHTML += productItemsHTML;
}
