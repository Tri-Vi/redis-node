const express = require('express');
const { route } = require('./api');
const router = express.Router();

router.get('/', (req, res) =>{
  res.send('<h1>Hello World</h1>')
});
router.get('/healthcheck', (req,res)=>{
  res.json({
    message: "healthy"
  })
})
module.exports = router;