const sessionTableBody = document.getElementById("sessionTableBody");

fetch("https://data-woad-kappa.vercel.app/detail")
  .then(res => res.json())
  .then(data => {
    data.forEach(zal => {
      sessionTableBody.innerHTML += `
        <tr class="border-b border-[#D9DADB] bg-[#383838] transition text-[10px] md:text-sm">
            <td class="py-4 px-1 sm:py-3 sm:px-2 text-white">${zal.time}</td>
            <td class="py-4 px-1 sm:py-3 sm:px-2 text-white whitespace-nowrap">
                ${zal.theatreTitle} | Zal: 
                ${zal.hallTitle.includes('VIP') ? `<span class="text-yellow-400 font-bold">VIP</span>` : zal.hallTitle}
            </td>
            <td class="py-4 px-1 sm:py-3 sm:px-1 text-white">2D</td>
            <td class="py-4 px-1 sm:py-3 sm:px-1 text-center">
                <img src="https://flagcdn.com/w40/${zal.language === 'ru' ? 'ru' : 'az'}.png" class="w-4 sm:w-5 inline-block" />
            </td>
            <td class="py-4 px-1 sm:py-3 sm:px-1">
                <button class="border border-white text-white px-1 py-0.5 rounded text-[9px] leading-tight">AZE<br><span class="text-[7px]">sub</span></button>
            </td>
            <td class="py-4 px-1 sm:py-3 sm:px-1 text-end pr-0">
            <button class="flex items-center justify-center cursor-pointer
                text-white text-sm rounded-[20px] ml-auto mr-0
                 w-[100px] h-[36px] px-4 py-2  
                bg-[#C02020] hover:bg-[#A81A1A] 
                opacity-65 hover:opacity-100 transition duration-200 
                md:w-[160px] max-sm:w-[50px] max-sm:px-1 max-sm:py-1 max-sm:text-[12px] max-sm:leading-2">
                Bilet Al
            </button>
            </td>
        </tr>`
      ;
    });
  });   