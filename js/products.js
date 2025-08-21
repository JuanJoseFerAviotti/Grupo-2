let carsArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCarsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let product = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="` + product.name + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name +`</h4> 
                        <p> `+ product.description +`</p> 
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        <p><strong> `+ product.currency + product.cost +`</strong></p>
                        </div>
                         
                    </div>

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