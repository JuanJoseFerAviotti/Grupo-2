document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const logUser = document.getElementById("usuario")
    const nombre = 'Nombre'
    const apellido = 'Apellido'
    const numero = 'Telefono'
    const email = 'EMail'
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      
      
      const usuario = {
        usuario : logUser.value.trim(),
        nombre : 'Nombre',
        apellido : 'Apellido',
        numero : 'Telefono',
        email: 'EMail'
      };
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("Usuario",JSON.stringify(usuario));
      console.log("Guardado en localStorage:", usuario);

      window.location.href = "index.html";
    });
  });
  