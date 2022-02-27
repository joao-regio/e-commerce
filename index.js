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

app.get('/contato.html',(req,res)=>{
    res.sendFile(path.join(`${__dirname}/views/contato.html`));
})

app.use('/static',express.static('static'))

app.listen(port,()=>{
    console.log("servidor rodando");
})