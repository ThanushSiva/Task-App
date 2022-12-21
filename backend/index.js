require("dotenv").config()
const { urlencoded } = require("express");
const express = require("express");
const app = express();
const connect = require("./config/db");
const router = require("./router/router");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connect();

app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Listening in port ${process.env.PORT}`);
})