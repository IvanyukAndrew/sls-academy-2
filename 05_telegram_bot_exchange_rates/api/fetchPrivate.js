import axios from "axios";

const privatApi = "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5";

export const fetchPrivat = async (currency) => {
  const { data } = await axios.get(privatApi);
  const exchangeRate = data.filter((obj) => obj.ccy === currency);

  const message = `${currency} PivatBank: Buy ${exchangeRate[0].buy} | Sell ${exchangeRate[0].sale}`;

  return message;
};
