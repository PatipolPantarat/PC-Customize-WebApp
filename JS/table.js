// Sample data (you can replace this with your data)
const data = [
  { name: "John", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 },
  { name: "Eve", age: 28 },
  { name: "Mike", age: 40 },
  { name: "Sarah", age: 22 },
  { name: "Tom", age: 32 },
  { name: "Linda", age: 27 },
];

const itemsPerPage = 4;
let currentPage = 1;

function displayTableData(page) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  for (let i = start; i < end && i < data.length; i++) {
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = data[i].name;
    cell2.innerHTML = data[i].age;
  }
}

function displayPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(data.length / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    pageLink.addEventListener("click", function () {
      currentPage = i;
      displayTableData(currentPage);
      displayPagination();
    });

    if (i === currentPage) {
      pageLink.classList.add("active");
    }

    pagination.appendChild(pageLink);
  }
}

// Initial page load
displayTableData(currentPage);
displayPagination();
