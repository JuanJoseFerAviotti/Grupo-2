const producto = JSON.parse(localStorage.getItem("productoSeleccionado"));
const detalle = document.getElementById("detalle");
const titulo = document.getElementById("listado-autos2");
const titulo2 = document.getElementById("listado-autos1");

    if (producto) {
      detalle.innerHTML = `
        
        <img src="${producto.image}" alt="${producto.name}" class="img-info" >
        <div id="Descripciontotal"> 
        <p id="precio"> ${producto.currency} ${producto.cost}</p>
        
        <p id="vendidos"><b>Vendidos:</b> ${producto.soldCount}</p>
        <h2 id=Tdesc>Descripcion </h2>
        <p id="descripcion"> ${producto.description}</p>
        </div>
        
      `;
      titulo.innerHTML = `<h2>${producto.name}</h2>`;
      titulo2.innerHTML = `<h2>${producto.name}</h2>`;
    } else {
      detalle.textContent = "No se encontró información del producto.";
    }
    
const desplegable = document.querySelector(".menu-desplegable");
const navMenu = document.querySelector(".navbar-nav");

desplegable.addEventListener("click", () => {
    desplegable.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    desplegable.classList.remove("active");
    navMenu.classList.remove("active");
}));