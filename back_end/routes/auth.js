require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [
  {
    username: 'one',
    password: 'one'
  },
  {
    username: 'two',
    password: 'two'
  }
]
router.get('/testtoken', (req,res)=>{
  const token =  jwt.sign({username: 'abc'}, process.env.JWT_TOKEN_SECRET, {
    expiresIn: '5s'
  })
  res.json({token})
});

router.post('/login', (req,res)=>{
  const { username, password } = req.body;

  //Find th e use ir in the db
  const user = users.find(user => user.username == username);
  if(!user){
    return res.status(401).json({
      error: 'Invalid Credential'
    })
  }

  // Compare password
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if(!passwordMatch){
    return res.status(401).json({
      error: 'Invalid Credential'
    })
  }

  // Generate a JWT token
  const token = jwt.sign({username}, process.env.JWT_TOKEN_SECRET, {
    expiresIn: '1h'
  })

  // Send the token back to client
  res.json({token})
});

router.post('/register', (req,res)=>{

  const {username, password} = req.body;
  // Check if user already exists
  const existingUser = users.find(user => user.username == username);
  if(existingUser){
    return res.status(409).json({
      error: 'User already exists'
    })
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create a new user object
  const user = {
    username,
    password: hashedPassword
  }

  // Add the user to the db
  users.push(user);

  // Generate a JWT token
  const token = jwt.sign({username}, process.env.JWT_TOKEN_SECRET, {
    expiresIn: '1h'
  })

  res.json({token});
})

// Logout
router.post('/logout', (req,res)=> {
  res.json({ message: 'Logout successful' });
})


module.exports = router;