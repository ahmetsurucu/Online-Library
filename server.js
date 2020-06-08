
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: false }));

// Routers
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');

// Settings
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected To Mongoose'));


// Routes
app.use('/', indexRouter);
app.use('/authors', authorRouter);

// Server Initialization
app.listen(process.env.PORT || 3000);