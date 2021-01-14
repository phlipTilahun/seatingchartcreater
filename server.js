const express = require("express");

const app = express()
const path = __dirname
var dbpool = require('./db');

app.use((req,res,next) => {
    console.log(req.originalUrl)
    next()
})

app.get('/', function (req,res) {
  var params = req.query

  var queryy = `SELECT id FROM eventorganizer WHERE apikey = '${params.apikey}'`
  dbpool.query(queryy, (er, re) => {
    if(re.rows[0]){
      res.sendFile(path + "/index.html");
    }
    else{
      res.send("Not authorized")
    }
  })
});

app.get('/vue.js',(req,res,next)=>{
  res.sendFile(path + "/vue.js")
})

app.get('/main.js',(req,res,next)=>{
  res.sendFile(path + "/main.js")
})

app.get('/fabric.js',(req,res,next)=>{
  res.sendFile(path + "/fabric.js")
})

app.get('/styles.css',(req,res,next)=>{
  res.sendFile(path + "/styles.css")
})

app.get('/res/logo1.png',(req,res,next)=>{
  res.sendFile(path + "/res/logo1.png")
})

app.get('/res/logo2.png',(req,res,next)=>{
  res.sendFile(path + "/res/logo2.png")
})

app.get('/seat-map.json',(req,res,next)=>{
  res.sendFile(path + "/seat-map.json")
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
