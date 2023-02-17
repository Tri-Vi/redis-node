require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_PORT);
redisClient.on('error', (err)=>{
  console.error(err.message);
})
app.get('/', (req, res) =>{
  res.send('<h1>Hello World</h1>')
});



app.listen(port, (req,res) => {
  console.log(`listening on ${port}`)
})
