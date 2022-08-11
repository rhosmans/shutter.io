require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser');
const router = require("./routes.js");
const controller = require("./controllers.js");
const authChecker = require("./middleware/authChecker.js");

const app = express();

// app.use(authChecker);
app.use(bodyParser.json())
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`);
})


//