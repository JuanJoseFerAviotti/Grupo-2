let carsArray = [];
const categoryId = localStorage.getItem("catID")
const url = PRODUCTS_URL + categoryId + ".json";



//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCarsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let product = array[i];
        htmlContentToAppend += `
             <div class="list-group-item list-group-item-action producto-item" data-id="${product.id}">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="` + product.name + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name +`</h4> 
                        <hr>
                        <p class = "precio" ><strong> `+ product.currency + product.cost +`</strong></p>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        <p> `+ product.description +`</p> 
                        
                        </div>
                         
                    </div>

                </div>
            </div>
            <div class = "compra">
                <div class = "subcompra">
                    <p>Añadir a carrito</p>
                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
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


//Evento que se ejecuta cuando el DOM está completamente cargado
//llama a la función que muestra los productos

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carsArray = resultObj.data.products;
            showCarsList(carsArray);
        }
    });
    


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

    //Ordenamientos
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
});

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