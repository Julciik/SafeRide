let hamburger = document.querySelector(".nav__hamburger"),
  menu = document.querySelector(".header__nav");

hamburger.addEventListener("click", function() {
  menu.classList.toggle("header__nav--open");
});

window.addEventListener("scroll", function() {
  if (window.pageYOffset > 0) {
    menu.classList.add("header__nav--fixed");
  } else {
    menu.classList.remove("header__nav--fixed");
  }
});
