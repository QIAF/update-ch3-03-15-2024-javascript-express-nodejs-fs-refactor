
const express = require('express') //panggil express assigne ke variabel
const morgan = require('morgan'); //untuk loger di nedejs aplication

const app = express() //panggil package


const customerRouter = require("./routes/customerRoutes")

//midleware untuk membaca json dari request ke body kita
app.use(express.json());

//midleware dari third party = 3rd party
app.use(morgan("dev"));

app.use((req, res, next) => {
    console.log('Hello fsw 1 ini midleware kita sendiri ...');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();

});

app.use("/api/v1/customers", customerRouter);

module.exports = app;
