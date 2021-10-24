const change_password = document.getElementById("change_password");
const change_password_container = document.querySelector(".change-password");
let gonnaChange = false;
change_password.addEventListener("click", () => {
  gonnaChange = !gonnaChange;
  if (gonnaChange) {
    change_password_container.style.display = "block";
    change_password.innerText = "Cancelar";
  } else {
    change_password_container.style.display = "none";
    change_password.innerText = "Cambiar contraseña";
  }
});

const enterOldPassword = document.getElementById("old_pass");
const query = window.location.search;
const urlParam = new URLSearchParams(query);
const matchPassword = urlParam.get("p");
localStorage.setItem("pass", matchPassword);
if (localStorage.getItem("pass") === "null") {
  console.log(localStorage.getItem("pass"))
} else {
  if (matchPassword === "t") {
    changePassword();
  } else {
    swal("Lo sentimos", "La contraseña no coincide", "error", {
      button: "Continuar",
    });
  }
}
enterOldPassword.addEventListener("keyup", async (e) => {
  window.location.href = `/verify/${e.target.value}`;
});

function changePassword() {
  swal({
    content: {
      element: "input",
      attributes: {
        placeholder: "Nueva contraseña",
        type: "password",
      },
    },
    button: { text: "Cambiar ahora" },
  }).then((newPassword) => {
    if (!newPassword) {
      swal("Error", "El campo no puede estar vacío", "error", {
        button: "Cerrar",
      });
      return;
    }
    window.location.href = `/changePassword/${newPassword}`;
  });
}
