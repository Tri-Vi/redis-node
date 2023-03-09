const redisClient = require(__basedir + '/db/redis-client.js');
const cache = (req,res,next) => {
  const { id } = req.params;
  console.log('hit cache');
  redisClient.get(id, (error, result)=>{
    if(error) throw error;
    if(result !== null){
      console.log('use catch')
      return res.status(200).json({
        isCache: true,
        data: JSON.parse(result)
      });
    } else {
      console.log('next');
      return next();
    }
  })
}



module.exports = { cache };