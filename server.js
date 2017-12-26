const express = require('express')
    , cors = require('cors')
    , app = express();

app.use(cors());

// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log('server listening ' + process.env.PORT);