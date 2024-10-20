const dropdown = document.getElementById("dropdown");
const searchInput = document.getElementById("search-input");
const audioPlayer = document.getElementById("audio-player");
const loadingIndicator = document.getElementById("loading-indicator");
const apiUrl = "https://mp3quran.net/api/v3/radios";
let allItems = [];

// جلب البيانات عند تحميل الصفحة
async function fetchData() {
  try {
    loadingIndicator.style.display = "block"; // إظهار مؤشر التحميل
    const response = await fetch(apiUrl);
    const data = await response.json();
    loadingIndicator.style.display = "none"; // إخفاء مؤشر التحميل

    if (data.radios && Array.isArray(data.radios)) {
      allItems = [...data.radios, ...getStaticItems()]; // دمج العناصر الثابتة
      populateDropdown(allItems);
    }
  } catch (error) {
    loadingIndicator.style.display = "none"; // إخفاء مؤشر التحميل
    console.error("Error fetching data:", error);
    alert("فشل في تحميل البيانات. حاول مرة أخرى لاحقًا.");
  }
}

// دالة لإرجاع العناصر الثابتة
function getStaticItems() {
  return [{
    name: "اذاعة القران الكريم من القاهرة",
    url: "https://stream.radiojar.com/8s5u5tpdtwzuv",
  }];
}

// دالة لعرض العناصر في القائمة المنسدلة
function populateDropdown(items) {
  dropdown.innerHTML = ""; // مسح العناصر السابقة
  items.forEach((item) => {
    const option = document.createElement("div");
    option.className = "dropdown-option";
    option.textContent = item.name;
    option.dataset.url = item.url;

    option.addEventListener("click", () => {
      searchInput.value = item.name;
      playAudio(item.url);
    });

    dropdown.appendChild(option);
  });

  dropdown.style.display = items.length ? "block" : "none"; // إظهار القائمة إذا كان هناك عناصر
}

// تحديث القائمة عند الإدخال
searchInput.addEventListener("input", function () {
  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(this.value.toLowerCase())
  );
  populateDropdown(filteredItems);
});

// إظهار القائمة بالكامل عند التركيز
searchInput.addEventListener("focus", () => populateDropdown(allItems));

// تشغيل الصوت
function playAudio(url) {
  audioPlayer.src = url;
  audioPlayer.play();
}

// بدء جلب البيانات
fetchData();
