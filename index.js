const express = require('express');
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors({
   origin: ['http://localhost:5173','https://furni-flex-client.vercel.app'],
}))


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.ucii3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const productsCollection = client.db('FurniFlex').collection('products')


    app.get('/',(req,res)=>{ res.send('FurniFlex server')})

    app.get('/products',async (req,res)=>{
          try{
            const products = await productsCollection.find().toArray()
            res.status(200).send(products)
          }
          catch(err){
            console.log(err.message)
          }
  
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.listen(port,()=> console.log(`listening on port ${port}`))