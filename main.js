import fs from "fs";

let users = [];

const readCSV = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./users.csv", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        reject("Error occurred");
        return;
      }

      const lineSplitter = data.split("\r\n");

      const keys = [];
      users = [];

      lineSplitter.forEach((line, index) => {
        const dataSplitter = line.split(", ");

        const user = {};

        dataSplitter.forEach((data, dataIndex) => {
          if (index === 0) {
            keys.push(data.split(" ")[0]);
          } else {
            user[keys[dataIndex]] = data;
          }
        });

        if (index !== 0) users.push(user);
      });
      console.log(users);
      resolve("done");
    });
  });
};

const addToCSVFile = (UserName, BirthDate, Address, MobileNumber, Gender) => {
  const user = [UserName, BirthDate, Address, MobileNumber, Gender];

  fs.writeFile(
    "./users.csv",
    `\r\n${user.join(", ")}`,
    { flag: "a+" },
    (err) => {
      if (err) console.log(err);
    },
  );
};

const saveToFile = async () => {
  await readCSV();

  fs.writeFile(
    "./users.json",
    JSON.stringify(users),
    { flag: "w+" },
    (err) => {},
  );
};

const readJsonFile = () => {
  fs.readFile("./users.json", "utf-8", (err, data) => {
    if (err) {
      if (err.errno == -4058) console.error("Invalid file name", err);
      else console.log(err);
      return;
    }

    try {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
    } catch (error) {
      console.error("Invalid JSON File", error);
    }
  });
};

// addToCSVFile("Aamer", "13/7/2001", "Nablus", "+972598075105", "M");
// readCSV();
readJsonFile();
// saveToFile();
