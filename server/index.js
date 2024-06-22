const bodyParser = require('body-parser');
const User = require('./models/user');
const Record = require('./models/record');
const express = require('express');
const cors = require('cors');
const { UniqueConstraintError } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', async (req, res)=>{
    const {username, email, password} = req.body;
    try{
        await User.create({username, email, password});
        res.status(201).send()
    
    }catch (err){
        if(err instanceof UniqueConstraintError){
            res.status(409).send()
        }
        else{
            console.log('Error during register: ', err);
            res.status(500).send('Error registering');
        }
    }
})

app.post('/record', async (req, res)=>{
    const {username, remainingNumbers} = req.body;

    try{
        const user = await User.findOne({where: {username: username}});
        await Record.create({remainingNumbers, idUser:user.id});
        res.status(201).send()
    
    }catch (err){
        if(err instanceof UniqueConstraintError){
            res.status(409).send()
        }
        else{
            console.log('Error during register: ', err);
            res.status(500).send('Error registering');
        }
    }
})


app.post('/login', async (req, res) => {
    const { username, password } = req.body;  
    try {
        const user = await User.findOne({
            where:{
                username: username,
                password: password
            }
        })
  
        if (!user) {
            console.log('User not found');
            res.status(401).send();
        } else {
            res.status(200).send();
        }
    } catch (err) {
        console.log('Error during login:', err);
        res.status(500).send();
    }
  });

app.get('/game', (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
})

app.get('/record', async (req, res) =>{
    try{
        const records = await Record.findAll({
            include:[{
                model:User,
                attributes: ['username']
            }],
            order:[['remainingNumbers']]
        });
        res.json(records);
    }
    catch(error){
        console.error('Error fetching records:', error);
        res.status(500).json({ error: 'Failed to fetch records' });
    }
});

module.exports = app;