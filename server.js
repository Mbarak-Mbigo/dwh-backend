const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { unhandledErrors } = require("./src/middleware");
const { registeredPatientsSummary, healthFacility } = require("./src/routes");

// connect to db
mongoose.connect(
  `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.vcmo0.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
);
const connection = mongoose.connection;

connection.on("error", (error) => console.error(error));
connection.once("open", () => console.info("Connected to Database"));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/registeredPatientsSummary", registeredPatientsSummary);
app.use("/healthFacility", healthFacility);

app.use(unhandledErrors);

const startServer = () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server started http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

startServer();
