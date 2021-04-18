/**
 * Created by cristian.jora on 04.11.2016.
 */
const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');

const app = express();

const logger = (req, res, next) => {
    console.log("URL:", req.originalUrl, req.connection.remoteAddress);
    next();
  }

app.use(logger);
app.use(express.json());

const cors = reauire('cors')
app.use(cors)

app.use(serveStatic(path.join(__dirname, 'dist')));

// API and utilities
var apiRouter = require('./routes/api');
app.use('/api', apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

