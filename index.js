const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

// body-parser option
// application/x-www-from-urlencoded type의 데이터들을 분석해서 가져올 수 있게
app.use(bodyParser.urlencoded({ extended: true }));
// application/json type의 데이터들을 분석해서 가져올 수 있게
app.use(bodyParser.json());


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


app.get('/', (req, res) => res.send('<h1>Hello World! 반갑습니다!</h1>'));


app.post('/register', (req, res) => {
    // 회원 가입에 필요한 정보들을 client에서 가져오면
    // 그것들을 database에 넣어준다.

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err});
        return res.status(200).json({
            success: true
        })

    }); // mongoddb 메소드
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));