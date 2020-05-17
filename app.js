const express = require('express');
const app = express();
const morgan =require('morgan');
const bodyParser = require('body-parser');

const routecarros = require('./routes/carros');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false})); // apenas dados simples
app.use(bodyParser.json()); // Json de entrada



//routes
app.use('/carros',routecarros);

//tratamento de erros
app.use((req,res,next)=>{
    const erro = new Error('Not Found');
    erro.status = 404;
    next(erro);
})

app.use((error,req,res,next)=>{
   res.status(error.status || 500);
   return res.send({
       erro:{
           mensagem:error.message
       }
   });
});

module.exports =app;