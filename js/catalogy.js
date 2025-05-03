const catalogy = document.getElementById("catalogy");

function formatAgeLimit(ageWord) {
  if (ageWord === "SIX") {
    return "6+";
  } else if (ageWord === "TWELVE") {
    return "12+";
  } else if (ageWord === "SIXTEEN") {
    return "16+";
  } else if (ageWord === "EIGHTEEN") {
    return "18+";
  } else {
    return ageWord;
  }
}

fetch("https://data-woad-kappa.vercel.app/landing")
  .then(res => res.json())
  .then(data => {
    data.forEach(landing => {
      const bgUrl = `https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${landing.image}&w=640&q=75`;
      

      catalogy.innerHTML += `
              <a href="detail.htm?id=${landing.id}" class="group block relative rounded-xl overflow-hidden shadow-lg bg-[#1c1c1e] h-[500px] w-full">
                <div class="w-full h-full overflow-hidden">
                  <div class="w-full h-full bg-cover bg-center transform transition-transform duration-500 ease-in-out group-hover:scale-110" 
                      style="background-image: url('${bgUrl}')">
                  </div>
                </div>

                <div class="absolute bottom-0 w-full text-white p-4 bg-gradient-to-t from-black/90 to-transparent z-10">
                  <h2 class="text-[22px] font-semibold">${landing.name}</h2>
                  <p class="text-sm">${new Date(landing.firstScreeningDate).toLocaleDateString()}</p>
                  <div class="flex items-center justify-between">
                    <p class="text-sm">${formatAgeLimit(landing.ageLimit)}</p>
                    <div class="flex gap-1 mt-1">
                      ${landing.languages.map(lang => `
                        <img src="img/${lang.toLowerCase()}-flag.svg" class="w-5 h-5" alt="${lang}">
                      `).join('')}
                    </div>
                  </div>
                </div>
              </a>
            `;

    });
  })

