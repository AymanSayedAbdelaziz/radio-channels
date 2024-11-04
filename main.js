
if (window.location.pathname.endsWith("index.html")) {
  function updateClock() {
    const now = new Date();
    // Format hours, minutes, and seconds
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Determine AM or PM and convert to 12-hour format
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format, treat 0 as 12
    // Pad hours to always show two digits
    const formattedHours = String(hours).padStart(2, "0");

    // Update the clock display
    const clock = document.getElementById("clock");
    clock.innerText = `${formattedHours}:${minutes}:${seconds} ${period}`;
  }

  // Start the clock
  setInterval(updateClock, 1000);
  updateClock();

  document.addEventListener("DOMContentLoaded", async () => {
    const channelsContainer = document.getElementById("channelsContainer");
    const audioPlayer = document.getElementById("audioPlayer");
    const searchInput = document.getElementById("searchInput");
    const channelName = document.getElementById("channelName");

    let channels = [];

    try {
      const response = await fetch("https://mp3quran.net/api/v3/radios");
      channels = await response.json();

      function displayChannels(filteredChannels) {
        channelsContainer.innerHTML = "";
        filteredChannels.forEach((channel) => {
          const channelBox = document.createElement("div");
          channelBox.className = "channel-box";
          channelBox.textContent = channel.name;

          channelBox.addEventListener("click", () => {
            channelName.innerHTML = "تستمع الان الى : " + channel.name;
            channelName.style.textAlign = "center";
            audioPlayer.src = channel.url;
            audioPlayer.play();
          });

          channelsContainer.appendChild(channelBox);
        });
      }

      displayChannels(channels.radios);

      searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredChannels = channels.radios.filter((channel) =>
          channel.name.toLowerCase().includes(searchTerm)
        );
        displayChannels(filteredChannels);
      });
    } catch (error) {
      console.error("Error fetching channels:", error);
    }

    function addStaticChannel() {
      const staticChannel = [
        {
          name: "إذاعة القران الكريم من القاهرة",
          url: "https://stream.radiojar.com/8s5u5tpdtwzuv",
        },
        {
          name: "إذاعة الشيخ الشعراوى رحة الله عليه",
          url: "https://3vh.liveradiu.com:8000/el-shaarawy.mp3",
        },
        {
          name: "اذاعة ابتهالات الشيخ سيد النقشبندي بث مباشر",
          url: "https://3vh.liveradiu.com:8000/naqshbandi.mp3",
        },
        {
          name: "اذاعة الشيخ محمود خليل الحصري المصحف المرتل",
          url: "https://qurango.net/radio/mahmoud_khalil_alhussary",
        },
        {
          name: "اذاعة الشيخ محمد رفعت للقرآن الكريم بث مباشر",
          url: "https://3vh.liveradiu.com:8000/mohamed-refaat.mp3",
        },
        {
          name: "اذاعة ابتهالات الشيخ نصر الدين طوبار بث مباشر",
          url: "https://3vh.liveradiu.com:8000/nasreddine-tobar.mp3",
        },
        {
          name: "راديو العلم والايمان د. مصطفى محمود بث مباشر استماع جميع حلقات البرنامج",
          url: "https://3vh.liveradiu.com:8000/mustafa-mahmoud.mp3",
        },
        {
          name: "اذاعة الرقية الشرعية لعلاج المس والحسد بث مباشر",
          url: "https://qurango.net/radio/tarateel",
        },
      ];
      staticChannel.forEach((channel) => {
        channels.radios.push(channel);
      });
      displayChannels(channels.radios);
    }

    addStaticChannel();
  });
}

if (window.location.pathname.endsWith("Adhkar.html")) {



  async function fetchData() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/rn0x/Adhkar-json/refs/heads/main/adhkar.json"
      );
      const azkarList = await response.json();
      const categoryContainer = document.getElementById("azkar-container");

      azkarList.forEach((item) => {
        const categoryTitle = document.createElement("h2");

        const zekrCount = item.array.length;
        categoryTitle.textContent = `${item.category} (${zekrCount})`;

        categoryContainer.appendChild(categoryTitle);

        const azkarList = document.createElement("div");
        azkarList.classList.add('category-azkar');

        item.array.forEach((zekr, index) => {
          const azkarItem = document.createElement("div");
          azkarItem.classList.add('zekr');

          azkarItem.textContent = `${index + 1}` + " - " + ` ${zekr.text}`;
          azkarList.appendChild(azkarItem);
        });

        categoryContainer.appendChild(azkarList);

        categoryTitle.addEventListener("click", () => {
          azkarList.classList.toggle('show');
        });
      });

    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
    }
  }

  fetchData();
}

fetch("header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });
fetch("footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });




const array = [1, 2, 3, 4, 5];
array.push(6);
array.push("78");
console.log(array);



const obj = { name: 'Alice' };
obj.name = 'ayman';
console.log(obj);