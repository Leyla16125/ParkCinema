const id = new URLSearchParams(location.search).get("id");
const choosenMovie = document.getElementById("choosenMovie");
const payButton = document.getElementById("payButton");
const selectedSeats = []; 

fetch("https://data-woad-kappa.vercel.app/landing")
  .then(res => res.json())
  .then(data => {
    const movie = data.find(item => item.id === id);
    if (!movie) return;

    const bgUrl = `https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${movie.image}&w=640&q=75`;

    choosenMovie.innerHTML += `
      <div class="flex flex-row gap-4 w-full text-white p-2 sm:p-4">
        <div class="w-[100px] sm:w-[120px] aspect-[2/3] rounded-xl overflow-hidden flex-shrink-0">
          <img src="${bgUrl}" alt="${movie.name}" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-col justify-between text-sm w-full">
          <div class="flex flex-col gap-1 sm:gap-2 text-xs sm:text-sm">
            <h1 class="text-base sm:text-lg font-semibold">${movie.name}</h1>
            <div class="font-medium">2D</div>
            <p class="flex items-center gap-2">
              <img src="img/date.svg" class="w-[12px] sm:w-[14px]" alt="date"> 05.05.2025
            </p>
            <p class="flex items-center gap-2">
              <img src="img/time.svg" class="w-[12px] sm:w-[14px]" alt="time"> 23:55
            </p>
          </div>
          <div class="flex flex-col gap-[2px] sm:gap-1 mt-2 text-xs sm:text-sm">
            <p><span class="font-semibold">Dil:</span> ${movie.languages.join(", ")}</p>
            <p><span class="font-semibold">Kinoteatr:</span> Metro Park</p>
            <p><span class="font-semibold">Zal:</span> 5</p>
            <p><span class="font-semibold">Müddət:</span> 01:50:00</p>
          </div>
        </div>
      </div>`;
  });

const rowData = {
  12: [17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
  11: ['','',13,12,11,10,9,8,7,6,5,4,3,'','',2,1],
  10: ['','',13,12,11,10,9,8,7,6,5,4,3,'','',2,1],
  9:  ['','',13,12,11,10,9,8,7,6,5,4,3,'','',2,1],
  8:  ['','',13,12,11,10,9,8,7,6,5,4,3,'','',2,1],
  7:  ['','',13,12,11,10,9,8,7,6,5,4,3,'','',2,1],
  6:  ['','',11,10,9,8,7,6,5,4,3,2,1],
  5:  ['','',11,10,9,8,7,6,5,4,3,2,1],
  4:  ['','',11,10,9,8,7,6,5,4,3,2,1],
  3:  ['','',11,10,9,8,7,6,5,4,3,2,1],
  2:  ['','',11,10,9,8,7,6,5,4,3,2,1],
  1:  ['','','',10,9,8,7,6,5,4,3,2]
};

let seat = "";
for (let i = 12; i >= 1; i--) {
  let row = `<div class="flex gap-1 items-center">`;
  row += `<div class="w-6 text-right mr-2 text-white">${i}</div>`;
  row += `<div class="flex flex-wrap gap-1">`;

  rowData[i].forEach(num => {
    const isInvisible = num === '' ? 'invisible' : '';
    row += `<div 
      class="seat relative w-10 h-10 rounded-md bg-gray-200 text-black flex items-center justify-center transition cursor-pointer ${isInvisible}" 
      onclick="showPopup(this, '${num}')">${num}</div>`;
  });

  row += `</div></div>`;
  seat += row;
}

document.getElementById("grid").innerHTML = seat;

payButton.innerHTML = `
  <button onclick="handlePaymentClick()" class="flex items-center justify-center bg-[#D52B1E] rounded-[20px] sm:w-[250px] h-[36px] text-[#D9DADB] max-md:w-full max-w-container max-md:mx-auto max-sm:leading-3 cursor-pointer">Bilet Al</button>`;


let zoomLevel = 1;
const grid = document.getElementById("grid");

function zoomIn() {
  zoomLevel = Math.min(2, zoomLevel + 0.1);
  grid.style.transform = `scale(${zoomLevel})`;
}
function zoomOut() {
  zoomLevel = Math.max(0.5, zoomLevel - 0.1);
  grid.style.transform = `scale(${zoomLevel})`;
}

let selectedSeat = null;

function showPopup(el, seatNumber) {
  selectedSeat = el;
  const popup = document.getElementById("popup");
  popup.style.display = "block";

  const rect = el.getBoundingClientRect();
  popup.style.top = `${rect.top + scrollY - 10}px`;
  popup.style.left = `${rect.left + scrollX + 30}px`;
}

function selectType(type) {
  if (!selectedSeat) return;

  selectedSeat.classList.remove("bg-gray-200", "text-black");
  selectedSeat.classList.add("bg-[rgb(213_43_30)]", "text-white");


  const exists = selectedSeats.find(seat => seat.element === selectedSeat);
  if (!exists) {
    selectedSeats.push({
      element: selectedSeat,
      type: type,
      price: type === "Ailə" ? 5 : 7
    });
  }

  document.getElementById("popup").style.display = "none";
  updateTotalPrice();
}

function updateTotalPrice() {
  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  document.getElementById("price").innerText = `${total} AZN`;
}

function closePopup(event) {
  const popup = document.getElementById("popup");
  if (!popup.contains(event.target) && !event.target.classList.contains("seat")) {
    popup.style.display = "none";
  }
}
function handlePaymentClick() {
  if (selectedSeats.length === 0) {
    showToast("Zəhmət olmasa oturacaq seçin");
  } else {
    location.href = "pay.htm";
  }
}
function showToast(message) {
  const test = document.getElementById("test");
  const testText = document.getElementById("testText");

  testText.innerText = message;
  test.classList.remove("hidden");
  test.classList.add("flex");

  setTimeout(() => {
    test.classList.add("hidden");
    test.classList.remove("flex");
  }, 3000);
}
function handlePaymentClick() {
  if (selectedSeats.length === 0) {
    showToast("Zəhmət olmasa oturacaq seçin");
  } else {
    const id = new URLSearchParams(location.search).get("id");
    location.href = `pay.htm?id=${id}`;
  }
}
function updateTotalPrice() {
  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const formattedPrice = `${total} AZN`;

  document.getElementById("price").innerText = formattedPrice;

  localStorage.setItem("totalPrice", formattedPrice);
}

