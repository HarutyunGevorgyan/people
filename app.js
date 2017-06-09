const mongoose = require('mongoose');
const express = require('express');
const body_parser = require('body-parser');
const app = express();
 mongoose.Promise = global.Promise;
app.listen(3002);

app.use(body_parser.urlencoded({
    extended: true
}));
app.use(body_parser.json());
let db = mongoose.createConnection('localhost:27017/gitc');

require('./models/users');
app.db = {
    users: db.model('users')
};


require('./controllers/api')(app);
