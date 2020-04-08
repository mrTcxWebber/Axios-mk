const express = require('express');
const app = express()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //允许的请求类型
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,POST');
    res.header('Access-Control-Allow-Headers', '*');
    // 'Access-Control-Allow-Methods:GET,POST,PUT,POST'
    //允许的请求头字段
    // 'Access-Control-Allow-Headers:x-requested-with,content-type'
    next()
})

app.get("/aaa", (req, res) => {
    // console.log('请求成功了？')
    // res.send('返回了')

    res.status(200).json({ status: 'ok', code: 304, msg: 'qq' })
})
app.post("/qnm", (req, res) => {
    // console.log('请求成功了？')
    // res.send('返回了')

    res.status(200).json({ status: 'ok', code: 200, msg: '123' })
})

app.listen(3002)