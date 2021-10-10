const express = require("express");
const cors = require("cors");
const db = require("./db/models");

// Data
let cookies = require("./cookies");

const app = express();

app.use(cors());
app.use(express.json());

// Cookie Create
app.post("/cookies", (req, res) => {
  cookies.push(newCookie);
  res.status(201).json(newCookie);
});

// Cookie List
app.get("/cookies", (req, res) => {
  res.json(cookies);
});

// Cookie Detail
app.get("/cookies/:cookieId", (req, res) => {
  const foundCookie = cookies.find(
    (cookie) => cookie.id === +req.params.cookieId
  );
  res.json(foundCookie);
});

// Cookie Delete
app.delete("/cookies/:cookieId", (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find((cookie) => cookie.id === +cookieId);
  if (foundCookie) {
    cookies = cookies.filter((cookie) => cookie.id !== +cookieId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cookie not found" });
  }
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
