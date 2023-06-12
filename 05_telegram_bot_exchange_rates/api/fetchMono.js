import axios from "axios";
import { currencyCodes } from "../codes.js";
import NodeCache from "node-cache";

const cache = new NodeCache();
const monoApi = "https://api.monobank.ua/bank/currency";

export const fetchMono = async (currency) => {
  const rates = cache.get("monoRates");

  if (rates) return exchangeRateMono(rates, currency);

  const { data } = await axios.get(monoApi);
  cache.set("monoRates", data, 60);

  const message = exchangeRateMono(data, currency);

  return message;
};

const exchangeRateMono = (data, currency) => {
  const exchangeRate = data.filter(
    (obj) =>
      obj.currencyCodeA === currencyCodes[currency] &&
      obj.currencyCodeB === currencyCodes["UAH"]
  );

  const message = `${currency} MonoBank: Buy ${exchangeRate[0].rateBuy} | Sell ${exchangeRate[0].rateSell}`;

  return message;
};
