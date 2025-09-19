document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const usuario = document.getElementById("usuario").value;
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("usuario", usuario);
      console.log("Guardado en localStorage:", usuario);

      window.location.href = "index.html";
    });
  });