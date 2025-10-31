document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");

  // Load cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if cart is empty
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 🛍️</p>";
    return;
  }

  // Group products by ID
  const grouped = {};
  cart.forEach(item => {
    if (!grouped[item.id]) {
      grouped[item.id] = { ...item, quantity: 1 };
    } else {
      grouped[item.id].quantity++;
    }
  });

  // Convert to array for easier iteration
  const groupedItems = Object.values(grouped);

  // Clear old content
  cartContainer.innerHTML = "";

  // Display each grouped item
  groupedItems.forEach(item => {
    const totalCost = item.cost * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
    <div class="card-total mode">
    <div class="card-producto"> 
      <img  class="card-img" src="${item.image}" alt="${item.name}">
      <div class="cart-details">
        <div class="cart-name">${item.name}</div>
        <div>${item.description}</div>
       
        <div>Unit Price: ${item.currency} ${item.cost}</div>

      </div> <div class="card-right" style="left:0; width: 150px; flex-direction: column; align-items: flex-end;">
     <h4>${item.quantity}</h4>
      <div class="cart-price">Total: ${item.currency} ${totalCost}</div>
      </div></div>
      </div>
    `;

    cartContainer.appendChild(cartItem);
  });

  // Optional: show total of all products
  const cartTotal = groupedItems.reduce((sum, item) => sum + (item.cost * item.quantity), 0);
const envioC = groupedItems.reduce((sum, item) => sum + (100 * item.quantity), 0);
const totalprice = cartTotal + envioC;

const currency = groupedItems[0].currency || "$";

// Get existing elements
const CostoTotal = document.getElementById("costo");
const CostoEnvio = document.getElementById("costoEnvio");
const TotalPrice = document.getElementById("CostoTotal");

// Update their innerHTML directly
if (CostoTotal) CostoTotal.innerHTML = `${currency} ${cartTotal}`;
if (CostoEnvio) CostoEnvio.innerHTML = `${currency} ${envioC}`;
if (TotalPrice) TotalPrice.innerHTML = `${currency} ${totalprice}`;

updateCartCount();
 });
 

function updateCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countEl = document.getElementById("cart-count");
    if (countEl) {
      countEl.textContent = cart.length;
      // si no hay items, ocultar badge para evitar 0 brillante (opcional)
      countEl.style.display = cart.length > 0 ? 'inline-block' : 'none';
    }
  } catch (e) {
    // en caso de error de parseo, eliminar clave incorrecta y resetear badge
    localStorage.removeItem("cart");
    const countEl = document.getElementById("cart-count");
    if (countEl) {
      countEl.textContent = 0;
      countEl.style.display = 'none';
    }
  }
}

// Modo oscuro/claro
const body = document.body;
    const button = document.getElementById("modeButton");
  

   
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      body.classList.replace("light-mode", "dark-mode");
      button.classList.replace("btn-dark", "btn-light");
      button.textContent = "Light Mode";
       toggleMode(true);
    }
 
    let dark = false;
    button.addEventListener("click", () => {
      
     const isDark = body.classList.toggle("dark-mode");
      body.classList.toggle("light-mode", !isDark); 
      if (isDark) {
       
      
        button.classList.replace("btn-dark", "btn-light");
        button.textContent = "Light Mode";
        localStorage.setItem("theme", "dark");
      } else {
       
        
        button.classList.replace("btn-light", "btn-dark");
        button.textContent = "Dark Mode";
        localStorage.setItem("theme", "light");
      } 

toggleMode(isDark);
});
function toggleMode(isDark) {

  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText === '.mode') {
          
          if (isDark) {
              rule.style.setProperty('background-color', 'black', 'important');
            rule.style.setProperty('color', 'white', 'important');
          } else {
            rule.style.setProperty('background-color', 'white', 'important');
            rule.style.setProperty('color', 'black', 'important');
          }
        }
      }
    } catch (e) {
      
    }
  }
}