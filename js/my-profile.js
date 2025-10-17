document.addEventListener("DOMContentLoaded", function(){
  /* Generales */
  const contenedorInfoVisible = document.getElementById('contenedorDeProfileInfo')
  const contenedorEditable = document.getElementById('contenedorDeProfileInfoEditing')
  const updateButton = document.getElementById('btUpdateP')
  /* Contenedor Visible */
  const TextName = document.getElementById('my-nombre')
  const TextLastName = document.getElementById('my-apellido')
  const TextNumber = document.getElementById('my-telefono')
  const TextEMail = document.getElementById('my-EMail')
  /* Contenedor Editable */
  const InputName = document.getElementById('nameInput')
  const InputLastName = document.getElementById('lastnameInput')
  const InputPhone = document.getElementById('phoneInput')
  const InputEMail = document.getElementById('eMailInput')


  const datosGuardados = JSON.parse(localStorage.getItem("perfilUsuario"));
  if (datosGuardados) {
    TextName.textContent = datosGuardados.nombre;
    TextLastName.textContent = datosGuardados.apellido;
    TextNumber.textContent = datosGuardados.telefono;
    TextEMail.textContent = datosGuardados.email;

    InputName.value = datosGuardados.nombre;
    InputLastName.value = datosGuardados.apellido;
    InputPhone.value = datosGuardados.telefono;
    InputEMail.value = datosGuardados.email;
  }
  /* Estado inicial */
  contenedorInfoVisible.style.display = 'flex'
  contenedorEditable.style.display = 'none'
  updateButton.textContent = 'Editar'
  const perfilUsuario = {
  nombre : InputName.value.trim('Name'),
  apellido : InputLastName.value.trim('LastName'),
  telefono : InputPhone.value.trim(091000000),
  email: InputEMail.value.trim('useremail@example.com')
};
localStorage.setItem("perfilDeUsuario",JSON.stringify(perfilUsuario));
  /* function */

  updateButton.addEventListener('click',()=>{
    
    if (contenedorEditable.style.display === 'none'){
      contenedorInfoVisible.style.display = 'none';
      contenedorEditable.style.display = 'flex';
      updateButton.textContent = 'Guardar';
    
    }else{
      const nombre = InputName.value.trim() || 'Nombre'
      const apellido = InputLastName.value.trim() || 'Apellido'
      const numero = InputPhone.value.trim() || 'Telefono'
      const email = InputEMail.value.trim() || 'EMail'
    
    TextName.textContent = nombre
    TextLastName.textContent = apellido
    TextNumber.TextNumber = numero
    TextEMail.textContent = email
    const perfilUsuario = { nombre, apellido, numero, email };
      localStorage.setItem("perfilUsuario", JSON.stringify(perfilUsuario));
        contenedorInfoVisible.style.display = 'flex'
  contenedorEditable.style.display = 'none'
  updateButton.textContent = 'Editar'
}
    
  })

/* Usuario */

      // Save on Enter key
    phoneInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveTEButton.click();
    });

    // Block non-numeric input
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
});
/* Funcion mostrar perfil extraida de index.js */
document.addEventListener("DOMContentLoaded", function(){
    const loggedIn = localStorage.getItem("loggedIn");
    const usuario = localStorage.getItem("usuario");
  const usuarioDiv = document.getElementById("usuarioo");
  console.log("Elemento li:", usuarioDiv);

  if (!loggedIn) {
    window.location.href = "login.html";
  } else {
    usuarioDiv.textContent =`${usuario}`;
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
