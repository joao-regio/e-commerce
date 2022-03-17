const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.get('/',(req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/index.html`));
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

app.get('/login',(req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/login.html`))
})

app.get('/payment', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/compra.html`))
})

app.get('/create-account', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/criar-conta.html`))
})

app.use(express.urlencoded({ extended: true }));
app.post('/', (req,res)=>{
    const emailUser = req.body.user;
    const passwordUser = req.body.senha;
    const nameUser = req.body.nameUser;
    const emailCreated = req.body.emailUser;
    const firstPassword = req.body.primeiraSenha;
    const passwordCreated = req.body.confirmarSenha;

    res.send("email criado pelo usuario: "+emailCreated)
})


app.use('/static',express.static('static'))

app.listen(port,()=>{
    console.log("servidor rodando");
})