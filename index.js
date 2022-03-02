const express = require("express");
const app = express();
const port = 5000;
const path = require("path");

app.get('/',(req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/index.html`));
})

app.get('/sobre.html',(req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/contato.html`));
})

app.get('/suporte.html',(req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/contato.html`));
})

app.get('/carrinho.html', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/carrinho.html`))
})

app.get('/login.html',(req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/login.html`))
})

app.use('/static',express.static('static'))

app.listen(port,()=>{
    console.log("servidor rodando");
})