const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
mongoose.connect('mongodb://localhost/storbase', {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', error => console.error());
db.once('open', () => {
    console.log('connected to mongodb');
})
app.use('/', indexRouter);
app.listen(process.env.PORT || 3000);