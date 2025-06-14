
        let finalUrl = `https://api.first.org/data/v1/countries/`;
 
        fetch(finalUrl).then((response) => response.json()).then((data) => {
       for (let i = 0; i < Object.values(data['data']).length; i++) {

          header.innerHTML += '<option class="option">' +`  ${Object.values(data['data'])[i].country} ` + '</option>'}});
         function getch(e) {
            let finalUrls = `https://restcountries.com/v3.1/name/${e}?fullText=true`;
            fetch(finalUrls).then((response) => response.json()).then((data) => {
                country.innerHTML = `<div class="container"><img src="${data[0].flags.svg}" class="img"><div class="details"><img src="./img/language.png" style="width:40px;height:40px"><h3 style="color:#5B2C6F;padding:10px">اللغة الأم</h3><h3 style="color:#000;padding:10px">${Object.values(data[0].languages).toString().split(",").join(",")}</h3></div><div class="details"><img src="./img/currency-.png" style="width:40px;height:40px"><h3 style="color:#5B2C6F;padding:10px">العملة الرسمية</h3><h3 style="color:#000;padding:10px">${data[0].currencies[Object.keys(data[0].currencies)].name}-${Object.keys(data[0].currencies)[0]}</h3></div><div class="details"><img src="./img/capital.png" style="width:40px;height:40px"><h3 style="color:#5B2C6F;padding:10px">العاصمة</h3><h3 style="color:#000;padding:10px">${data[0].capital[0]}</h3></div><div class="details"><img src="./img/people.png" style="width:40px;height:40px"><h3 style="color:#5B2C6F;padding:10px">عدد السكان</h3><h3 style="color:#000;padding:10px">${data[0].population}</h3></div><div class="details"><img src="./img/location.png" style="width:40px;height:40px"><h3 style="color:#5B2C6F;padding:10px">القارة</h3><h3 style="color:#000;padding:10px">${data[0].continents[0]}</h3></div></div>`;
            })
        }
    


$(document).onkeydown=function(e){return!e.ctrlKey||67!==e.keyCode&&86!==e.keyCode&&85!==e.keyCode&&117!==e.keyCode},$(document).keypress("u",function(e){return!e.ctrlKey}),document.addEventListener("contextmenu",function(e){e.preventDefault()},!1),$(document).keydown(function(e){return 123!=e.keyCode&&(!e.ctrlKey||!e.shiftKey||73!=e.keyCode)&&void 0}),document.addEventListener("keydown",function(e){e.ctrlKey&&e.preventDefault(),123==e.keyCode&&e.preventDefault()});
