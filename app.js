const express = require('express');
const app = express();
const cors = require("cors");
const portNum = process.env.portNum || 5000;
require('./server/connection');
const middlewares = require('./controllers/middlewares');
const customersRoute = require('./routes/customersRoute');
const transactionsRoute = require('./routes/transactionsRoute');
const accountsRoute = require('./routes/accountsRoute');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(express.json({ limit: "10mb", extended: true }));

app.use('/', middlewares.validateAccessHeader);
app.use('/api', customersRoute);
app.use('/api', transactionsRoute);
app.use('/api', accountsRoute);

app.listen(portNum, err => {
    if (!err) {
        console.log(`App is running on ${portNum} port!`)
    }
    else {
        console.log(err)
    }
})