const express = require("express");
const app = express();
const cors = require("cors");
const { dbConnection } = require("./db/dbConect");
const { readdirSync } = require("fs");
const path = require("path");
const quizRoutes = require("./routes/quiz");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

//middlewares
app.use(cors());
app.use(express.json());

//routes
readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);
//Import routes

app.use("/api", quizRoutes);

//serve static files
app.use("/public", express.static(path.join(__dirname, "public")));

const server = () => {
  dbConnection();
  app.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}`);
  });
};

server();
