import axios from "axios";

const changeData = async () => {
  try {
    const { data } = await axios.get("https://jsonbase.com/sls-team/vacations");
    const newData = new Map();

    data.map((user) => {
      if (!newData.has(user._id)) {
        newData.set(user._id, {
          userId: user._id,
          userName: user.name,
          vacantion: [],
        });
      }
      newData.get(user._id).vacantion.push({
        startDate: user.startDate,
        endDate: user.endDate,
      });
    });

    return console.log(JSON.stringify([...newData.values()], null, 1));
  } catch (error) {
    console.log("Error", error);
  }
};

changeData();
