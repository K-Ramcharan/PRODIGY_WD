const apiKey = 'HMsyhnhND7rIQfamfo3MfmW9xuMmRsAL';
const input = document.querySelector('#city');
const button = document.querySelector('#btn');
const weatherInfo = document.querySelector('#weather-info');
const loadingSpinner = document.querySelector('#loading-spinner');
const errorSpan = document.querySelector('#error-message');

const fetchData = async () => {
    let loc = input.value.trim();

    if (loc === '') {
        alert('Enter location first');
        input.style.border = '2px solid red';
        return;
    } else {
        input.style.border = '';
    }

    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('visible');
    errorSpan.innerText = '';

    const customUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${loc}&apikey=${apiKey}`;

    try {
        let response = await fetch(customUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let jsonData = await response.json();
        console.log(jsonData);

        weatherInfo.innerHTML = '';

        if (jsonData && jsonData.data) {
            const { temperature, windSpeed, humidity, rainIntensity, snowIntensity, cloudCover } = jsonData.data.values || {};

            weatherInfo.innerHTML = `
                <div class="weather-item">
                    <span class="weather-label">Temperature</span>
                    <i class="fas fa-temperature-three-quarters weather-icon"></i>
                    <span class="weather-data">${temperature !== undefined ? `${temperature}°C` : 'N/A'}</span>
                </div>
                <div class="weather-item">
                    <span class="weather-label">Wind</span>
                    <i class="fas fa-wind weather-icon"></i>
                    <span class="weather-data">${windSpeed !== undefined ? `${windSpeed} km/h` : 'N/A'}</span>
                </div>
                <div class="weather-item">
                    <span class="weather-label">Humidity</span>
                    <i class="fas fa-tint weather-icon"></i>
                    <span class="weather-data">${humidity !== undefined ? `${humidity} %` : 'N/A'}</span>
                </div>
                <div class="weather-item">
                    <span class="weather-label">Rain</span>
                    <i class="fas fa-cloud-rain weather-icon"></i>
                    <span class="weather-data">${rainIntensity !== undefined ? `${rainIntensity} mm` : '0 mm'}</span>
                </div>
                <div class="weather-item">
                    <span class="weather-label">Snow</span>
                    <i class="fas fa-snowflake weather-icon"></i>
                    <span class="weather-data">${snowIntensity !== undefined ? `${snowIntensity} inch` : '0 inch'}</span>
                </div>
                <div class="weather-item">
                    <span class="weather-label">Cloud</span>
                    <i class="fas fa-cloud weather-icon"></i>
                    <span class="weather-data">${cloudCover !== undefined ? `${cloudCover} %` : '0 %'}</span>
                </div>
            `;
        } else {
            throw new Error('Unexpected data structure');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        errorSpan.innerText = 'Error fetching data. Please try again later.';
        weatherInfo.innerHTML = '';
    } finally {
        loadingSpinner.classList.remove('visible');
        loadingSpinner.classList.add('hidden');
    }
}

button.addEventListener('click', fetchData);
