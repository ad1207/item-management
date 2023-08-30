const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const database = require('./database');
app.use(express.json());
dotenv.config();
app.use(cors());
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

database.connect();

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})