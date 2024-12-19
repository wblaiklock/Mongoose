require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const conn = require('./config/db');
const starterFruits = require('./config/seed');
const Fruit = require('./models/fruit');
const fruitRoutes = require('./routes/fruitRoutes');
conn();

app.use(express.json())
app.use('/api/fruits', fruitRoutes);

//home route
app.get('/', async (req,res) => {
    await res.send('Home page');
})

//seed route
app.get('/fruits/seed', async (req,res) => {
    try {
        await Fruit.deleteMany({});
        await Fruit.create(starterFruits);
        res.json(starterFruits);
    } catch (err) {
        console.log(err)
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})




