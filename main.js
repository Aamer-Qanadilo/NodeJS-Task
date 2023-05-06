import fs from "fs";

let users = [];

const readCSV = () => {
  fs.readFile("./users.csv", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const lineSplitter = data.split("\r\n");

    const keys = [];
    users = [];

    // for (let key of lineSplitter[0].split(", ")) {
    //   keys.push(key.split(" ")[0]);
    // }

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
  });
};

const saveToFile = (UserName, BirthDate, Address, MobileNumber, Gender) => {
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

const readJsonFile = () => {
  fs.readFile("./users.csv", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(data);
  });
};

// saveToFile("Aamer", "13/7/2001", "Nablus", "+972598075105", "M");
// readCSV();
// readJsonFile();
