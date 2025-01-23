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

exports.validateToken = (req) => {
    const token = req.cookies['jwt'];
    // const username = req.body.username;
    if(token) {
        const decode = jwt.verify(token, 'yourSecretKey');
        if(decode && decode.ip === req.ip && decode.browserType === req.headers['user-agent']) {
            return true;
        } else {
            return false;
        }
    } else {
      return false;
    }
};