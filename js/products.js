let carsArray = [];



//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCarsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let product = array[i];
        htmlContentToAppend += `
        <div class="EtiquetaDeProductoMain">
            <div class="EtiquetaDeProductoIN">
                <div class="ContenedorImage">
                    <img src="` + product.image + `" alt="` + product.name + `" class="img-thumbnail">
                </div>
                <div class="Descripcion">
                    <div class="ContenedorDescripcion">
                        <div class="Producto">
                        <h4>`+ product.name +`</h4> 
                        <hr>
                        <p class = "precio" ><strong> `+ product.currency + product.cost +`</strong></p>
                        <small class="CantVendidos">` + product.soldCount + ` vendidos</small>
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
}
//Evento que se ejecuta cuando el DOM está completamente cargado
//llama a la función que muestra los productos

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_CARS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carsArray = resultObj.data.products;
            showCarsList(carsArray);
        }
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