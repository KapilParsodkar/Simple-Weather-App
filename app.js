const express= require("express")
const https=require("https")
const bodyParser=require("body-parser")
const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){

const query=req.body.cityName
const apikey="62bd14efaa2c70200752b49d622e7b"
const units="metric"
const url ="https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+apikey+"cc&units="+units
https.get(url,function(response){
console.log(response.statusCode)

response.on("data",function(data){
    const weatherdata=JSON.parse(data)
    console.log(weatherdata)
    const object={
        name:"kapil",
        job:"being cool"
    }
    console.log(JSON.stringify(object))

    const temp=weatherdata.main.temp
    
    const mintemp=weatherdata.main.temp_min
    console.log(temp)
    console.log(mintemp)
    let wdescrip=weatherdata.weather[0].description
    const icon=weatherdata.weather[0].icon
    const imageurl="http://openweathermap.org/img/wn/"+ icon+"@2x.png"
    console.log(wdescrip)
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Kaps weather application</h1>")
    res.write("<h2>the weather  description is "+wdescrip+"</h2>");
    res.write("<h1>the temperature in "+query+" is "+temp+" Degree Celsius </h1>");
    res.write("<img src="+imageurl+">")
    res.send()
})
})

})



app.listen(process.env.PORT||3000,function(){
    console.log("server running on 3000")
})