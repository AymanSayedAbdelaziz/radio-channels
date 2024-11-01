if (window.location.pathname.endsWith("index.html")) {
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

if (window.location.pathname.endsWith("contact.html")) {

  // accounts.js
  const accounts = [
    { id: 1, name: "Gmail", email: "Aymansayedabdulaziz@gmail.com", link: "#" },
    { id: 2, name: "GitHub", email: "https://github.com/AymanSayedAbdelaziz", link: "https://github.com/AymanSayedAbdelaziz" },
    { id: 3, name: "LinkedIn", email: "https://www.linkedin.com/in/aymansayedabdelaziz/", link: "https://www.linkedin.com/in/aymansayedabdelaziz" },
  ];


  function displayAccounts() {
    const accountsList = document.getElementById('accounts-list');
    accounts.forEach(account => {
      const accountItem = document.createElement('div');
      accountItem.innerHTML = `
          <a href="${account.link}" target="_blank" style="text-decoration: none; color: inherit;">
              <p>Name: ${account.name}</p>
              <p>Email: ${account.email}</p>
          </a>
      `;
      accountsList.appendChild(accountItem);
    });
  }

  window.onload = displayAccounts;


}