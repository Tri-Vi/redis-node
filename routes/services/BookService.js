const express = require('express');
const router = express.Router();
const BookController = require(__basedir + "/controllers/BookController");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require(__basedir + "/models");

// Get All Books
router.get('/', (req,res)=>{
    console.log('hit');
    BookController.find().then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(err.status).json(err)
    })
});

// Get Single Book
router.get('/:id', (req,res) => {
    BookController.findById(req.params.id).then(result =>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(err.status).json(err)
    })
});

// Add Book
router.post('/', (req, res)=>{
    BookController.add(req.body).then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(err.status).json(err)
    })
});

// Update Book
router.put('/:id', (req,res)=>{
    BookController.edit(req.body, req.params.id).then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(err.status).json(err)
    })
});

// Delete Book
router.delete('/:id', (req,res)=> {
    BookController.delete(req.params.id).then(result =>{
      res.status(200).json(result)
    }).catch(err =>{
      res.status(err.status).json(err)
    })
});

module.exports = router;
