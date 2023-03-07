global.__basedir = __dirname;

require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors= require('cors');
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_PORT);
redisClient.on('error', (err)=>{
  console.error(err.message);
})

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
app.use('/api', require('./routes/api.js'));
app.use('/', require('./routes/index.js'));

app.listen(port, (req,res) => {
  console.log(`listening on ${port}`)
})

