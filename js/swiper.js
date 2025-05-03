const desktopSwiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 800, 
    navigation: {
      nextEl: ".desktop-next",
    },
  });
  
  const mobileSwiper = new Swiper(".mobileSwiper", {
    loop: true,
    speed: 800, 
    navigation: {
      nextEl: ".mobile-next",
    },
  });
  