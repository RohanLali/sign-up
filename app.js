const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');

const app = express();
const port = process.env.PORT

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use (express.static("public")) 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html')
})

app.post('/',(req,res)=>{
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    
   

    const data = {
      members:[{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          Fname: firstName,
          Lname: lastName
        }
      }]
    };
    const jsondata = JSON.stringify(data);

    console.log(jsondata);

    const url = " https://us10.api.mailchimp.com/3.0/lists/b548493292";
    const options = {
      method: "POST",
      auth: "rohan:a97b1ad527fa66f2ae1b10e358927a44-us10"
    }
    
    const request = https.request(url,options,(response)=>{
      if(response.statusCode === 200){
        res.sendFile(__dirname+'/success.html')
      }
      else{
        res.sendFile(__dirname+'/failure.html')
      }
      
      response.on("data",(data)=>{
        console.log(JSON.parse(data));
      })
    })
    request.write(jsondata);
    request.end();
});

app.post('/failure',(req,res)=>{
  res.redirect('/')
})
app.post('/success',(req,res)=>{
 res.redirect('/')
})

app.listen(port || 3000, () => {
  console.log(`Active port ${port}`)
})


//api key -a97b1ad527fa66f2ae1b10e358927a44-us10
//audience id - b548493292