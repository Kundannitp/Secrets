require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose =require('mongoose');
var encrypt = require('mongoose-encryption');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/UserId', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema=new mongoose.Schema({
    userName:String,
    password:String
});

UserSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

const User=mongoose.model('Users',UserSchema);

app.get('/',function(req,res){
    res.render('home');
});

app.post('/',function(req,res){
});

app.get('/login', function (req, res) {

    res.render('login');
});

app.post('/login', function (req, res) {
    const username=req.body.username;
    const password=req.body.password;

    User.findOne({userName:username},function(err,userfound){
        if(err){
            console.log(err);
        }
        else{
            if(userfound.password===password)
            {
                res.redirect('/secrets');
            }
            else{
                
            }
        }
    });

});

app.get('/register', function (req, res) {
    res.render('register');
});

app.post('/register', function (req, res) {
    var user=new User({
        userName:req.body.username,
        password:req.body.password
    });
    user.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/secrets');
        }
    });
});

app.get('/secrets', function (req, res) {
    res.render('secrets');
});

app.post('/secrets', function (req, res) {});

app.get('/submit', function (req, res) {
    res.render('submit');
});

app.post('/submit', function (req, res) {
});

app.listen(process.env.PORT || 4000, function () {
    console.log("app started at 4000 port");
});