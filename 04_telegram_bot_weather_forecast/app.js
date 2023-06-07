import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

const token = "6291924536:AAGImQH_e_avjY-T3ZfkLZ69EqRJCTzqwi4";
const weatherAPI = "823b0fc6b7616f5ab7b0cb3c58879ed1";
const city = "Uzhhorod";
let outputForecast = null;

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Start to work with bot" },
  { command: "/stop", description: "Stop showing the weather" },
]);

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
  const data = await getForecast();
  timer(data, msg, interval);
  bot.sendMessage(chatId, `Forecast every ${interval} hours:`);
});

bot.onText(/\/stop/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Stop!");
  timer([], null);
});
