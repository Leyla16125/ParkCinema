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
      if (location.pathname.endsWith('index.htm')) {
        location.reload();
      } else {
        location.href = 'index.htm';
      }
    }, getMillisecondsUntilMidnight());
    
    function getMillisecondsUntilMidnight() {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); 
      return midnight - now;
    }
    
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
    const id = new URLSearchParams(location.search).get("id");

fetch("https://data-woad-kappa.vercel.app/landing")
  .then(res => res.json())
  .then(data => {
    const movie = data.find(item => item.id === id);
    if (!movie) return;

    const summaryBox = document.getElementById("summaryBox");
    summaryBox.innerHTML = `
      <p class="text-lg font-semibold">${movie.name}</p>
      <p>Metro Park</p>
      <p>07.05.2025 09:10</p>
      <p>Zal: 6</p>
      <p class="mt-4 font-bold">Ümumi: <span id="totalPrice">0 AZN</span></p>
    `;
    const savedPrice = localStorage.getItem("totalPrice");
if (savedPrice) {
  document.getElementById("totalPrice").innerText = savedPrice;
}

  });
  const savedPrice = localStorage.getItem("totalPrice");
  if (savedPrice) {
    document.getElementById("totalPrice").innerText = savedPrice;
  }
  