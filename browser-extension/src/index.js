
import axios from 'axios';

// form fields
const form = document.querySelector('.form-data');
const region = document.querySelector('.region-name');
const apiKey = document.querySelector('.api-key');
// results
const errors = document.querySelector('.errors');
const loading = document.querySelector('.loading');
const results = document.querySelector('.result-container');
const usage = document.querySelector('.carbon-usage');
const fossilfuel = document.querySelector('.fossil-fuel');
const myregion = document.querySelector('.my-region');
const clearBtn = document.querySelector('.clear-btn');
 
const regionImageMap = {
    "FR": "images/france.jfif",
    "KR": "images/korea.jfif",
    "JP": "images/japan.jfif",
};

function updateRegionImage(region) {
    const imagePath = regionImageMap[region] || "images/plants-people.png"; // 기본 이미지 설정
    document.getElementById("region-image").src = imagePath;
}

const calculateColor = async (value) => {
    let co2Scale = [0, 150, 600, 750, 800];
    let colors = ['#2AA364', '#F5EB4D', '#9E4229', '#381D02', '#381D02'];

    let closestNum = co2Scale.sort((a, b) => {
        return Math.abs(a - value) - Math.abs(b - value);
    })[0];
    console.log(value + ' is closest to ' + closestNum);
    let num = (element) => element > closestNum;
    let scaleIndex = co2Scale.findIndex(num);

    let closestColor = colors[scaleIndex];
    console.log(scaleIndex, closestColor);

    chrome.runtime.sendMessage({ action: 'updateIcon', value: { color: closestColor } });
};
 
const displayCarbonUsage = async (apiKey, region) => {
    try {
        await axios
        .get('https://api.co2signal.com/v1/latest', {
            params: {
                countryCode: region,
            },
            headers: {
                //please get your own token from CO2Signal https://www.co2signal.com/
                'auth-token': apiKey,
            },
        })
        .then((response) => {
            let CO2 = Math.floor(response.data.data.carbonIntensity);
            
            calculateColor(CO2);

            loading.style.display = 'none';
            form.style.display = 'none';
            myregion.textContent = region;
            usage.textContent =
                Math.round(response.data.data.carbonIntensity) + ' grams (grams C02 emitted per kilowatt hour)';
            fossilfuel.textContent =
                response.data.data.fossilFuelPercentage.toFixed(2) +
                '% (percentage of fossil fuels used to generate electricity)';
            results.style.display = 'block';
            updateRegionImage(region);
        });
    } catch (error) {
        console.log(error);
        loading.style.display = 'none';
        results.style.display = 'none';
        errors.textContent = 'Sorry, we have no data for the region you have requested.';
    }
};

function setUpUser(apiKey, regionName) {
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('regionName', regionName);
    loading.style.display = 'block';
    errors.textContent = '';
    clearBtn.style.display = 'block';
    displayCarbonUsage(apiKey, regionName);
}

function handleSubmit(e) {
    e.preventDefault();
    setUpUser(apiKey.value, region.value);
}

function init() {   
    console.log("init() is loaded and running");
    const storedApiKey = localStorage.getItem('apiKey');
    const storedRegion = localStorage.getItem('regionName');
    localStorage.removeItem('regionName');
    //set icon to be generic green
    //todo
    if (storedApiKey === null || storedRegion === null) {
        form.style.display = 'block';
        results.style.display = 'none';
        loading.style.display = 'none';
        clearBtn.style.display = 'none';
        errors.textContent = '';
        document.getElementById("region-image").src = "images/plants-people.png";
    } else {
        displayCarbonUsage(storedApiKey, storedRegion);
        results.style.display = 'none';
        form.style.display = 'none';
        clearBtn.style.display = 'block';
    }
    chrome.runtime.sendMessage({
    action: 'updateIcon',
        value: {
            color: 'green',
        },
    });
    
};

function reset(e) {
    e.preventDefault();
    localStorage.removeItem('regionName');
    init();
}

form.addEventListener('submit', (e) => handleSubmit(e));
clearBtn.addEventListener('click', (e) => reset(e));

init();

