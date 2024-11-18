const baseCurrencies = ["USD", "CNY", "JPY"];  
const targetCurrency = "KRW";  

document.getElementById("saveApiKey").addEventListener("click", () => {
  const apiKey = document.getElementById("api-key").value;
  if (apiKey) {
    chrome.storage.sync.set({ apiKey }, () => {
      alert("API 키가 저장되었습니다!");
    });
  }
});

document.getElementById("fetchRate").addEventListener("click", fetchExchangeRates);

async function fetchExchangeRates() {
  chrome.storage.sync.get("apiKey", async (result) => {
    const apiKey = result.apiKey;
    if (!apiKey) {
      alert("API 키가 설정되지 않았습니다. 먼저 API 키를 입력하고 저장하세요.");
      return;
    }

    for (const baseCurrency of baseCurrencies) {
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`);
        const data = await response.json();

        if (data.conversion_rates && data.conversion_rates[targetCurrency]) {
          const rate = data.conversion_rates[targetCurrency];
          if (baseCurrency === "USD") {
            document.getElementById("exchange-rate-usd").innerText = rate;
          } else if (baseCurrency === "CNY") {
            document.getElementById("exchange-rate-cny").innerText = rate;
          } else if (baseCurrency === "JPY") {
            document.getElementById("exchange-rate-jpy").innerText = rate;
          }
        } else {
          if (baseCurrency === "USD") {
            document.getElementById("exchange-rate-usd").innerText = "정보 없음";
          } else if (baseCurrency === "CNY") {
            document.getElementById("exchange-rate-cny").innerText = "정보 없음";
          } else if (baseCurrency === "JPY") {
            document.getElementById("exchange-rate-jpy").innerText = "정보 없음";
          }
        }
      } catch (error) {
        if (baseCurrency === "USD") {
          document.getElementById("exchange-rate-usd").innerText = "오류";
        } else if (baseCurrency === "CNY") {
          document.getElementById("exchange-rate-cny").innerText = "오류";
        } else if (baseCurrency === "JPY") {
          document.getElementById("exchange-rate-jpy").innerText = "오류";
        }
        console.error(`환율 데이터를 불러오는 중 오류 (${baseCurrency}):`, error);
      }
    }
  });
}

chrome.storage.sync.get("apiKey", (result) => {
  if (result.apiKey) {
    document.getElementById("api-key").value = result.apiKey;
  }
});

fetchExchangeRates();
