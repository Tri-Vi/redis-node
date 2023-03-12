const express = require('express');
const router = express.Router();
const ReadingListController = require(__basedir + "/controllers/ReadingListController");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require(__basedir + "/models");
const {cache} = require(__basedir + "/middlewares/cache.js");
const redisClient = require(__basedir+ '/db/redis-client.js');

// Get All Reading List
router.get('/', cache, (req,res)=>{
  ReadingListController.find().then(async (result)=>{
      let cacheId = req.originalUrl;
      await redisClient.set(cacheId, JSON.stringify(result), {
        'EX': 60
      });
      res.status(200).json(result)
    }).catch(err=>{
      res.status(err.status).json(err)
    })
});

// Get Single Book
router.get('/:id', cache, (req,res) => {
  ReadingListController.findById(req.params.id).then(async (result) =>{
      let cacheId = req.originalUrl;
      await redisClient.set(cacheId, JSON.stringify(result), {
        'EX': 60
      });
      res.status(200).json(result)
    }).catch(err=>{
      res.status(err.status).json(err)
    })
});

// Add Book
router.post('/', (req, res)=>{
  ReadingListController.add(req.body).then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(err.status).json(err)
    })
});

// Update Book
router.put('/:id', (req,res)=>{
  ReadingListController.edit(req.body, req.params.id).then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(err.status).json(err)
    })
});

// Delete Book
router.delete('/:id', (req,res)=> {
  ReadingListController.delete(req.params.id).then(result =>{
      res.status(200).json(result)
    }).catch(err =>{
      res.status(err.status).json(err)
    })
});

module.exports = router;
