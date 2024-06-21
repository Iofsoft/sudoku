
const express = require('express');
const app = express();

var board = [[5, 3, '', '', 7, '', '', '', ''],
[6, '', '', 1, 9, 5, '', '', ''],
['', 9, 8, '', '', '', '', 6, ''],
[8, '', '', '', 6, '', '', '', 3],
[4, '', '', 8, '', 3, '', '', 1],
[7, '', '', '', 2, '', '', '', 6],
['', 6, '', '', '', '', 2, 8, ''],
['', '', '', 4, 1, 9, '', '', 5],
['', '', '', '', 8, '', '', 7, 9]];


app.get('/', (req, res)=>{
    res.send('Hello');
});

app.get('/register', (req, res)=>{
    res.send('Register');
})

app.get('/login', (req, res) =>{
    res.send('Login');
});

app.get('/game', (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.json(board)
})

module.exports = app;