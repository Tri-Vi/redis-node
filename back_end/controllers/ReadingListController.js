const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require(__basedir + '/models');

class ReadingListController {
  find(params){
    return new Promise((resolve, reject)=> {
      let options = {
        'where': {}
      }
      options.include = [
        {
          as: 'book',
          model: models.Book
        },
        {
          as: 'user',
          model: models.User
        }
      ]
      models.ReadingList.findAndCountAll(options)
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
      options.include = [
        {
          as: 'book',
          model: models.Book
        },
        {
          as: 'user',
          model: models.User
        }
      ]
      // Filter By Id
      models.ReadingList.findByPk(id)
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
      let {status, book_id, user_id} = params;
      models.ReadingList.create({
        status: status,
        book_id: book_id,
        user_id: user_id
      }).then((result)=>{
        if(result.id){
          models.ReadingList.findByPk(result.id, {
            include: [
              {
                as: 'book',
                model: models.Book
              },
              {
                as: 'user',
                model: models.User
              }
            ]
          }).then(addedResult => {
            resolve(addedResult)
          }).catch(err => {
            reject({
              status: 500,
              error: err,
              message: "An error occurred"
            })
          })
        }
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
      models.ReadingList.findByPk(id).then(foundItem=> {
        foundItem.update(params).then(updatedItem =>{
          if(updatedItem.id){
            models.ReadingList.findByPk(updatedItem.id, {
              include: [
                {
                  as: 'book',
                  model: models.Book
                },
                {
                  as: 'user',
                  model: models.User
                }
              ]
            }).then(item =>{
              resolve(item)
            }).catch(err => {
              reject({
                status: 500,
                error: err,
                message: "An error occurred"
              })
            })
          }
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
      models.ReadingList.findByPk(id).then(foundItem=>{
        foundItem.destroy().then(deletedItem=>{
          resolve(deletedItem)
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

module.exports = new ReadingListController();
