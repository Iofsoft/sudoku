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
    return res.status(201).send();
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return res.status(409).send();
    }
    console.error('Error during register:', err);
    return res.status(500).send('Error registering');
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
  const { username, numbersLeft } = req.body;

  try {
    const user = await User.findOne({ where: { username : username } });
    await Record.create({ numbersLeft, idUser: user.id });
    return res.status(201).send();
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return res.status(409).send();
    }
    console.error('Error during record creation:', err);
    return res.status(500).send('Error creating record');
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
      order: [['numbersLeft', 'ASC']],
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
