const express = require("express");
let cookies = require("./cookies");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// Cookie Create
app.post("/cookies", (req, res) => {
  const id = cookies[cookies.length - 1].id + 1;
  const newCookie = { id, ...req.body }; //id is equivalent to id: id
  cookies.push(newCookie);
  res.status(201).json(newCookie);
});

// Cookie List
app.get("/cookies", (req, res) => {
  res.json(cookies);
});

// Cookie Detail
app.get("/cookies/:cookieId", (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find(cookie => cookie.id === +cookieId);
  if (foundCookie) {
    res.json(foundCookie);
  } else {
    res.status(404).json({ message: "Cookie not found" });
  }
});

// Cookie Update
app.put("/cookies/:cookieId", async (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find(cookie => cookie.id === +cookieId);
  if (foundCookie) {
    for (const key in req.body) foundCookie[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cookie not found" });
  }
});

// Cookie Delete
app.delete("/cookies/:cookieId", (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find(cookie => cookie.id === +cookieId);
  if (foundCookie) {
    cookies = cookies.filter(cookie => cookie.id !== +cookieId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cookie not found" });
  }
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
