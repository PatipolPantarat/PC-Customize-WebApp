// const detailBtn = document.getElementById("detail");
const detailBtn = document.getElementsByName("detail")[1];
detailBtn.addEventListener("click", () => {
  const newTabUrl = "https://www.google.com";
  window.open(newTabUrl, "_blank");
});
