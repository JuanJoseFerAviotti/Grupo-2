document.addEventListener("DOMContentLoaded", function(){
    const loggedIn = localStorage.getItem("loggedIn");
    const usuario = localStorage.getItem("usuario");
  const usuarioDiv = document.getElementById("my-usuario");
  const nameInput = document.getElementById('nameInput');
    const saveButton = document.getElementById('btn-actualizar-nombre');
  const mynombre = document.getElementById('my-nombre');
   const lastnameInput = document.getElementById('lastnameInput');
    const saveLNButton = document.getElementById('btn-actualizar-lastname');
  const myApellido = document.getElementById('my-apellido');
    const phoneInput = document.getElementById('phoneInput');
    const saveTEButton = document.getElementById('btn-actualizar-telefono');
  const myTelefono = document.getElementById('my-telefono');
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
      mynombre.textContent = `${savedName}`;
    }

    let editingName = false;

    saveButton.addEventListener('click', () => {
      if (!editingName) {
        
        nameInput.style.display = 'inline';
        nameInput.focus();
        saveButton.textContent = 'Guardar';
        editingName = true;
      } else {
       
        const newName = nameInput.value.trim();

        if (newName) {
          localStorage.setItem('Name', newName);
          mynombre.textContent = `${newName}`;
        }

        nameInput.style.display = 'none';
        saveButton.textContent = 'Actualizar';
        editingName = false;
      }
    });
    //actualiza apellido
    const savedApellido = localStorage.getItem('Apellido');
    if (savedApellido) {
      myApellido.textContent = `${savedApellido}`;
    }

    let editingApellido = false;

    saveLNButton.addEventListener('click', () => {
      if (!editingApellido) {

        lastnameInput.style.display = 'inline';
        lastnameInput.focus();
        saveLNButton.textContent = 'Guardar';
        editingApellido = true;
      } else {
       
        const newName = lastnameInput.value.trim();

        if (newName) {
          localStorage.setItem('Apellido', newName);
          myApellido.textContent = `${newName}`;
        }

        lastnameInput.style.display = 'none';
        saveLNButton.textContent = 'Actualizar';
        editingApellido = false;
      }
    });
    //actualiza telefono
    const savedTelefono = localStorage.getItem('Telefono');
    if (savedTelefono) {
      myTelefono.textContent = `${savedTelefono}`;
    }

    let editingTelefono = false;

    saveTEButton.addEventListener('click', () => {
      if (!editingTelefono) {

        phoneInput.style.display = 'inline';
        phoneInput.focus();
        saveTEButton.textContent = 'Guardar';
        editingTelefono = true;
      } else {
       
        const newName = phoneInput.value.trim();

        if (newName) {
          localStorage.setItem('Telefono', newName);
          myTelefono.textContent = `${newName}`;
        }

        phoneInput.style.display = 'none';
        saveTEButton.textContent = 'Actualizar';
        editingTelefono = false;
      }
    });
      // Save on Enter key
    phoneInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveTEButton.click();
    });

    // Block non-numeric input
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
});