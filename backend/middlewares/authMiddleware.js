const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log(authHeader);

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'Access Denied, no JWT provided' });
    }

    //this is to remove the Bearer word sent from the frontend or rest client
    const token = authHeader.split(' ')[1];
    if (!token) res.status(401).json({ message: 'Invalid token format' });

    console.log(token);

    //verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    console.log(decoded);

    //attach user info to the request
    req.user = decoded; //{ userId, role, iat, exp}

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid or expired' });
  }
};
