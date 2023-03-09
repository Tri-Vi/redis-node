global.__basedir = __dirname;

require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors= require('cors');
const apiRoutes = require('./routes/api.js');
const indexRoute = require('./routes/index.js')
const redisClient = require('./db/redis-client.js');

// Cors
app.use(cors());

// Body Parsers
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}))

app.use(bodyParser.json({
  limit: '50mb'
}));

// Static folder
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/api', apiRoutes);
app.use('/', indexRoute);

app.listen(port, (req,res) => {
  console.log(`listening on ${port}`)
  redisClient.connect();
})

