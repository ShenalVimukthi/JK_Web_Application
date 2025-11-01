const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Hardcoded admin (for simplicity)
const ADMIN_EMAIL = 'admin@org.com';
const ADMIN_PASSWORD = 'admin123';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.email !== ADMIN_EMAIL) throw new Error();
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No token' });
  }
});

// Login route (you'll call this from frontend)
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = { protect, loginAdmin };