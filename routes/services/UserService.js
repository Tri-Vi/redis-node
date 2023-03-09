const express = require('express');
const router = express.Router();
const UserController = require(__basedir + "/controllers/UserController");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require(__basedir + "/models");

// Get All Users
router.get('/', (req,res)=>{
    UserController.find().then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      console.log('hit err');
      res.status(err.status).json(err)
    })
});

// Get Single User
router.get('/:id', (req,res) => {
    UserController.findById(req.params.id).then(result =>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(err.status).json(err)
    })
});

// Add User
router.post('/', (req, res)=>{
    UserController.add(req.body).then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(err.status).json(err)
    })
});

// Update User
router.put('/:id', (req,res)=>{
  UserController.edit(req.body, req.params.id).then(result=>{
    res.status(200).json(result)
  }).catch(err=>{
    res.status(err.status).json(err)
  })
});

// Delete User
router.delete('/:id', (req,res)=> {
    UserController.delete(req.params.id).then(result =>{
      res.status(200).json(result)
    }).catch(err =>{
      res.status(err.status).json(err)
    })
});

module.exports = router;
