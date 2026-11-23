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

function resetFormMode() {
  productIdInput.value = "";
  form.reset();
  submitBtn.textContent = "Guardar producto";
  cancelBtn.classList.add("hidden");
  errorMsg.textContent = "";
}

function validateProductInput(name, category, price) {
  if (!name) {
    return "El nombre del producto es obligatorio.";
  }
  if (!category) {
    return "La categoría es obligatoria.";
  }
  if (Number.isNaN(price) || price <= 0) {
    return "El precio debe ser un número mayor que 0.";
  }
  return "";
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

  const cleanName = nameInput.value.trim();
  const cleanCategory = categoryInput.value.trim();
  const parsedPrice = parseFloat(priceInput.value);

  const validationError = validateProductInput(cleanName, cleanCategory, parsedPrice);
  if (validationError) {
    errorMsg.textContent = validationError;
    return;
  }

  const products = getProducts();
  const editingId = productIdInput.value;

  if (editingId) {
    const updatedProducts = products.map((product) =>
      product.id === editingId
        ? {
            ...product,
            name: cleanName,
            category: cleanCategory,
            price: parsedPrice,
          }
        : product
    );
    saveProducts(updatedProducts);
    resetFormMode();
    renderProducts();
    return;
  }

  const newProduct = {
    id: Date.now().toString(),
    name: cleanName,
    category: cleanCategory,
    price: parsedPrice,
  };

  products.push(newProduct);
  saveProducts(products);
  form.reset();
  renderProducts();
});

productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const id = e.target.dataset.id;
    const products = getProducts();
    const productToEdit = products.find((p) => p.id === id);

    if (productToEdit) {
      productIdInput.value = productToEdit.id;
      nameInput.value = productToEdit.name;
      categoryInput.value = productToEdit.category;
      priceInput.value = productToEdit.price;
      submitBtn.textContent = "Actualizar producto";
      cancelBtn.classList.remove("hidden");
      errorMsg.textContent = "";
      nameInput.focus();
    }
    return;
  }

  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;
    const products = getProducts().filter((p) => p.id !== id);
    saveProducts(products);

    if (productIdInput.value === id) {
      resetFormMode();
    }

    renderProducts();
  }
});

cancelBtn.addEventListener("click", () => {
  resetFormMode();
});

renderProducts();