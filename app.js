const express = require("express");
const cookieMethods = require("./cookieMethods");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Retrieve cookies list
app.get("/cookies", async (req, res) => {
  try {
    const cookies = await cookieMethods.getCookies();
    res.json(cookies);
  } catch (error) {
    console.log("Error while fetching cookies", error);
  }
});

// Retrieve cookie detail
app.get("/cookies/:cookieId", async (req, res) => {
  try {
    const { cookieId } = req.params;
    const cookie = await cookieMethods.getCookie(cookieId);
    res.json(cookie);
  } catch (error) {
    console.log("Error while fetching cookie", error);
  }
});

// Create a new cookie
app.post("/cookies", async (req, res) => {
  try {
    const newCookie = await cookieMethods.createCookie(req.body);
    res.status(201).json(newCookie);
  } catch (error) {
    console.log("Error while creating a new cookie", error);
  }
});

// Update an existing cookie
app.put("/cookies/:cookieId", async (req, res) => {
  const { cookieId } = req.params;
  try {
    const foundCookie = await cookieMethods.getCookie(cookieId);
    let updatedCookie = { ...foundCookie, ...req.body };
    await cookieMethods.updateCookie(updatedCookie);
    res.status(204).end();
  } catch (error) {
    console.log("Error while updating a cookie!", error);
  }
});

// Delete an existing cookie
app.delete("/cookies/:cookieId", async (req, res) => {
  const { cookieId } = req.params;
  try {
    await cookieMethods.deleteCookie(cookieId);
    res.status(204).end();
  } catch (error) {
    console.log("Error while deleting a cookie!", error);
  }
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
