// fetch("http://localhost:5000/products")
//   .then((response) => {
//     if (response.ok) {
//       // Parse the response data as JSON
//       return response.json();
//     } else {
//       throw new Error("API request failed");
//     }
//   })
//   .then((data) => {
//     // Process the response data
//     data.map((item) => {
//       console.info(item.image);
//     });
//     // RENDER PRODUCTS
//     // renderProducts(data);
//   })
//   .catch((error) => {
//     // Handle any errors
//     console.error(error);
//   });

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

// Get API Data for Test
document.addEventListener("DOMContentLoaded", () => {
  const getDataButton = document.getElementById("getData");
  const resultDiv = document.getElementById("result");

  getDataButton.addEventListener("click", () => {
    // เรียกใช้งาน API จาก Express.js บนพอร์ต 5000
    fetch("http://localhost:5000/upload")
      .then((response) => response.json())
      .then((data) => {
        resultDiv.innerHTML = JSON.stringify(data);
      })
      .catch((error) => {
        console.error(error);
        resultDiv.innerHTML = "เกิดข้อผิดพลาดในการดึงข้อมูลจาก API";
      });
  });
});
