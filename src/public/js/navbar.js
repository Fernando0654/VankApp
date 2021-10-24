const navbar_btn = document.querySelector(".navbar-icon");
const navbar_content = document.querySelector(".nav");
const navicon = document.querySelector('.navicon');
const layer = document.querySelector('.wrapper-layer');
let navbar_is_open = false;

navbar_btn.addEventListener("click", toggleNavbar);
layer.addEventListener("click", toggleNavbar);

function toggleNavbar() {
    navbar_is_open = !navbar_is_open;
    if (navbar_is_open) {
      navbar_content.style.display = "flex";
      navicon.classList = "fa fa-times navicon";
      layer.style.display = "block";
    } else {
      navbar_content.style.display = "none";
      navicon.classList = "fa fa-bars navicon";
      layer.style.display = "none";
    }
}