const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

require('dotenv').config();

const app = express();

// 🔥 CORS CONFIG
app.use(cors({
    origin: 'http://localhost:3000',   // or set your frontend URL like http://localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});