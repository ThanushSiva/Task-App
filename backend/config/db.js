const mongoose = require("mongoose")

const connect = () => {
    mongoose.connect(process.env.MONOGODBURL)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = connect;