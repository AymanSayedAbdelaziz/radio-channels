if (window.location.pathname.endsWith("index.html")) {
  document.addEventListener("DOMContentLoaded", async () => {
    const channelsContainer = document.getElementById("channelsContainer");
    const audioPlayer = document.getElementById("audioPlayer");
    const searchInput = document.getElementById("searchInput");

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
            audioPlayer.src = channel.url;
            audioPlayer.play();
          });

          channelsContainer.appendChild(channelBox);
        });
      }

      // Display all channels on load
      displayChannels(channels.radios);

      // Add search functionality
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

    // Function to add a static channel
    function addStaticChannel() {
      const staticChannel = [
        {
          name: "إذاعة القران الكريم من القاهرة",
          url: "https://stream.radiojar.com/8s5u5tpdtwzuv", // Replace with the actual URL
        },
        {
          name: "إذاعة الشيخ الشعراوى رحة الله عليه",
          url: "https://3vh.liveradiu.com:8000/el-shaarawy.mp3", // Replace with the actual URL
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
      displayChannels(channels.radios); // Refresh the displayed channels
    }

    // Example usage of the addStaticChannel function
    addStaticChannel();
  });
}

if (window.location.pathname.endsWith("Adhkar.html")) {
  async function fetchData() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/rn0x/Adhkar-json/refs/heads/main/adhkar.json"
      );
      const data = await response.json();

      const azkarList = document.getElementById("azkar-list");
      console.log(data);
      data.forEach((item) => {
        item.array.forEach((azkar) => {
          const azkarItem = document.createElement("div");
          azkarItem.classList.add("azkar-item");

          azkarItem.innerHTML = `
                    <h3>ذكر ${azkar.id}</h3>
                    <p>${azkar.text}</p>
                    <p>${item.category}</p>
                `;

          azkarList.appendChild(azkarItem);
        });
      });
    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
    }
  }

  // تأكد من استدعاء الدالة لجلب البيانات
  fetchData();
}
