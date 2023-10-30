// const addToSpec = document.getElementsByName("addtospec");
// const cpu = document.getElementById("cpu");
// const productModel = document.getElementsByName("product-model");

// addToSpec.addEventListener("click", () => {
//   console.log(1);
// });

// Change filter by Menu
const cpuFilter = document.getElementById("cpu");
const mainboardFilter = document.getElementById("mainboard");

const block2 = document.getElementById("block-2");

cpuFilter.addEventListener("click", () => {
  const htmlTxt = `<div class="filter">
  <label for="brand-cpu">Brand</label>
  <select id="brand-cpu">
    <option value="Select">Select</option>
    <option value="Intel">Intel</option>
    <option value="AMD">AMD</option>
  </select>
</div>
<div class="filter">
  <label for="model-cpu">Model</label>
  <select id="model-cpu">
    <option value="Select">Select</option>
    <option value="i3">Core i3</option>
    <option value="i5">Core i5</option>
    <option value="i7">Core i7</option>
    <option value="i9">Core i9</option>
    <option value="r3">Ryzen 3</option>
    <option value="r5">Ryzen 5</option>
    <option value="r7">Ryzen 7</option>
    <option value="r9">Ryzen 9</option>
  </select>
</div>
<div class="filter">
  <label for="socket-cpu">Socket</label>
  <select id="socket-cpu">
    <option value="Select">Select</option>
    <option value="LGA1200">LGA 1200</option>
    <option value="LGA1700">LGA 1700</option>
    <option value="AM4">AM4</option>
    <option value="AM4">AM5</option>
  </select>
</div>
<div class="filter">
  <label for="brand-cpu">Search</label>
  <div class="search">
    <input id="search" type="search" placeholder="Search..." />
    <button type="submit">Search</button>
  </div>
</div>`;
  block2.innerHTML = htmlTxt;
});

mainboardFilter.addEventListener("click", () => {
  const htmlTxt = `<div class="filter">
  <label for="brand-formfactor">Form Factor</label>
  <select id="brand-formfactor">
    <option value="Select">Select</option>
    <option value="ATX">ATX</option>
    <option value="micro-ATX">micro-ATX</option>
    <option value="mini-ITX">mini-ITX</option>
    <option value="E-ATX">E-ATX</option>
  </select>
</div>
<div class="filter">
  <label for="brand-mainboard">Brand</label>
  <select id="brand-mainboard">
    <option value="Select">Select</option>
    <option value="Asrock">Asrock</option>
    <option value="Asus">Asus</option>
    <option value="Gigabyte">Gigabyte</option>
    <option value="MSI">MSI</option>
  </select>
</div>
<div class="filter">
  <label for="brand-cpu">Search</label>
  <div class="search">
    <input id="search" type="search" placeholder="Search..." />
    <button type="submit">Search</button>
  </div>
</div>`;
  block2.innerHTML = htmlTxt;
});
