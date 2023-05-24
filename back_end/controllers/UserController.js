const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require(__basedir + '/models');

class UserController {
  find(params){
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

  findById(id){
    return new Promise((resolve, reject)=>{
      let options = {
        'where': {}
      }

      // Filter By Id
      models.User.findByPk(id)
        .then((result) =>{
          resolve(result)
        }).catch((err) => {
          reject({
            status: 500,
            error: err,
            message: "An error occurred"
          })
        })
    })
  }
  add(params){
    return new Promise((resolve, reject) => {
      let {email, first_name, last_name} = params;
      models.User.create({
        email: email,
        first_name: first_name,
        last_name: last_name
      }).then((result)=>{
        resolve(result)
      }).catch((err)=>{
        reject({
          status: 500,
          error: err,
          message: "An error occurred"
        })
      })
    })
  }

  edit(params, id){
    return new Promise((resolve, reject)=>{
      models.User.findByPk(id).then(foundUser=> {
        foundUser.update(params).then(updatedUser =>{
          resolve(updatedUser)
        }).catch(err =>{
          reject({
            status: 500,
            error: err,
            message: "An error occurred"
          })
        })
      }).catch(err => {
        reject({
          status: 500,
          error: err,
          message: "An error occurred"
        })
      })
    })
  }

  delete(id){
    return new Promise((resolve, reject)=>{
      models.User.findByPk(id).then(foundUser=>{
        foundUser.destroy().then(deletedUser=>{
          resolve(deletedUser)
        }).catch(err=>{
          reject({
            status: 500,
            error: err,
            message: "An error occurred"
          })
        })
      }).catch(err=>{
        reject({
          status: 500,
          error: err,
          message: "An error occurred"
        })
      })
    })
  }
}

module.exports = new UserController();
