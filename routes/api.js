var express = require('express');
var api = express.Router();

// timesync for server synchronisation
var timesyncServer = require('timesync/server');
api.use('/timesync', timesyncServer.requestHandler);

//const events = require('./events');
//api.use('/events', eventsRouter);

module.exports = api;
