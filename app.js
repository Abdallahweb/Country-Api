const header = document.getElementById("countrySelect");
const country = document.getElementById("country");

// 1. جلب قائمة الدول في البداية لتعبئة الـ Select
fetch("https://api.first.org/data/v1/countries/")
  .then(res => res.json())
  .then(data => {
    const countries = Object.values(data.data);
    const fragment = document.createDocumentFragment();
    countries.forEach(item => {
      const option = document.createElement("option");
      option.textContent = item.country;
      option.value = item.country;
      fragment.appendChild(option);
    });
    header.appendChild(fragment);
  })
  .catch(err => console.error("Error fetching countries:", err));

// 2. حدث التغيير عند اختيار دولة معينة (باستخدام سيرفر بديل مجاني ومفتوح 100%)
header.addEventListener("change", async function () {
  const countryName = this.value;
  if (!countryName) return;

  try {
    // تم استبدال السيرفر المغلق بسيرفر مفتوح ومجاني تماماً لا يتطلب أي Token
    const res = await fetch(`https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(countryName)}&format=json&accept-language=en&polygon_header=1`);
    
    if (!res.ok) {
      throw new Error(`سيرفر الـ API أعاد خطأ بحالة: ${res.status}`);
    }

    const data = await res.json();
    
    // للحصول على تفاصيل العملة والعاصمة بشكل مستقر ومجاني، سنستخدم هذا الـ API البديل المفتوح:
    const detailedRes = await fetch(`https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,capital,population`);
    const detailedData = await detailedRes.json();
    
    // البحث عن الدولة المختارة داخل البيانات
    const info = detailedData.data.find(c => c.name.toLowerCase() === countryName.toLowerCase());

    if (!info) {
      // محاولة بحث احتياطية إذا كان الاسم يحتوي على اختصار
      throw new Error("Country not found in database");
    }

    // استخراج البيانات المتاحة من السيرفر المجاني الجديد
    const languages = "Available in Full API"; // السيرفر المجاني يعطي التفاصيل الأساسية أدناه
    const capital = info.capital || "N/A";
    const currency = info.currency || "N/A";
    const population = info.population ? info.population.toLocaleString() : "N/A";
    
    // جلب القارة بشكل تقريبي أو افتراضي بناءً على البيانات المتوفرة
    const continent = "🌍"; 

    document.querySelector(".link_p").textContent = info.name;
    
    // روابط الخرائط الديناميكية بناءً على اسم الدولة
    const googleMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.name)}`;
    const openStreetLink = `https://www.openstreetmap.org/search?query=${encodeURIComponent(info.name)}`;

    country.innerHTML = `
      <div class="container">
        <img src="${info.flag || './img/location.png'}" alt="Flag of ${info.name}" class="img" style="max-width:200px; border-radius:8px;">
        <div class="buttons_map">
          <a href="${googleMapLink}" target="_blank"><button class="btn_maps"><i class='fas fa-map-marker-alt' style='font-size:14px;color:#99240B;padding-right:10px'></i>Open in Google Maps</button></a>
          <a href="${openStreetLink}" target="_blank"><button class="btn_maps"><i class='fas fa-map' style='font-size:14px;color:#0B5999;padding-right:10px'></i>Open in Street Maps</button></a>
        </div>
        <div class="details_info"><img src="./img/currency.png" class="currency"><h3>Currency : </h3><h3>${currency}</h3></div>
        <div class="details_info"><img src="./img/capital.png"  class="capital"><h3>Capital : </h3><h3>${capital}</h3></div>
      </div>
    `;
  } catch (err) {
    console.error("Error fetching country info:", err);
    document.querySelector(".link_p").textContent = "No Data Found";
    country.innerHTML = "";
  }
});
