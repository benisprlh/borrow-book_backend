const axios = require("axios");

async function fetchWeather() {
  const apiKey = "";
  const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=-6.2088&lon=106.8456&appid=${apiKey}`;

  try {
    const { data } = await axios.get(apiUrl);

    const dailyForecasts = data.daily.slice(0, 5);

    dailyForecasts.forEach((forecast) => {
      const timestamp = forecast.dt;
      const temperatureKelvin = forecast.temp.day;
      const temperatureCelsius = temperatureKelvin - 273.15;
      const date = new Date(timestamp * 1000);
      const formattedDate = date
        .toLocaleDateString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(/,/g, "");
      console.log(
        `${formattedDate.slice(0, 3)}, ${formattedDate.slice(
          4
        )}: ${temperatureCelsius.toFixed(2)} °C`
      );
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchWeather();
