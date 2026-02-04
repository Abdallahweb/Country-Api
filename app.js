const header=document.getElementById("countrySelect");const country=document.getElementById("country");fetch("https://api.first.org/data/v1/countries/").then(res=>res.json()).then(data=>{const countries=Object.values(data.data);const fragment=document.createDocumentFragment();countries.forEach(item=>{const option=document.createElement("option");option.textContent=item.country;option.value=item.country;fragment.appendChild(option)});header.appendChild(fragment)}).catch(err=>console.error("Error fetching countries:",err));header.addEventListener("change",async function(){const countryName=this.value;if(!countryName)return;try{const res=await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);const data=await res.json();const info=data[0];const languages=info.languages?Object.values(info.languages).join(", "):"N/A";const capital=info.capital?info.capital[0]:"N/A";const currencyKey=info.currencies?Object.keys(info.currencies)[0]:null;const currency=currencyKey?`${info.currencies[currencyKey].name} - ${currencyKey}`:"N/A";const continent=info.continents?info.continents[0]:"N/A";const population=info.population?info.population.toLocaleString():"N/A";document.querySelector(".link_p").textContent=info.name.common;country.innerHTML=`
          <div class="container">
            <img src="${info.flags.svg}" alt="Flag of ${info.name.common}" class="img">
            <div class="buttons_map">
              <a href="${info.maps.googleMaps}" target="_blank"><button class="btn_maps">Open in Google Maps</button></a>
              <a href="${info.maps.openStreetMaps}" target="_blank"><button class="btn_maps">Open in Street Maps</button></a>
            </div>
            <div class="details_info"><img src="./img/language.png"><h3>اللغة الأم:</h3><h3>${languages}</h3></div>
            <div class="details_info"><img src="./img/currency-.png"><h3>العملة الرسمية:</h3><h3>${currency}</h3></div>
            <div class="details_info"><img src="./img/capital.png"><h3>العاصمة:</h3><h3>${capital}</h3></div>
            <div class="details_info"><img src="./img/people.png"><h3>عدد السكان:</h3><h3>${population}</h3></div>
            <div class="details_info"><img src="./img/location.png"><h3>القارة:</h3><h3>${continent}</h3></div>
          </div>
        `}catch(err){console.error("Error fetching country info:",err);document.querySelector(".link_p").textContent="No Data Found";country.innerHTML=""}})
