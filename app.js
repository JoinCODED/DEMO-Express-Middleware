const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
const cookieRoutes = require("./apis/cookies/routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/cookies", cookieRoutes);

connectDb();
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
