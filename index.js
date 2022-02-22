const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
// mongoose.connect('mongodb+srv://yxuna:abcd1234@cluster0.nn24x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello'))

//회원가입
app.post('/register', (req, res) => {

    //회원가입 시 필요한 정보들을 client에서 가져오면 데이터 베이스에 넣어준다.
    const user = new User(req.body)
    // body안에는 json형식으로 id, pw.. 등 들어있음

    //정보들이 저장됨
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
