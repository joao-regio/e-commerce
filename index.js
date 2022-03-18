const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");

app.use(session({ secret: "nerjtgniorjnoijn" }))
app.use(bodyParser.urlencoded({extended:true}))
app.engine('html', require('ejs').renderFile)
app.set('view engine','html');

app.route('/')
    .get((req,res)=>{
        res.sendFile(path.join(`${__dirname}/views/index.html`));
    })

    .post((req,res)=>{
        let emailUser = req.body.emailUser;
        let passwdUser = req.body.senha;

        if(emailUser == 'admin@admin' && passwdUser == 'admin'){
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
        let newNameUser = req.body.username;
        let firstPasswd = req.body.primeiraSenha;
        let confirmPasswd = req.body.confirmarSenha;
        let age = req.body.idade;

        if(firstPasswd === confirmPasswd){
            res.redirect('/login')
        }else {
            res.redirect('/create-account')
        }
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