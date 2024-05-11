const express = require('express');
require('dotenv').config();
const app = express();

const authRoutes = require('./routes/auth.routes');
const protectedRoutes = require('./routes/protected.routes');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


