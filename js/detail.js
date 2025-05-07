const id = new URLSearchParams(location.search).get("id");
const aboutMovie = document.getElementById("aboutMovie")

fetch("https://data-woad-kappa.vercel.app/landing")
  .then(res => res.json())
  .then(data => {
    const movie = data.find(item => item.id === id);
    if (!movie) return;

    const main = document.querySelector("main");
    const bgUrl = `https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${movie.image}&w=640&q=75`;
    const youtubeEmbedUrl = movie.youtubeUrl.replace("watch?v=", "embed/");

    const actorsStr = movie.actors.join(", ");
    const ageStr = movie.ageLimit === "SIX" ? "6+" :
                   movie.ageLimit === "TWELVE" ? "12+" :
                   movie.ageLimit === "SIXTEEN" ? "16+" :
                   movie.ageLimit === "EIGHTEEN" ? "18+" :
                   movie.ageLimit;

    aboutMovie.innerHTML = `
      <div class="px-8 py-4 text-white">
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <img src="${bgUrl}" class="hidden md:block rounded-xl shadow-xl w-full md:w-[300px] h-[460px]" />
          <div class="flex flex-col gap-2">
            <p class="text-xl font-bold">${movie.name}</p>
            <p class="text-sm opacity-80 text-[#D9DADB]>${movie.genres[0].title}</p>
           <p class="font-medium">Dil</p>
                <div class="flex gap-2">
                ${movie.languages.map(lang => `
                    <img src="img/${lang.toLowerCase()}-flag.svg" class="w-6 h-6 rounded-full" />
                `).join('')}
                </div>
            <p class="font-medium">Altyazı</p>
                <div class="flex gap-2">
                ${movie.subtitles.map(sub => `
                    <img src="img/${sub.toLowerCase()}-flag.svg" class="w-6 h-6 rounded-full" />
                `).join('')}
                </div>
            <p class="text-[#D9DADB]"><span class="font-medium text-white">Ölkə: </span>${movie.country}</p>
            <p class="text-[#D9DADB]"><span class="font-medium text-white">Rejissor: </span>${movie.director}</p>
            <p class="text-[#D9DADB]"><span class="font-medium text-white">Aktyorlar: </span>${actorsStr}</p>
            <p class="text-[#D9DADB]"><span class="font-medium text-white">Yaş Həddi: </span>${ageStr}</p>
            <p class="text-[#D9DADB]"><span class="font-medium text-white">Nümayiş Tarixi: </span>${movie.director}</p>
          </div>
        </div>
        <div class="mt-10"><p class="text-[#D9DADB]">${movie.description}</p></div>
        
      </div>
    `;
    ytLink.innerHTML = `
      <div class="aspect-video rounded-xl overflow-hidden shadow-xl w-full">
        <iframe class="w-full h-full" src="${youtubeEmbedUrl}" frameborder="0" allowfullscreen></iframe>
      </div>
    `;
  });



  function applyButtonRedirect() {
    const buttons = document.querySelectorAll("button");
  
    buttons.forEach(btn => {
      if (btn.textContent.trim() === "Bilet Al") {
        btn.onclick = function () {
          location.href = `hall.htm?id=${id}`;
        };
      }
    });
  }
  setTimeout(applyButtonRedirect, 500);
  