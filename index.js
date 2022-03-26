const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const mongoDB = "mongodb://localhost:27017/login"
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("conectado ao banco de dados");
}).catch((err)=>{
    if (err) {
        console.log("não foi possível conectar ao banco de dados");
        throw err;
    }
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


let loginSchema = new Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true
    }
});

let loginModel = mongoose.model('users', loginSchema );


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile)
app.set('view engine','html');


app.route('/')
    .get((req,res)=>{
        res.sendFile(path.join(`${__dirname}/views/index.html`));
    })

    .post((req,res)=>{
        let emailUser = req.body.emailUser;
        let passwdUser = req.body.senha;

        if(emailUser == 'admin@admin' && passwdUser == 'administrador'){
            res.redirect('/')
        }else{
            res.redirect('/login');
        }
    })

app.get('/about',(req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/sobre.html`));
})

app.get('/support',(req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/suporte.html`));
})

app.get('/cart', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/carrinho.html`))
})

app.route('/login')
    .get((req,res)=>{
        res.sendFile(path.join(`${__dirname}/views/login.html`))
    })

    .post((req,res)=>{
        let newEmailUser = req.body.emailNewUser;
        let username = req.body.username;
        let firstPasswd = req.body.primeiraSenha;
        let confirmPasswd = req.body.confirmarSenha;
        let age = req.body.idade;

        if(firstPasswd === confirmPasswd){
            res.redirect('/login')
        }else {
            res.redirect('/create-account');
        }

        async function insertUser(){
            await loginModel.create({
                email: newEmailUser,
                name: username,
                password: confirmPasswd,
                age: age,
                },
                (err)=>{
                    if(err) throw err;
                    console.log("registrado!")
            })
        }

        insertUser();
        console.log("Email: "+newEmailUser+" Nome: "+username+" Senha: "+confirmPasswd+" Idade: "+age)
    })


app.get('/payment', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/compra.html`))
})

app.get('/create-account', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/criar-conta.html`))
})

app.use('/static',express.static('static'))

app.listen(port,()=>{
    console.log("servidor rodando");
})