const hamburger = document.querySelector(".nav__hamburger"),
  menu = document.querySelector(".header__nav");

hamburger.addEventListener("click", function() {
  menu.classList.toggle("header__nav--open");
});
