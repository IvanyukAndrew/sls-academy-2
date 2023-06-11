import TelegramBot from "node-telegram-bot-api";
import { getForecast } from "./utils/getForecast.js";
import { splitMessage } from "./utils/splitMessage.js";

const token = "6291924536:AAGImQH_e_avjY-T3ZfkLZ69EqRJCTzqwi4";

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Start to work with bot" },
]);

<<<<<<< HEAD
=======
const timer = (data, msg, interval) => {
  let index = 0;

  if (index >= data.length) {
    clearInterval(outputForecast);
  }

  if (!msg) {
    clearInterval(outputForecast);
  } else {
    outputForecast = setInterval(async () => {
      const chatId = msg.chat.id;

      const dateTime = new Date(data[index].dt * 1000);
      const weather = data[index].weather[0].description;
      const temperature = data[index].main.temp - 273.15;

      let message = `Date: ${dateTime}\n
      Weather: ${weather}\n
      Temperature: ${temperature.toFixed(2)}°C`;

      await bot.sendMessage(chatId, message);

      index++;
    }, interval * 60 * 60 * 1000);
  }
};

const getForecast = async () => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAPI}`;
    const { data } = await axios.get(url);

    return data.list;
  } catch (err) {
    console.log(err);
  }
};

>>>>>>> b05df29022184bbc1891984846f2a6a6a644b668
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const text = "Welcome to the Weather Forecast Bot!";

  bot.sendMessage(chatId, text, {
    reply_markup: {
      keyboard: [["Forecast in Uzhhorod"]],
      one_time_keyboard: true,
    },
  });
});

bot.onText(/Forecast in Uzhhorod/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Choose interval would you like", {
    reply_markup: {
      keyboard: [["at intervals of 3 hours", "at intervals of 6 hours"]],
      one_time_keyboard: true,
    },
  });
});

bot.onText(/at intervals of (\d) hours/, async (msg, match) => {
  const chatId = msg.chat.id;
  const interval = Number(match[1]);
  const message = await getForecast(interval);
  const chunks = splitMessage(message, 3000);

  for (const chunk of chunks) {
    await bot.sendMessage(chatId, chunk);
  }
});
