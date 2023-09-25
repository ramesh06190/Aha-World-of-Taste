const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const config = require("./config");
const dish = require("./router/dish");
const user = require("./router/user");
const admin = require("./router/admin");

const fileupload = require("express-fileupload");

app.use(helmet());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload({ useTempFiles: true }));
mongoose
  .connect(
    `mongodb+srv://ahafood:${config.MONGODB_CONNECTON_PWD}@cluster0.k5kohlf.mongodb.net/dishes`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("success"));
app.use("/api", dish);
app.use("/user", user);
app.use("/admin", admin);

module.exports = app;
