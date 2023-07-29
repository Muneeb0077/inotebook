const connextToMongo=require('./db');
const express = require('express');

connextToMongo();

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Muneeb!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})