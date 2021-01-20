const express = require("express");
const axios = require('axios')
const fs = require('fs')
var multer  = require('multer')
var FormData = require('form-data');
var upload = multer({ dest: 'uploads/' })
require('custom-env').env('localhost');
//require('custom-env').env('localhost');

const app = express()
const path = __dirname
var dbpool = require('./db');
const { response } = require("express");


app.use(express.urlencoded());
app.use(express.json());

app.get('/', function (req,res) {
  var params = req.query

  var queryy = `SELECT id FROM eventorganizer WHERE apikey = '${params.apikey}'`
  dbpool.query(queryy, (er, re) => {
    if(re.rows[0]){
      process.env['APIKEY'] = params.apikey
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

app.post('/savechart',upload.single('seatingarrangment'),(req,res,next)=>{
 // var url = `${process.env['PATHLOCAL']}?key=${process.env['APIKEY']}`
  var url = `${process.env['PATHLOCAL']}?key=11qq`
console.log(req.headers)



const form_data = new FormData();
form_data.append('seatingarrangment', fs.createReadStream(req.file.path));
//console.log(form_data.getBoundary())

axios({
  method: 'post',
  url: url,
  data: form_data,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": `multipart/form-data; boundary=${form_data.getBoundary()}`,
    Connection: "keep-alive",
    "Content-Length": 342588,
    "Accept-Encoding": "gzip, deflate, br",
    "Accept": "*/*",
    "name": `${req.body.name}`,
    "chartId": `${req.body.chartId}`
  }
}).then(response => {
  console.log("R")
})
.catch(error => {
  console.log("E")
})


  res.send("LLLL")
})



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
