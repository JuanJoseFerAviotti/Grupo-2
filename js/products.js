let carsArray = [];
const categoryId = localStorage.getItem("catID")
const url = PRODUCTS_URL + categoryId + EXT_TYPE;

function showCarsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let product = array[i];
        htmlContentToAppend += `
        <div class="col-sm-12 col-md-6 col-lg-4 producto-item" data-id="` + product.id + `">
        <div class="card h-100 shadow-sm">
          <img src="` + product.image + `" class="card-img-top" alt="` + product.name + `">
          <div class="card-body">
            <h3 class="card-title">`+ product.name +`</h5>
            <p class="card-text">`+ product.description +`</p>
            <p class="text-primary fw-bold">`+ product.currency + product.cost +`</p>
            </div>
                <div class = "compra ">
                    <div class = "subcompra">
                        <p>Añadir a carrito</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
      
        `
        document.getElementById("contenedorDeProductos").innerHTML = htmlContentToAppend; 
    }
       document.querySelectorAll(".producto-item").forEach(item => {
        item.addEventListener("click", () => {
            const id = item.getAttribute("data-id");
            const productoSeleccionado = array.find(p => p.id == id);

            
            localStorage.setItem("productoSeleccionado", JSON.stringify(productoSeleccionado));

            
            window.location.href = "product-info.html";
        });
    });
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carsArray = resultObj.data.products;
            showCarsList(carsArray);
        }
    });
    
/*---------------------Buscador-------------------- */

    document.getElementById("buscarInput").addEventListener("input", (e) => {
        const texto = e.target.value.toLowerCase();

        const filtrados = carsArray.filter(p => 
            p.name.toLowerCase().includes(texto) || 
            p.description.toLowerCase().includes(texto)
        );

        showCarsList(filtrados);
    });
     

/*-----------------------Filtros---------------------*/

    document.getElementById("filterBtn").addEventListener("click", () => {
        let min = parseInt(document.getElementById("minPrice").value) || 0;
        let max = parseInt(document.getElementById("maxPrice").value) || Infinity;

        let filtered = carsArray.filter(p => p.cost >= min && p.cost <= max);
        showCarsList(filtered);
    });

    document.getElementById("clearFilterBtn").addEventListener("click", () => {
        document.getElementById("minPrice").value = "";
        document.getElementById("maxPrice").value = "";
        showCarsList(carsArray);
    });

/* --------------------Ordenamiento---------------------------*/

    document.getElementById("sortAsc").addEventListener("click", () => {
        let sorted = [...carsArray].sort((a, b) => a.cost - b.cost);
        showCarsList(sorted);
    });

    document.getElementById("sortDesc").addEventListener("click", () => {
        let sorted = [...carsArray].sort((a, b) => b.cost - a.cost);
        showCarsList(sorted);
    });

    document.getElementById("sortRel").addEventListener("click", () => {
        let sorted = [...carsArray].sort((a, b) => b.soldCount - a.soldCount);
        showCarsList(sorted);
    });
/* --------------------Ordenamiento---------------------------*/

    document.getElementById("Order1").addEventListener("change", (e) => {
        const value = e.target.value
        let sorted = []
        if (value == 1){
        let sorted = [...carsArray].sort((a, b) => a.cost - b.cost);
        showCarsList(sorted);
        } else if (value==2){
        let sorted = [...carsArray].sort((a, b) => b.cost - a.cost);
        showCarsList(sorted);
        } else if (value==3){
        let sorted = [...carsArray].sort((a, b) => b.soldCount - a.soldCount);
        showCarsList(sorted);
        }
    });
});


/* Funcion mostrar perfil extraida de index.js */
document.addEventListener("DOMContentLoaded", function(){
    const loggedIn = localStorage.getItem("loggedIn");
    const User = JSON.parse(localStorage.getItem("Usuario"));
  const usuarioDiv = document.getElementById("usuarioo");
  console.log("Elemento li:", usuarioDiv);

  if (!loggedIn) {
    window.location.href = "login.html";
  } else {
    usuarioDiv.textContent = User.usuario;
  }


    if (!loggedIn) {

      window.location.href = "login.html";
    }
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});
