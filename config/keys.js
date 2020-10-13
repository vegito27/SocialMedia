
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://socialApp:<rishabh@123>@cluster0.sadge.gcp.mongodb.net/mydb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
