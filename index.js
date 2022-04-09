const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { check, validationResult } = require("express-validator");
const mongoDB = "mongodb://localhost:27017/login";
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

const urlencodedParser = bodyParser.urlencoded({ extended: false });

let loginSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    lastname: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 20
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 175
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

let loginModel = mongoose.model('users', loginSchema );

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
        res.json(req.body)
    })


app.get('/payment', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/compra.html`))
})

app.route('/create-account')
    .get((req,res)=>{
        res.sendFile(path.join(`${__dirname}/views/criar-conta.html`))
    })

    .post(urlencodedParser,[
        check('username','seu usuário deve ter mais de 3 caracteres')
            .exists()
            .isLength({ min: 3 }),
        check('newEmailUser','email não é válido')
            .isEmail()
            .normalizeEmail()
            .isLength({ min: 5})
        ], (req,res) =>{

        let newEmailUser = req.body.newEmailUser;
        let username = req.body.username;
        let lastname = req.body.lastname;
        let firstPasswd = req.body.primeiraSenha;
        let confirmPasswd = req.body.confirmarSenha;
        let age = req.body.idade;

        if(firstPasswd === confirmPasswd){
            console.log('As senhas são compatíveis');
        }else {
            console.log('As senhas não são compatíveis');
        }

        const createUser = new loginModel;

        async function insertUser(){

            try {

                await loginModel.create({
                    email: newEmailUser,
                    name: username,
                    lastname: lastname,
                    password: confirmPasswd,
                    age: age,
                    created_at: createUser.createdAt,
                });


                console.log('registrado!')
            }catch(error) {

                const messageError = error.message;
                console.log(messageError);
                if(messageError.substr(0,6) === 'E11000'){
                    //informar usuário que o email já existe
                    

                    console.log('email já existente');
                }
            }

        }

        insertUser();
        console.log(loginSchema.path('email'));
        console.log("Email: "+newEmailUser+" Nome: "+username+" Sobrenome: "+lastname+" Senha: "+confirmPasswd+" Idade: "+age)
    })

app.use('/static',express.static('static'))

app.listen(port,()=>{
    console.log("servidor rodando");
})