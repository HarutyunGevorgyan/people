const validator = require('../service/validator');
module.exports  = function(app) {


app.get('/api/users', (req, res) => {
  res.send('hello');
});

app.post('/api/users', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;
    let email = req.body.email;
    let age = req.body.age;

    if (!username) {
       return res.status(400).send(validator.generateError('Username is not specified'));
    }
    if (!validator.isAscii(username)) {
        return res.status(400).send(validator.generateError('Username contains non-ASCII characters'));
    }

    if (!validator.checkMinLength(username, 4)) {
        return res.status(400).send(validator.generateError('Invalid minimum length for username, must be >= 4'));
    }
    if (!validator.checkMaxLength(username, 50)) {
        return res.status(400).send(validator.generateError('Invalid max length for username, must be <= 50'));
    }
    if (!validator.checkSpecialSymbols(username)) {
        return res.status(400).send(validator.generateError('Username contains special symbols, allowed only -,_,.'));
    }
    if (!password) {
        return res.status(400).send(validator.generateError('Password is not specified'));
    }
    if (!validator.isAscii(password)) {
        return res.status(400).send(validator.generateError('Password contains non-ASCII characters'));
    }
    if (!validator.checkMinLength(password, 6)) {
        return res.status(400).send(validator.generateError('Invalid minimum length for password, must be >= 6'));
    }
    if (!validator.checkMaxLength(password, 25)) {
        return res.status(400).send(validator.generateError('Invalid max length for password, must be <= 25'));
    }
    if (!email){
      return res.status(400).send(validator.generateError('Email is not specified'))
    }
    if (!validator.checkEmail(email)){
      return res.status(400).send(validator.generateError('Invalid email'))
    }
    if (!validator.checkMinLength(email, 10)) {
        return res.status(400).send(validator.generateError('Invalid minimum length for email, must be >= 10'));
    }
    if (!validator.checkMaxLength(email, 255)) {
        return res.status(400).send(validator.generateError('Invalid max length for email, must be <= 255'));
    }
    if (!name){
      return res.status(400).send(validator.generateError('Name is not specified'));
    }
    if (!validator.checkName(name)){
      return res.status(400).send(validator.generateError('Invalid name'));
    }
    if (!validator.checkMinLength(name, 2)) {
        return res.status(400).send(validator.generateError('Invalid minimum length for name, must be >= 2'));
    }
    if (!validator.checkMaxLength(name, 100)) {
        return res.status(400).send(validator.generateError('Invalid max length for name, must be <= 100'));
    }
    if (!age){
      return res.status(400).send(validator.generateError('Age is not specified'));
    }
    if (!isFinite(parseInt(age))){
      return res.status(400).send(validator.generateError('Only numbers,please'));
    }
    if (age<18){
      return res.status(400).send(validator.generateError('must be greater 18'));
    }

    let new_user = new app.db.users();
    new_user.username = username;
    new_user.password = password;
    new_user.name=name;
    new_user.email=email;
    new_user.age=age;

    new_user.save((err, doc) => {
        if (err) {
            return res.send({
                status: 'error',
                message: err
            })
        }
        return res.send(doc);
    });
});

app.get('/api/users/:username', (req, res) => {
    app.db.users.findOne({username: req.params.username}, (err, doc) => {
        if (err || !doc) {
            return res.send('user not found');
        }
        return res.send(doc);
    })
});

app.put('/api/users/:id', (req, res) => {

});
}
