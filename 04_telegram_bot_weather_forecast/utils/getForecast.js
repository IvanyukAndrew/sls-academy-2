import axios from "axios";

const weatherAPI = "823b0fc6b7616f5ab7b0cb3c58879ed1";
const city = "Uzhhorod";

export const getForecast = async (interval) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAPI}`;
    const { data } = await axios.get(url);

    const forecast = data.list;
    let message = `Weather forecast for ${city}:\n\n`;

    forecast.forEach((item) => {
      const dateTime = new Date(item.dt * 1000);
      const weather = item.weather[0].description;
      const temperature = item.main.temp - 273.15;

      if (interval === 3 || interval === 6) {
        if (dateTime.getHours() % interval === 0) {
          message += `Date: ${dateTime}\n
            Weather: ${weather}\n
            Temperature: ${temperature.toFixed(2)}°C\n\n`;
        }
      }
    });

    return message;
  } catch (err) {
    console.log(err);
  }
};
