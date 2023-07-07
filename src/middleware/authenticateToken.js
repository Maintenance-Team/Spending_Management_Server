import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  // Skip token verification for login and register routes
  if (req.path === '/auth/login' || req.path === '/auth/register' || req.path === '/auth/verify_token') {
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access token not found' });
  }

  jwt.verify(token, 'access-token-secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.body.userId = decoded.userId;

    next();
  });
}
