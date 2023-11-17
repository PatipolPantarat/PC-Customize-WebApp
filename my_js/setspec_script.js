document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:5000/api/products/category");
  const categoryList = await response.json();
  console.log(categoryList);

  let index = 0;
  const setSpecItem = document.querySelectorAll(".set-spec-item");
  setSpecItem.forEach((item) => {
    item.setAttribute("data-category-id", categoryList[index++].category_id);
    item.addEventListener("click", () => {
      if (item) {
        setSpecItem.forEach((item) => {
          item.classList.remove("active");
        });
        item.classList.add("active");
      }
    });
  });
});
