const express = require('express');
const session = require('express-session');
const app = express();
const authRoutes = require('./routes/authRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use('/auth', authRoutes);
app.use('/token', tokenRoutes);

app.listen(3000, () => console.log('OAuth server running on port 3000'));
