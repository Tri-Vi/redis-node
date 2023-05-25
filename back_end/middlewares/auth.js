require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware function for verifying JWT token
const authenticateToken = async (req,res,next) => {
  const token = req.headers.authorization;

  if(!token){
    return res.status(401).json({
      error: 'No token provided'
    })
  }

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
    if(err){
      return res.status(403).json({
        'error': 'Invalid token'
      })
    }
    
    req.user = user;
    next();
  });


}

// Protected route
/*
app.get('/api/protected', authenticateToken, (req, res) => {
  // Access the authenticated user using req.user
  res.json({ message: 'This is a protected route', user: req.user });
});
*/

module.exports = { authenticateToken };