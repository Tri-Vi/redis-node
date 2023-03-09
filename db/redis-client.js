require('dotenv').config();
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_PORT);

// Show Redis Error
redisClient.on('error', (err)=>{
  console.error(err.message);
})

// Confirm Redis Connection
redisClient.on('connect', () =>{
  console.log('Connected to redis client');
})

module.exports = redisClient;