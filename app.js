const express = require('express')
const app = express()
const elastic = require('./module/connection.js');

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.listen(3000, () => {
  console.log('server start')
})

app.get('/', function(req, res) {
  res.send('hello')
})

app.get('/es', function(req, res) {
    elastic.search({
        index: 'product',  //elastic의 index명 (index에 product가 없다면 결과값이 나오지 않음)
        body: {
            query: {
            quote: '셀린느'   //검색할 단어 명 작성
            }
        }
    }, (err, result) => {
        if (err) console.log(err)
        console.log(result);
    })
})
