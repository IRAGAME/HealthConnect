//import express from "express";
const express =require('express');
const path=require('path');
const pool= require('./config/db')

const PORT= process.env.PORT || 5000;
const app=express()
app.get('/', (rep, res) => {
    res.send('hello world');
});
app.get('/index', (rep, res) => {
    res.sendFile(path.join (__dirname,'../frontend/index.html'));
});



app.listen(PORT || 5000, ()=> {
    console.log(`le serveur est lancé sur http://localhost:${PORT}`);
});