document.addEventListener("DOMContentLoaded", function(){
    const loggedIn = localStorage.getItem("loggedIn");
    const usuario = localStorage.getItem("usuario");
  const usuarioDiv = document.getElementById("my-usuario");
  const nameInput = document.getElementById('nameInput');
    const saveButton = document.getElementById('btn-actualizar-nombre');
  const greeting = document.getElementById('my-nombre');
    console.log("Elemento li:", usuarioDiv);

  if (!loggedIn) {
    window.location.href = "login.html";
  } else {
    usuarioDiv.textContent =`${usuario}`;
  }


    if (!loggedIn) {

      window.location.href = "login.html";
    }
  //actualiza nombre
   const savedName = localStorage.getItem('Name');
    if (savedName) {
      greeting.textContent = `${savedName}`;
    }

    let editing = false;

    saveButton.addEventListener('click', () => {
      if (!editing) {
        
        nameInput.style.display = 'inline';
        nameInput.focus();
        saveButton.textContent = 'Guardar';
        editing = true;
      } else {
       
        const newName = nameInput.value.trim();

        if (newName) {
          localStorage.setItem('Name', newName);
          greeting.textContent = `${newName}`;
        }

        nameInput.style.display = 'none';
        saveButton.textContent = 'Actualizar';
        editing = false;
      }
    });
});