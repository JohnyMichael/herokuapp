const express = require('express');


let config = require('./config');
let socket = require('./socket');
let routes = require('./routes');

let app = express();
// Search query in mongo: title: '/variable/i'

// Settings for Static Files
config.staticSettings(app);
// Application Settings
config.appSetup(app);


//Get all Routes
routes(app);

//Setup of Server
let server = app.listen(config.appdata.port, () => {
    console.log("App Running on localhost:" + config.appdata.port);
});
//Create a socket.io Connection
socket(server);