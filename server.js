const express = require("express");
const bodyParser = require("body-parser");

const users = [
  {
    userName: "Aditya Gupta",
    userEmail: "aditya@gmail.com",
    userAge: "22",
    userUniqueId: "1",
  },
  {
    userName: "Vanshita Jaiswal",
    userEmail: "vanshita@gmail.com",
    userAge: "21",
    userUniqueId: "2",
  },
  {
    userName: "Sachin Yadav",
    userEmail: "sachin@gmail.com",
    userAge: "22",
    userUniqueId: "3",
  },
];
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
  res.render("home", { data: users });
});

app.post("/", (req, res) => {
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const userAge = req.body.userAge;
  const userUniqueId = req.body.userUniqueId;

  users.push({
    userName: userName,
    userEmail: userEmail,
    userAge: userAge,
    userUniqueId: userUniqueId,
  });

  res.render("home", { data: users });
});

app.post("/delete", (req, res) => {
  const userId = req.body.userUniqueId;
  const updatedUsers = users.filter((user) => user.userUniqueId !== userId);
  users.length = 0;
  users.push(...updatedUsers);

  res.render("home", { data: users });
});

app.post("/update", (req, res) => {
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const userAge = req.body.userAge;
  const userUniqueId = req.body.userUniqueId;
  users.forEach((user) => {
    if (user.userUniqueId === userUniqueId) {
      user.userName = userName;
      user.userEmail = userEmail;
      user.userAge = userAge;
    }
  });

  res.render("home", { data: users });
});

app.listen(3000, () => {
  console.log("app is listening on port 3000...");
});
