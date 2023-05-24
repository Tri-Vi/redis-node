const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require(__basedir + '/models');

class BookController {
  find(params){
    return new Promise((resolve, reject)=> {
      let options = {
        'where': {}
      }

      models.Book.findAndCountAll(options)
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
      models.Book.findByPk(id)
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
      let {name} = params;
      models.Book.create({
        name: name
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
      models.Book.findByPk(id).then(foundBook=> {
        foundBook.update(params).then(updatedBook =>{
          resolve(updatedBook)
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
      models.Book.findByPk(id).then(foundBook=>{
        foundBook.destroy().then(deletedBook=>{
          resolve(deletedBook)
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

module.exports = new BookController();
