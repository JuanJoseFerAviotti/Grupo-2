document.addEventListener("DOMContentLoaded", () => {
  renderCart(); // renderiza ítems
  setupShippingListeners();
  setupPaymentListeners();
  setupCheckoutButton();
  // recalcula envío/totales según opción seleccionada (por defecto)
  updateShippingAndTotals();
});


// reemplazo / añadido: función que renderiza el carrito y botones de eliminar
function renderCart() {
  const cartContainer = document.getElementById("cart-container");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Tu carrito está vacío.🛍️</p>";
    // limpiar resumen
    const CostoTotal = document.getElementById("costo");
    const CostoEnvio = document.getElementById("costoEnvio");
    const TotalPrice = document.getElementById("CostoTotal");
    if (CostoTotal) CostoTotal.textContent = "";
    if (CostoEnvio) CostoEnvio.textContent = "";
    if (TotalPrice) TotalPrice.textContent = "";
    updateCartCount();
    return;
  }

  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const totalCost = item.cost * item.count;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
    <div class="card-total mode mb-3">
      <div class="card-producto container-fluid"> 
        <div class="row align-items-center">
          <div class="col-12 col-sm-3 text-center mb-2 mb-sm-0">
            <img class="card-img img-fluid" src="${item.image}" alt="${item.name}">
          </div>
          <div class="col-12 col-sm-6 mb-2 mb-sm-0">
            <div class="cart-details">
              <div class="cart-name"><h2 class="h5 mb-1">${item.name}</h2></div>
              <div class="mb-1"><h5 class="h6">Precio unitario: ${item.currency} ${item.cost}</h5></div>
              <div class="mb-1 text-muted">${item.description || ''}</div>
            </div>
          </div>
          <div class="col-12 col-sm-3 text-end">
            <div class="card-right d-flex flex-column align-items-end">
              <input type="number" 
                     value="${item.count}" 
                     min="1" 
                     class="cantidad-input form-control mb-2" 
                     data-index="${index}"
                     data-cost="${item.cost}"
                     data-currency="${item.currency}">
              <div class="cart-price mb-2">Total: ${item.currency} ${totalCost}</div>
              <button class="btn btn-sm btn-outline-danger remove-btn" data-index="${index}" title="Eliminar producto">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

    cartContainer.appendChild(cartItem);

    // listeners
    const input = cartItem.querySelector('.cantidad-input');
    input.addEventListener('change', updateItemQuantity);

    const removeBtn = cartItem.querySelector('.remove-btn');
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(removeBtn.dataset.index, 10);
      removeItem(idx);
    });
  });

  // actualizar resumen
  const cartTotal = cart.reduce((sum, item) => sum + (item.cost * item.count), 0);
  const envioC = cart.reduce((sum, item) => sum + (100 * item.count), 0);
  const totalprice = cartTotal + envioC;
  const currency = cart[0].currency || "$";

  const CostoTotal = document.getElementById("costo");
  const CostoEnvio = document.getElementById("costoEnvio");
  const TotalPrice = document.getElementById("CostoTotal");

  if (CostoTotal) CostoTotal.innerHTML = `${currency} ${cartTotal}`;
  // costos de envío y total se actualizan por updateShippingAndTotals (llamada debajo)
  if (CostoEnvio) CostoEnvio.innerHTML = `${currency} ${envioC}`;
  if (TotalPrice) TotalPrice.innerHTML = `${currency} ${totalprice}`;

  updateCartCount();
  // recalcular envíos/totales con la selección actual
  updateShippingAndTotals();
}

// nueva función: eliminar item por índice y re-renderizar
function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (index < 0 || index >= cart.length) return;
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

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
    // actualizar valores base y luego recalcular envío y total final
    updateShippingAndTotals();

    updateCartCount();
}

// Obtiene porcentaje seleccionado (por defecto 5)
function getSelectedShippingPercentage() {
  const sel = document.querySelector('input[name="shippingType"]:checked');
  return sel ? parseFloat(sel.value) : 5;
}

// recalcula costo de envío y total final en base al subtotal y porcentaje seleccionado
function updateShippingAndTotals() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const currency = cart.length > 0 ? cart[0].currency : "$";
  const subtotal = cart.reduce((sum, item) => sum + (item.cost * item.count), 0);
  const pct = getSelectedShippingPercentage();
  const shippingCost = +(subtotal * (pct / 100));
  const total = subtotal + shippingCost;

  const CostoTotal = document.getElementById("costo");
  const CostoEnvio = document.getElementById("costoEnvio");
  const TotalPrice = document.getElementById("CostoTotal");

  if (CostoTotal) CostoTotal.innerHTML = `${currency} ${subtotal.toFixed(2)}`;
  if (CostoEnvio) CostoEnvio.innerHTML = `${currency} ${shippingCost.toFixed(2)}`;
  if (TotalPrice) TotalPrice.innerHTML = `${currency} ${total.toFixed(2)}`;
}

function setupShippingListeners() {
  document.querySelectorAll('.shipping-type').forEach(r => {
    r.addEventListener('change', () => {
      updateShippingAndTotals();
    });
  });
}

function setupPaymentListeners() {
  // por ahora solo placeholder para futura validación visual
  document.querySelectorAll('.payment-type').forEach(r => {
    r.addEventListener('change', () => {
      // se puede mostrar campos extra según método
      // console.log('Pago:', r.dataset.name);
    });
  });
}

function setupCheckoutButton() {
  const btn = document.getElementById('btnComprar');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    // validar dirección mínima
    const department = (document.getElementById('department')?.value || '').trim();
    const locality = (document.getElementById('locality')?.value || '').trim();
    const street = (document.getElementById('street')?.value || '').trim();
    const number = (document.getElementById('number')?.value || '').trim();
    if (!department || !locality || !street || !number) {
      alert('Por favor completa los campos de dirección obligatorios.');
      return;
    }
    const shippingSel = document.querySelector('input[name="shippingType"]:checked');
    const paymentSel = document.querySelector('input[name="paymentType"]:checked');
    const order = {
      cart,
      shipping: { name: shippingSel?.dataset?.name || '', pct: parseFloat(shippingSel?.value || 0) },
      address: {
        department, locality, street, number, corner: (document.getElementById('corner')?.value || '').trim()
      },
      payment: { method: paymentSel?.value || '', name: paymentSel?.dataset?.name || '' },
      date: new Date().toISOString()
    };
    localStorage.setItem('lastOrder', JSON.stringify(order));
    // limpiar carrito y recargar vista
    localStorage.removeItem('cart');
    alert('Compra realizada con éxito.');
    renderCart(); // re-render vacío
  });
}