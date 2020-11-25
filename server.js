const express=require('express')

const app=express()

const users=require('./router/users')

const profile=require('./router/profile')

const posts=require('./router/posts')

const mongoose=require("mongoose");

 const passport=require("passport");

const bodyParser=require('body-parser')

const {MONGO_URI}=require('./config/keys')


const path=require('path')

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json()) 

app.use(passport.initialize())

require('./config/passport')(passport) 


mongoose.connect(MONGO_URI,{ useUnifiedTopology: true , useNewUrlParser: true })

const connection=mongoose.connection;

connection.once("open",()=>{
    console.log("MongoDB database connection established successfully");

}).catch(err=>console.error(err))


app.get("/", (req, res) => {
  res.send("hello");
});

app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',posts)
 

if(process.env.NODE_ENV==='production'){

	app.use(express.static('client/build'))

	app.get('*',(request,response)=>{

		response.sendFile(path.resolve(__dirname,'client','build','index.html'))

	})
}

app.listen(4000, () => {
  console.log("server start at 4000");
});	 



