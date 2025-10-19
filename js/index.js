/* Funcion mostrar perfil extraida de index.js */
document.addEventListener("DOMContentLoaded", function(){
    const loggedIn = localStorage.getItem("loggedIn");
    const User = JSON.parse(localStorage.getItem("usuario"));
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

<<<<<<< HEAD
    //modo oscuro o claro
=======
    
  //modo oscuro o claro
>>>>>>> origin/main
     const body = document.body;
    const button = document.getElementById("modeButton");
    //const Filtro = document.getElementById("filter2");
    

   
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      body.classList.replace("light-mode", "dark-mode");
      button.classList.replace("btn-dark", "btn-light");
      button.textContent = "Light Mode";
<<<<<<< HEAD
=======
       toggleMode(true);
>>>>>>> origin/main
    }
 
    let dark = false;
    button.addEventListener("click", () => {
      
     const isDark = body.classList.toggle("dark-mode");
      body.classList.toggle("light-mode", !isDark); 
      if (isDark) {
       
       // Filtro.classList.replace("filtroLight", "filtroDark");
        button.classList.replace("btn-dark", "btn-light");
        button.textContent = "Light Mode";
        localStorage.setItem("theme", "dark");
      } else {
       
        //Filtro.classList.replace("filtroDark", "filtroLight");
        button.classList.replace("btn-light", "btn-dark");
        button.textContent = "Dark Mode";
        localStorage.setItem("theme", "light");
      } 

toggleMode(isDark);
    });
});
<<<<<<< HEAD

=======
>>>>>>> origin/main
function toggleMode(isDark) {

  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText === '.mode') {
          
          if (isDark) {
              rule.style.setProperty('background-color', 'black', 'important');
            rule.style.setProperty('color', 'white', 'important');
          } else {
            rule.style.setProperty('background-color', 'white', 'important');
            rule.style.setProperty('color', 'black', 'important');
          }
        }
      }
    } catch (e) {
      
    }
  }
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
