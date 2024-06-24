const bodyParser = require('body-parser');
const User = require('./models/user');
const Record = require('./models/record');
const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
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
  try {
    await User.create({ username, email, password });
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
        username:username,
        password:password,
      },
    })

    if (!user) {
      return res.status(401).json({
      });
    }else{
      return res.status(200).send();
    }
    // const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: 300 });
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

// app.post('/logout', (req, res) => {
//   const token = req.headers['x-access-token'];
//   if (token) {
//     blacklist.push(token);
//   }
//   res.end();
// });


module.exports = app;
