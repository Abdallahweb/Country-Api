const header=document.getElementById("countrySelect");const country=document.getElementById("country");fetch("https://api.first.org/data/v1/countries/").then(res=>res.json()).then(data=>{const countries=Object.values(data.data);const fragment=document.createDocumentFragment();countries.forEach(item=>{const option=document.createElement("option");option.textContent=item.country;option.value=item.country;fragment.appendChild(option)});header.appendChild(fragment)}).catch(err=>console.error("Error fetching countries:",err));header.addEventListener("change",async function(){const countryName=this.value;if(!countryName)return;try{const res=await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);const data=await res.json();const info=data[0];const languages=info.languages?Object.values(info.languages).join(", "):"N/A";const capital=info.capital?info.capital[0]:"N/A";const currencyKey=info.currencies?Object.keys(info.currencies)[0]:null;const currency=currencyKey?`${info.currencies[currencyKey].name} - ${currencyKey}`:"N/A";const continent=info.continents?info.continents[0]:"N/A";const population=info.population?info.population.toLocaleString():"N/A";document.querySelector(".link_p").textContent=info.name.common;country.innerHTML=`
          <div class="container">
            <img src="${info.flags.svg}" alt="Flag of ${info.name.common}" class="img">
            <div class="buttons_map">
              <a href="${info.maps.googleMaps}" target="_blank"><button class="btn_maps"><i class='fas fa-map' style='font-size:14px;color:#fff;padding-right:5px'></i>Open in Google Maps</button></a>
              <a href="${info.maps.openStreetMaps}" target="_blank"><button class="btn_maps"><i class='fas fa-map-marker-alt' style='font-size:14px;color:#fff;padding-right:5px'></i>Open in Street Maps</button></a>
            </div>
            <div class="details_info"><h3>${languages}</h3><h3>: اللغة الأم</h3><img src="./img/language.png"></div>
            <div class="details_info"><h3>${currency}</h3><h3>: العملة</h3><img src="./img/currency-.png"></div>
            <div class="details_info"><h3>${capital}</h3><h3>: العاصمة</h3><img src="./img/capital.png"></div>
            <div class="details_info"><h3>${population}</h3><h3>: عدد السكان</h3><img src="./img/people.png"></div>
            <div class="details_info"><h3>${continent}</h3><h3>: القارة</h3><img src="./img/location.png"></div>
          </div>
        `}catch(err){console.error("Error fetching country info:",err);document.querySelector(".link_p").textContent="No Data Found";country.innerHTML=""}})
