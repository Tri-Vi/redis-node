const express = require('express');
const router = express.Router();
const UserController = require(__basedir + "/controllers/UserController");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require(__basedir + "/models");

// Get All Book
router.get('/', (req,res)=>{

});

// Get Single Book
router.get('/:id', (req,res) => {

});

// Add Book
router.post('/', (req, res)=>{

});

// Update Book
router.put('/:id', (req,res)=>{

});

// Delete Book
router.delete('/:id', (req,res)=> {

});

module.exports = router;
