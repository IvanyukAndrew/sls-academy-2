const TelegramApi = require("node-telegram-bot-api");
const { program } = require("commander");

const token = "6291924536:AAGImQH_e_avjY-T3ZfkLZ69EqRJCTzqwi4";
const chatId = "640422536";

const bot = new TelegramApi(token, { polling: true });

program
  .command("message <message>")
  .description("Send a message to your Telegram bot")
  .action(async (msg) => {
    await bot.sendMessage(chatId, msg);
    process.exit();
  });

program
  .command("photo <photo>")
  .description("Send a photo to your Telegram bot")
  .action(async (photo) => {
    await bot.sendPhoto(chatId, photo);
    process.exit();
  });

program.parse(process.argv);
