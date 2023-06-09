import axios from "axios";

const endpoints = [
  "https://jsonbase.com/sls-team/json-793",
  "https://jsonbase.com/sls-team/json-955",
  "https://jsonbase.com/sls-team/json-231",
  "https://jsonbase.com/sls-team/json-931",
  "https://jsonbase.com/sls-team/json-93",
  "https://jsonbase.com/sls-team/json-342",
  "https://jsonbase.com/sls-team/json-77067676",
  "https://jsonbase.com/sls-team/json-491",
  "https://jsonbase.com/sls-team/json-281",
  "https://jsonbase.com/sls-team/json-718",
  "https://jsonbase.com/sls-team/json-310",
  "https://jsonbase.com/sls-team/json-806",
  "https://jsonbase.com/sls-team/json-469",
  "https://jsonbase.com/sls-team/json-258",
  "https://jsonbase.com/sls-team/json-516",
  "https://jsonbase.com/sls-team/json-79",
  "https://jsonbase.com/sls-team/json-706",
  "https://jsonbase.com/sls-team/json-521",
  "https://jsonbase.com/sls-team/json-350",
  "https://jsonbase.com/sls-team/json-6455555",
];

const fetchEndpoint = async (url) => {
  let isDone = null;

  try {
    for (let i = 0; i <= 3; i++) {
      const { data } = await axios.get(url);
      isDone = findIsDone(data);

      console.log(`[SUCCES] ${url}: isDone - ${isDone}`);
      break;
    }
  } catch (error) {
    console.log(`[FAIL] ${url}: The endpoint is unavailable`);
  }

  return isDone;
};

const findIsDone = (data) => {
  if (typeof data.isDone === "boolean") {
    return data.isDone;
  } else if (typeof data === "object") {
    for (const key in data) {
      const isDone = findIsDone(data[key]);
      if (isDone !== null) {
        return isDone;
      }
    }
  }
  return null;
};

const queryEndpoints = async () => {
  let countTrue = 0;
  let countFalse = 0;

  const isDones = endpoints.map((endpoint) => fetchEndpoint(endpoint));
  const result = await Promise.all(isDones);

  for (const isDone of result) {
    if (isDone === true) {
      countTrue++;
    } else if (isDone === false) {
      countFalse++;
    }
  }

  console.log(`Found True values: ${countTrue}`);
  console.log(`Found False values: ${countFalse}`);
};

queryEndpoints();
