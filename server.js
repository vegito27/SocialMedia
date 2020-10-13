const express=require('express')

const app=express()

const users=require('./router/users')

const profile=require('./router/profile')

const posts=require('./router/posts')

app.get('/',(request,response)=>{

	response.send('Hello World')

})


app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',posts)

const port= process.env.PORT || 5000

app.listen(port,()=>console.log(`Server running on port ${port}`))


const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://socialApp:rishabh@123@cluster0.sadge.gcp.mongodb.net/mydb?retryWrites=true&w=majority";





const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true })
	client.connect(err => {
		
	const collection = client.db("mydb").collection("myCollection")

	console.log('Mongo Connected')
    
    client.close();
})

	