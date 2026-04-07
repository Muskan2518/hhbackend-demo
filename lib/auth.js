const jwt = require('jsonwebtoken');

function authenticate(request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { id: decoded.id, role: decoded.role };
  } catch {
    return null;
  }
}

function authorize(user, ...roles) {
  return roles.includes(user.role);
}

module.exports = { authenticate, authorize };
