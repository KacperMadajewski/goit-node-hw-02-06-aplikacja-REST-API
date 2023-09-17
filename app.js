const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts.routes");
const authRouter = require("./routes/api/user.routes");

const app = express();

const connection = mongoose.connect(process.env.DATABASE_URL, {
  dbName: "db-contacts",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("Database connection successfull");
  })
  .catch((err) => {
    console.error(`Error while establishing connection [${err}]`);
    process.exit(1);
  });

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

require("./config/passport");

app.use("/api", contactsRouter);
app.use("/api/users", authRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
