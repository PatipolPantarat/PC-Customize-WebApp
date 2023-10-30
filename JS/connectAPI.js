const baseAPIUrl = "http://localhost:5000/";
fetch(baseAPIUrl)
  .then((response) => {
    if (response.ok) {
      // Parse the response data as JSON
      return response.json();
    } else {
      throw new Error("API request failed");
    }
  })
  .then((data) => {
    const productsCon = document.getElementById("products-container");
    let productItemsHTML = "";
    data.forEach((product) => {
      productItemsHTML += `
      <div class="products-item">
      <div class="product-header">
        <div class="product-brand">AMD</div>
        <div class="product-model">${product.name}</div>
      </div>
      <div class="product-img">
        <img src="${product.image}" alt="Loading..." />
      </div>
      <div class="product-price">
        <div>Price</div>
        <div class="price">120,000 บาท</div>
      </div>
      <div class="product-btn">
        <input type="button" value="Add to Spec" />
        <input type="button" value="Detail" id="detail" name="detail" />
      </div>
    </div>
      `;
    });
    productsCon.innerHTML += productItemsHTML;
  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });

// Upload Button
const form = document.getElementById("imageUploadForm");
form.addEventListener("submit", async (e) => {
  console.log("Form submitted.");
  e.preventDefault();
  const formData = new FormData(form);
  try {
    const response = await fetch(baseAPIUrl + "api/upload", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      // Handle the success response
      console.log("JS Image uploaded successfully.");
    } else {
      // Handle errors
      console.error("Image upload failed.");
    }
  } catch (error) {
    console.error("real fetch na Error:", error);
  }
});
