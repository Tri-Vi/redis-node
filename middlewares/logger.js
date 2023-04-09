const logger = require(__basedir + '/util/logging.js')

module.exports = function(options){
  return function(req,res,next){
    let {user} = req;
    let user_id = null;
    let user_email = null
    if((user===null) || (user=== undefined)){
      user = ''
    } else {
      user_id = user.id,
      user_email = user.email
    }
    logger.info("retrieving: " + req.method + " " + req.originalUrl, {
      'user_id' : user_id,
      'user_email': user_email
    })
  }
}
