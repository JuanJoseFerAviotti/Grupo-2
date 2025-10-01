const producto = JSON.parse(localStorage.getItem("productoSeleccionado"));
const detalle = document.getElementById("detalle");
const titulo = document.getElementById("listado-autos2");
const titulo2 = document.getElementById("listado-autos1");
const productoId = producto.id;
let productoComentarios = [];
const url = PRODUCT_INFO_COMMENTS_URL + productoId + ".json";
let calificacionSeleccionada = 0;
const stars = document.querySelectorAll('.star');
const form = document.getElementById('formCalificacion');


stars.forEach(star => {
    star.addEventListener('click', function() {
        calificacionSeleccionada = parseInt(this.dataset.rating);
        actualizarEstrellas();
    });
});

function actualizarEstrellas() {
    stars.forEach((star, index) => {
        if (index < calificacionSeleccionada) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}


form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const comentario = document.getElementById('comentario').value;
    if (calificacionSeleccionada === 0) {
        alert('Por favor, selecciona una calificación.');
        return;
    }
    if (comentario.trim() === '') {
        alert('Por favor, escribe un comentario.');
        return;
    }
    const nuevoComentario = {
        user:localStorage.getItem("user"),
        description: comentario,
        score: calificacionSeleccionada,
        dateTime: new Date().toISOString()
    };
    productoComentarios.push(nuevoComentario);
    mostrarComentarios();
    
    alert('Comentario enviado!');
    
    
    form.reset();
    calificacionSeleccionada = 0;
    actualizarEstrellas();
});


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

function mostrarComentarios() {
    const comentarios = document.getElementById('comentarios');
  
    comentarios.innerHTML = '';
    productoComentarios.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
    productoComentarios.forEach(comentario => {
        const fecha = new Date(comentario.dateTime);
        const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
        });
        const comentarioHTML = `
            <div class="comentario">
                <h3 class="usuario">${comentario.user}</h4>
                <label class="descripcion">${comentario.description}</label>
                <label class="fecha">${fechaFormateada}</label>
                <p class="puntuacion" style="text-align: end;">Puntuación: ${convertirEstrellas(comentario.score)}</p>
            </div>
            <hr>    
        `;
        comentarios.innerHTML += comentarioHTML;
    });
}

function convertirEstrellas(vote) {
  let estrellas = Math.round(vote / 2);
  return "★".repeat(estrellas) + "☆".repeat(5 - estrellas);
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productoComentarios = resultObj.data;
            mostrarComentarios();
        }
    });
});