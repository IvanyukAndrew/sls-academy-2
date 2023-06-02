import fs from "fs";
import inquirer from "inquirer";

let dataFile = "user.txt";
const data = fs.readFileSync(dataFile, "utf8");
let users = data ? JSON.parse(data) : [];

const createUser = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the user's name. To cancel press ENTER:",
      },
    ])
    .then((answer) => {
      const name = answer.name.trim();

      if (name === "") {
        searchUser();
      } else {
        inquirer
          .prompt([
            {
              type: "list",
              name: "gender",
              message: "Choose your Gender:",
              choices: ["male", "female"],
            },
            {
              type: "input",
              name: "age",
              message: "Enter your age:",
            },
          ])
          .then((answer) => {
            const user = {
              name: name,
              gender: answer.gender,
              age: answer.age,
            };

            addUser(user);
            createUser();
          });
      }
    });
};

const addUser = (user) => {
  users.push(user);
  fs.writeFileSync(dataFile, JSON.stringify(users));
};

const searchUser = () => {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "search",
        message: "Would you to searc values in DB? (Y/N)",
      },
    ])
    .then((answer) => {
      if (answer.search) {
        console.log(users);

        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "Enter user name you wanna find in DB:",
            },
          ])
          .then((answer) => {
            const searchName = answer.name;

            const foundUser = users.filter(
              (user) => user.name.toLowerCase() === searchName.toLowerCase()
            );

            if (foundUser) {
              console.log(foundUser);
            } else {
              console.log("Users's not found!");
            }
          });
      } else {
        console.log()
      }
    });
};

createUser();
