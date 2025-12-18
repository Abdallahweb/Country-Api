
        let finalUrl = `https://api.first.org/data/v1/countries/`;
 
        fetch(finalUrl).then((response) => response.json()).then((data) => {
       for (let i = 0; i < Object.values(data['data']).length; i++) {

          header.innerHTML += '<option class="option">' +`  ${Object.values(data['data'])[i].country} ` + '</option>'}});
         function getch(e) {
            let finalUrls = `https://restcountries.com/v3.1/name/${e}?fullText=true`;
            fetch(finalUrls).then((response) => response.json()).then((data) => {
                country.innerHTML = `<div class="container"><img src="${data[0].flags.svg}" class="img"><div class="details"><img src="./img/language.png" style="width:90px;height:90px"><h3 style="color:#DC7633;font-family:Cairo,Noto Kufi Arabic,sans-serif!important">اللغة الأم</h3><h3 style="color:#eee">${Object.values(data[0].languages).toString().split(",").join(",")}</h3></div><div class="details"><img src="./img/currency-.png" style="width:90px;height:90px"><h3 style="color:#DC7633;font-family:Cairo,Noto Kufi Arabic,sans-serif!important">العملة الرسمية</h3><h3 style="color:#eee">${data[0].currencies[Object.keys(data[0].currencies)].name}-${Object.keys(data[0].currencies)[0]}</h3></div><div class="details"><img src="./img/capital.png" style="width:90px;height:90px"><h3 style="color:#DC7633;font-family:Cairo,Noto Kufi Arabic,sans-serif!important">العاصمة</h3><h3 style="color:#eee">${data[0].capital[0]}</h3></div><div class="details"><img src="./img/people.png" style="width:90px;height:90px"><h3 style="color:#DC7633;font-family:Cairo,Noto Kufi Arabic,sans-serif!important">عدد السكان</h3><h3 style="color:#eee">${data[0].population}</h3></div><div class="details"><img src="./img/location.png" style="width:90px;height:90px"><h3 style="color:#DC7633;font-family:Cairo,Noto Kufi Arabic,sans-serif!important">القارة</h3><h3 style="color:#eee">${data[0].continents[0]}</h3></div></div>`;
            })
        }
    

