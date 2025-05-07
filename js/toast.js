function showToast(message) {
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toastText");
  
    if (!toast || !toastText) return;
  
    toastText.innerText = message;
    toast.classList.remove("hidden");
    toast.classList.add("flex");
  
    setTimeout(() => {
      toast.classList.add("hidden");
      toast.classList.remove("flex");
    }, 3000);
  }
  