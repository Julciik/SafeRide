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
