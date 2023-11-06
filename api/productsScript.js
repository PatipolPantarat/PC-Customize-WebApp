document.addEventListener("DOMContentLoaded", () => {
  // Filter Option Category, Brand
  const categorySelected = document.getElementById("category");
  const brandSelected = document.getElementById("brand");

  function filterOption() {
    const category = categorySelected.value;
    const options = brandSelected.querySelectorAll("option");
    options.forEach((option) => {
      option.style.display = "none";
      option.selected = false;
    });
    const filteredOptions = brandSelected.querySelectorAll(
      `[data-filter="${category}"]`
    );
    filteredOptions.forEach((option) => {
      option.style.display = "block";
    });
  }
  categorySelected.addEventListener("change", filterOption);
  filterOption();
});
