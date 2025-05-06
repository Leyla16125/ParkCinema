function toggleMenu() {
    const menu = document.getElementById("allmenu");
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  }


  function toggleMobileMenu() {
    const overlay = document.getElementById("menuOverlay");
    const menu = document.getElementById("mobileMenu");
    const button = document.getElementById("menuButton");

    overlay.classList.remove("hidden");
    setTimeout(() => {
      menu.classList.remove("translate-y-full");
      button.classList.add("hidden");
    }, 10);
  }

  function closeMobileMenu() {
    const overlay = document.getElementById("menuOverlay");
    const menu = document.getElementById("mobileMenu");
    const button = document.getElementById("menuButton");

    menu.classList.add("translate-y-full");
    setTimeout(() => {
      overlay.classList.add("hidden");
      button.classList.remove("hidden");
    }, 300);
  }
