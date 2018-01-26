const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./config');
const routes = require('./routes/router');

const database = mongoose.connection;

mongoose.connect(config.databaseUrl);
database.on('error', console.error.bind(console, 'mongo connection error:'));


const sessionConfig = {
    secret: config.secretSessionKey,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: database,
    }),
};

app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('client/dist'));

app.use('/', routes)

app.listen(config.port, () => {
    console.log(`Express app listening on port ${config.port}`);
});
