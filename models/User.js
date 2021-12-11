const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlengt: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // user와 manager를 구분하기 위함
        type: Number,
        default: 0
    },
    image: String,
    token: { // 유효성 등을 관리
        type: String
    }, 
    tokenExp: { // token 유효 기한
        type: Number
    }
})

const User = mongoose.model('User', userSchema);

// 다른 파일에서 해당 모델을 사용 가능하게
module.exports = { User };