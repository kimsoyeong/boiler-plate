const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require("./models/User");

// body-parser option
// application/x-www-from-urlencoded type의 데이터들을 분석해서 가져올 수 있게
app.use(bodyParser.urlencoded({ extended: true }));
// application/json type의 데이터들을 분석해서 가져올 수 있게
app.use(bodyParser.json());

// cookie-parser option
app.use(cookieParser());


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// router setting
app.get('/', (req, res) => res.send('<h1>Hello World! 반갑습니다!</h1>'));

app.get('/api/hello', (req, res) => res.send('안녕하세요 ~ '));

app.post('/api/users/register', (req, res) => {
    // 회원 가입에 필요한 정보들을 client에서 가져오면
    // 그것들을 database에 넣어준다.
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err});
        return res.status(200).json({
            success: true
        })

    }); // mongoddb 메소드
});

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "이메일에 해당하는 유저가 없습니다."
            })
        }

        // 요청한 E-mail이  데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) // 비밀번호 틀림
                return res.json({ loginSuccess: false, message: "비밀번호가 맞지 않습니다." });
            
            // 비밀번호까지 맞다면 user를 위한 token 생성.
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 등 여러가지 방법이 있다.
                // 일단 쿠키에 저장해보자.
                res.cookie("x_auth", user.token)    
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id }); 
            });

        })
    })
});

app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과해왔다는 얘기는 Authentication이 True라는 말!
    // 이를 클라이언트에 정보(user 정보)를 전달해줘야 한다.
    // auth.js에서 req에 user를 넣었기에 req.~~로 접근 가능
    console.log("auth get");
    res.status(200).json({
        _id: req.user._id, 
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    }); // 어떤 페이지에서든 user 정보를 이용할 수 있어 편해진다!
});

app.get('/api/users/logout', auth, (req, res) => { // login된 상태이므로 auth middleware를 넣어준다.
    User.findOneAndUpdate({ _id: req.user._id }, // auth에서 req에 넣어준 user 정보 이용
        { token: "" }  // token 삭제
        , (err, user) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            });
        });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));