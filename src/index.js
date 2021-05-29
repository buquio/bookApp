//BUKA

const express = require('express');
const app = ('express');
// const port = 4000;
require('dotenv').config();

const port = process.env.PORT;
const dbSetup = require('./database/setup');


//require routes
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes')


//seeders
const { seedAdmin } = require('./seeders/admin')
// console.log(seedAdmin())

app.use(express.json());

//setup DB
dbSetup();

app.use('/auth', authRoutes);
app.use(bookRoutes);



app.listen(port, () => console.log('server listening on port ${port}'))



