import TelegramBot from "node-telegram-bot-api";
import { fetchPrivat } from "./api/fetchPrivate.js";
import { fetchMono } from "./api/fetchMono.js";

const token = "6291924536:AAGImQH_e_avjY-T3ZfkLZ69EqRJCTzqwi4";

const bot = new TelegramBot(token, { polling: true });

const fetchRates = async (currency) => {
  const mono = await fetchMono(currency);
  const privat = await fetchPrivat(currency);

  const message = `${mono} \n ${privat}`;

  return message;
};

bot.setMyCommands([
  { command: "/start", description: "Start to work with bot" },
]);

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(
    chatId,
    "Привіт, вас вітає бот для курсів валют \n Виберіть валюту!",
    {
      reply_markup: {
        keyboard: [["USD до гривні", "EUR до гривні"]],
        one_time_keyboard: true,
      },
    }
  );
});

bot.onText(/USD до гривні/, async (msg) => {
  try {
    const chatId = msg.chat.id;
    const message = await fetchRates("USD");

    await bot.sendMessage(chatId, message, {
      reply_markup: {
        keyboard: [["USD до гривні", "EUR до гривні"]],
        one_time_keyboard: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

bot.onText(/EUR до гривні/, async (msg) => {
  try {
    const chatId = msg.chat.id;
    const message = await fetchRates("EUR");

    await bot.sendMessage(chatId, message, {
      reply_markup: {
        keyboard: [["USD до гривні", "EUR до гривні"]],
        one_time_keyboard: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
