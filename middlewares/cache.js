const redisClient = require(__basedir + '/db/redis-client.js');

const cache = async (req,res,next) => {
  let { id } = req.params;
  let response = await redisClient.get(id);
  if(response){
    console.log('cached data');
    res.status(200).json(
      JSON.parse(response)
    )
  } else {
    console.log('next');
    next();
  }
}



module.exports = { cache };