require("dotenv").config()
const { urlencoded } = require("express");
const express = require("express");
const app = express();
const connect = require("./config/db");
const router = require("./router/router");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const corsOptions = {
    origin: "http://localhost:3000", //included origin as true
    credentials: true, //included credentials as true
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

connect();

app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Listening in port ${process.env.PORT}`);
})