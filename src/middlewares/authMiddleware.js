const jwt = require('jsonwebtoken');

validateToken = (req, res, next) => {
  const token = req.headers['token']?.split(' ')[0];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

validateAdmin = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ error: 'Invalid API key' });
  }
  next();
};


module.exports = {
  validateAdmin,validateToken
}


