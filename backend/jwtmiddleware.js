const jwt = require('jsonwebtoken');

exports.generateToken = (payload) => {
  const secretKey = 'yourSecretKey'; // Replace with your own secret key
  const options = {
    expiresIn: '1h', // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

exports.validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(' ')[1]; // Bearer <token>
      
      jwt.verify(token, 'yourSecretKey', (err, payload) => {
        if (err) {
          return res.status(403).json({
            success: false,
            message: 'Invalid token',
          });
        } else {
          req.user = payload;
          next();
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Token is not provided',
      });
    }
};