const express = require('express');
const router = express.router();

const UserController = require(__basedir + "/controller/UserController");

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
