const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
//const nodemailer = require('nodemailer')
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
        required: [true, 'o email é obrigatório'],
        lowercase: [true, 'é necessário que o email seja escrito em letra minúscula'],
        unique: [true, 'o email precisa ser único']
    },
    name: {
        type: String,
        required: [true, 'o nome é obrigatório'],
        min: [3, 'o nome tem que ter no mínimo 3 caracteres'],
        max: [20, 'o nome tem que ter no máximo 20 caracteres']
    },
    lastname: {
        type: String,
        required: [true,'o sobrenome é obrigatório'],
        min: [3, 'o sobrenome tem que ter no mínimo 3 caracteres'],
        max: [20, 'o sobrenome tem que ter no máximo 20 caracteres']
    },
    password: {
        type: String,
        required: [true, 'a senha é obrigatória'],
        min: [8, 'a senha tem que ter no mínimo 8 caracteres']
    },
    age: {
        type: Number,
        required: [true, 'a idade é obrigatória'],
        min: [14, 'tem que ter no mínimo 14 anos'],
        max: [175, 'tem que ter no máximo 175 anos']
    }
},{
    timestamps: true
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

    .post(urlencodedParser, (req,res) =>{

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

        let createUser = new loginModel;

        async function insertUser(){

            try {

                await loginModel.create({
                    email: newEmailUser,
                    name: username,
                    lastname: lastname,
                    password: confirmPasswd,
                    age: age
                });


                console.log('registrado!')
            }catch(error) {
                if(error) throw error;
            }

        }

        res.redirect('/create-account')

        insertUser();
        console.log("Email: "+newEmailUser+" Nome: "+username+" Sobrenome: "+lastname+" Senha: "+confirmPasswd+" Idade: "+age);

        const myEmail = 'joaovregio@outlook.com';
        const myPasswd = 'DogItalia2';


        async function sendEmail() {

            let transporter = nodemailer.createTransport({
                host: "smtp.office365.com",
                port: 587,
                secure: false,
                auth: {
                  user: myEmail,
                  pass: myPasswd,
                },
            });

            // verify connection configuration
            transporter.verify(function (error, success) {
              if (error) {
                console.log(error);
              } else {
                console.log("Servidor está pronto para mandar mensagens");
              }
            });

            // send mail with defined transport object
            let infoEmail = await transporter.sendMail({
                from: `João Vitor | e-commerce ${myEmail}`,
                to: newEmailUser,
                subject: "Cadastro no e-commerce",
                text: "Olá"+username+", sua conta foi registrada com sucesso",
                html: "Olá <b>"+username+"</b>, sua conta foi registrada com sucesso",
            });
        
        }
        sendEmail().catch(console.error);

    })


app.use('/static',express.static('static'))

app.listen(port,()=>{
    console.log("servidor rodando");
})