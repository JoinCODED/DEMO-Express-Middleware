const express = require("express");
const cors = require("cors");
const connectDb = require("./db/database");
const cookieRoutes = require("./apis/cookies/routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});
app.use("/cookies", cookieRoutes);

connectDb();
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
