const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb_info')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


app.get('/', (req, res) => res.send('<h1>Hello World! 김소영입니다!</h1>'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));