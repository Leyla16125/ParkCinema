const duration = 180; 
    const progressBar = document.getElementById("progressBar");
    const timerDisplay = document.getElementById("timer");

    let start = Date.now();

    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const remaining = Math.max(0, duration - elapsed);
      const percentage = (elapsed / duration) * 100;

      progressBar.style.width = `${percentage}%`;

      const min = Math.floor(remaining / 60);
      const sec = Math.floor(remaining % 60).toString().padStart(2, "0");
      timerDisplay.textContent = `${min}:${sec}`;

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 100); 
    setTimeout(() => {
      if (window.location.pathname.endsWith('index.htm')) {
        window.location.reload();
      } else {
        window.location.href = 'index.htm';
      }
    }, getMillisecondsUntilMidnight());
    

    function showToast(message) {
      const toast = document.getElementById("toast");
      const toastText = document.getElementById("toastText");
      toastText.textContent = message;
      toast.classList.remove("hidden");

      setTimeout(() => {
        toast.classList.add("hidden");
      }, 3000);
    }

    function validateForm() {
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const terms = document.getElementById("terms").checked;

      if (!email) {
        showToast("Email daxil edin");
        return;
      }

      if (!phone) {
        showToast("Telefon nömrəsi daxil edin");
        return;
      }

      if (!terms) {
        showToast("Şərtləri qəbul edin");
        return;
      }

      alert("Form uğurla göndərildi!");
    }