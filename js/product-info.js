const producto = JSON.parse(localStorage.getItem("productoSeleccionado"));
    const detalle = document.getElementById("detalle");

    if (producto) {
      detalle.innerHTML = `
        <h2>${producto.name}</h2>
        <img src="${producto.image}" alt="${producto.name}" class="img-thumbnail" style="max-width:300px">
        <p><b>Precio:</b> ${producto.currency} ${producto.cost}</p>
        <p><b>Vendidos:</b> ${producto.soldCount}</p>
        <p><b>Descripción:</b> ${producto.description}</p>
      `;
    } else {
      detalle.textContent = "No se encontró información del producto.";
    }