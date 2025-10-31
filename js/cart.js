document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Tu carrito está vacío.🛍️</p>";
    return;
  }
  cartContainer.innerHTML = "";

  
  cart.forEach((item, index) => {
    const totalCost = item.cost * item.count;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
    <div class="card-total mode">
      <div class="card-producto container-fluid"> 
        <div class="row align-items-center">
          <div class="col-12 col-sm-3 text-center mb-2 mb-sm-0">
            <img class="card-img img-fluid" src="${item.image}" alt="${item.name}">
          </div>
          
          <div class="col-12 col-sm-6 mb-2 mb-sm-0">
            <div class="cart-details">
              <div class="cart-name"><h2 class="h5">${item.name}</h2></div>
              <div><h5 class="h6">Precio unitario: ${item.currency} ${item.cost}</h5></div>
            </div>
          </div>
          
          <div class="col-12 col-sm-3 text-end">
            <div class="card-right">
              <input type="number" 
                     value="${item.count}" 
                     min="1" 
                     class="cantidad-input form-control mb-2" 
                     data-index="${index}"
                     data-cost="${item.cost}"
                     data-currency="${item.currency}">
              <div class="cart-price">Total: ${item.currency} ${totalCost}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
`;

    cartContainer.appendChild(cartItem);

    
    const input = cartItem.querySelector('.cantidad-input');
    input.addEventListener('change', updateItemQuantity);
  });

const cartTotal = cart.reduce((sum, item) => sum + (item.cost * item.count), 0);
const envioC = cart.reduce((sum, item) => sum + (100 * item.count), 0);
const totalprice = cartTotal + envioC;

const currency = cart[0].currency || "$";

const CostoTotal = document.getElementById("costo");
const CostoEnvio = document.getElementById("costoEnvio");
const TotalPrice = document.getElementById("CostoTotal");

if (CostoTotal) CostoTotal.innerHTML = `${currency} ${cartTotal}`;
if (CostoEnvio) CostoEnvio.innerHTML = `${currency} ${envioC}`;
if (TotalPrice) TotalPrice.innerHTML = `${currency} ${totalprice}`;

updateCartCount();
 });
 

function updateCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.count, 0);
        cartCount.textContent = totalItems;
    }
  } catch (e) {
    localStorage.removeItem("cart");
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = 0;
      cartCount.style.display = 'none';
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

// Función para actualizar cantidad y totales
function updateItemQuantity(e) {
    const input = e.target;
    const newCount = parseInt(input.value);
    const itemIndex = parseInt(input.dataset.index);
    const cost = parseFloat(input.dataset.cost);
    const currency = input.dataset.currency;

    if (newCount < 1) {
        input.value = 1;
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[itemIndex].count = newCount;
    localStorage.setItem("cart", JSON.stringify(cart));

    const cartPrice = input.parentElement.querySelector('.cart-price');
    const totalCost = cost * newCount;
    cartPrice.textContent = `Total: ${currency} ${totalCost}`;

    const cartTotal = cart.reduce((sum, item) => sum + (item.cost * item.count), 0);
    const envioC = cart.reduce((sum, item) => sum + (100 * item.count), 0);
    const totalprice = cartTotal + envioC;

    const CostoTotal = document.getElementById("costo");
    const CostoEnvio = document.getElementById("costoEnvio");
    const TotalPrice = document.getElementById("CostoTotal");

    if (CostoTotal) CostoTotal.innerHTML = `${currency} ${cartTotal}`;
    if (CostoEnvio) CostoEnvio.innerHTML = `${currency} ${envioC}`;
    if (TotalPrice) TotalPrice.innerHTML = `${currency} ${totalprice}`;

    updateCartCount();
}