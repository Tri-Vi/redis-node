const redisClient = require(__basedir + '/db/redis-client.js');

const cache = async (req,res,next) => {
  let { id } = req.params;
  try {
    let response = await redisClient.get(id);
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