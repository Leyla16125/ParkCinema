const id = new URLSearchParams(location.search).get("id");
const choosenMovie = document.getElementById("choosenMovie")
const payButton = document.getElementById("payButton")

fetch("https://data-woad-kappa.vercel.app/landing")
  .then(res => res.json())
  .then(data => {
    const movie = data.find(item => item.id === id);
    if (!movie) return;

    const main = document.querySelector("main");
    const bgUrl = `https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${movie.image}&w=640&q=75`;

    const actorsStr = movie.actors.join(", ");
    const ageStr = movie.ageLimit === "SIX" ? "6+" :
                   movie.ageLimit === "TWELVE" ? "12+" :
                   movie.ageLimit === "SIXTEEN" ? "16+" :
                   movie.ageLimit === "EIGHTEEN" ? "18+" :
                   movie.ageLimit;


    choosenMovie.innerHTML +=  `
            <div class="h-full w-[30%] max-w-[120px] rounded-xl overflow-hidden">
                <img src="${bgUrl}" alt="Patrul" class="w-full h-full object-cover">
              </div>
        
              <div class="flex flex-col justify-between text-sm w-full max-w-[70%]">
                <div class="flex flex-col gap-2">
                  <h1 class="text-lg font-semibold">${movie.name}</h1>
                  <div class="text-base font-semibold">2D</div>
                  <p class="flex items-center gap-2">
                    <img src="img/date.svg" class="w-[14px]" alt="date">
                    05.05.2025
                  </p>
                  <p class="flex items-center gap-2">
                    <img src="img/time.svg" class="w-[14px]" alt="time">
                    23:55
                  </p>
                </div>
        
                <div class="flex flex-col gap-1 text-sm mt-2">
                  <p><span class="font-semibold">Dil:</span> ${movie.languages.join(", ")}</p>
                  <p><span class="font-semibold">Kinoteatr:</span> Metro Park</p>
                  <p><span class="font-semibold">Zal:</span>5</p>
                  <p><span class="font-semibold">Müddət:</span> 01:50:00</p>
                </div>
              </div>`

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
                class="seat w-10 h-10 rounded-md bg-gray-200 text-black flex items-center justify-center transition cursor-pointer ${isInvisible}" 
                onclick="toggleColor(this)"
              >${num}</div>`;
    });

    row += `</div></div>`;
    seat += row;
  }

  document.getElementById("grid").innerHTML = seat;

  function toggleColor(el) {
    el.classList.toggle('bg-[rgb(213_43_30)]');
    el.classList.toggle('text-white');
    el.classList.toggle('bg-gray-200');
    el.classList.toggle('text-black');
  }
  
payButton.innerHTML = `
                <button class="flex items-center justify-center bg-[#D52B1E]  rounded-[20px] sm:w-[250px] h-[36px] text-[#D9DADB] max-md:w-full max-w-container max-md:mx-auto max-sm:leading-3 cursor-pointer">
                  <a href="pay.htm">Bilet Al</a>
                </button>`
