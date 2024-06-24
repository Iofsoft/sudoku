const bodyParser = require('body-parser');
const User = require('./models/user');
const Record = require('./models/record');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = 'sudoku';
const { UniqueConstraintError } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const blacklist = [];

// const verifyJWT = (req, res, next) => {
//     const token = req.headers['x-access-token'];
//     if (!token || blacklist.includes(token)) {
//       return res.status(401).json({ auth: false, message: 'Unauthorized' });
//     }
  
//     jwt.verify(token, SECRET, (err, decoded) => {
//       if (err) {
//         console.error('JWT verification error:', err);
//         return res.status(401).json({ auth: false, message: 'Failed to authenticate token' });
//       }
//       req.userId = decoded.id;
//       next();
//     });
//   };
  
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({ username, email, password:hashedPassword });
    res.status(201).send();
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).send();
    }
    else{
      console.error('Error during register:', err);
      res.status(500).send('Error registering');
    }
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        username:username
      },
    })
    if(user && await bcrypt.compare(password, user.password)){
      const accessToken = jwt.sign({username:user.username}, SECRET);
      console.log(accessToken)
      res.status(200).json({username, accessToken});
    }else{
      return res.status(401).send();
    }
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).send();
  }
});

app.post('/record', async (req, res) => {
  const { username, numbersLeft, hits, miss, score } = req.body;
  try {
    const user = await User.findOne({ where: {username:username}});
    await Record.create({ numbersLeft, rightNumbers:hits, wrongNumbers:miss, score,  idUser: user.id });
    res.status(201).send();
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).send();
    }
    else{
      console.error('Error during record creation:', err);
      res.status(500).send('Error creating record');
    }
  }
});

app.get('/game', async (req, res) =>{
    res.status(200).send()
})

app.get('/record', async (req, res) => {
  try {
    const records = await Record.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['score', 'DESC'],['rightNumbers', 'DESC']],
      limit: 10
    });
    console.log(records)
    return res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    return res.status(500).json({ error: 'Failed to fetch records' });
  }
});

app.post('/logout', (req, res) => {
  
  res.status(200).send();
});


module.exports = app;
