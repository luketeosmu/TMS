const jwt = require('jsonwebtoken');

exports.generateToken = (payload) => {
  /*
    payload : {
      username,
      ip,
      browserType
    } 
  */
  const secretKey = 'yourSecretKey'; 

  const token = jwt.sign(payload, secretKey);
  return token;
};

exports.validateToken = (req, res, next) => {
    console.log("-------Validate Token-------");
    const token = req.cookies['jwt'];
    // const username = req.body.username;
    if(token) {
        const decode = jwt.verify(token, 'yourSecretKey');
        if(decode && decode.ip === req.ip && decode.browserType === req.headers['user-agent']) {
            req.username = decode.username;
            next();
        } else {
          console.log("fail");
          res.status(401).json({
            success: false,
            message: "Unauthorized. Please login"
          });
        }
    } else {
      console.log("fail here");
      res.status(401).json({
        success: false,
        message: "Unauthorized. Please login"
      });
    }
};