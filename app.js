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

function renderProducts() {
  const products = getProducts();

  if (products.length === 0) {
    productList.innerHTML = `
      <tr>
        <td colspan="4" class="empty">No hay productos registrados.</td>
      </tr>
    `;
    return;
  }

  productList.innerHTML = products
    .map(
      (product) => `
      <tr>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>RD$ ${Number(product.price).toFixed(2)}</td>
        <td>
          <button type="button" class="edit-btn" data-id="${product.id}">Editar</button>
          <button type="button" class="delete-btn" data-id="${product.id}">Eliminar</button>
        </td>
      </tr>
    `
    )
    .join("");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorMsg.textContent = "";

  const products = getProducts();
  const newProduct = {
    id: Date.now().toString(),
    name: nameInput.value.trim(),
    category: categoryInput.value.trim(),
    price: parseFloat(priceInput.value),
  };

  products.push(newProduct);
  saveProducts(products);
  form.reset();
  renderProducts();
});

renderProducts();