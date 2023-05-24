const redisClient = require(__basedir + '/db/redis-client.js');

const cache = async (req,res,next) => {
  try {
    let cacheId = req.originalUrl
    let response = await redisClient.get(cacheId);
    if(response){
      res.status(200).json(
        JSON.parse(response)
      )
    } else {
      next();
    }
  } catch (err){
    res.status(404);
  }
  
}



module.exports = { cache };