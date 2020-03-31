window.addEventListener("load", function() {
  new Glider(document.querySelector(".glider"), {
    slidesToScroll: 1,
    draggable: true,
    duration: 3,
    dragVelocity: 1.5,
    dots: ".dots",
    arrows: {
      prev: ".glider-prev",
      next: ".glider-next"
    },
    responsive: [
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 4
        }
      }
    ]
  });
});

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
