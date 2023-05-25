const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require(__basedir + '/models');

class AuthController {
  findUser(params){
    return new Promise((resolve, reject)=> {
      let options = {
        'where': {}
      }

      models.User.findAndCountAll(options)
        .then((results)=>{
          resolve(results);
        }).catch((err)=>{
          reject({
            status: 500,
            error: err,
            message: "An error occurred"
          })
        })
    })
  }
}

module.exports = new AuthController();
