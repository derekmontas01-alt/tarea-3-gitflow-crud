const STORAGE_KEY = "productos_crud_gitflow";

const form = document.getElementById("product-form");
const productIdInput = document.getElementById("product-id");
const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const errorMsg = document.getElementById("error-msg");
const productList = document.getElementById("product-list");

function getProducts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}