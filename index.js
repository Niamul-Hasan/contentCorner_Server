const express = require('express');
const app = express();
const cors=require('cors')
const port = process.env.PORT||4000;
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.mrxwu7g.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
    try{
        await client.connect();
        console.log("ContentCorner is connected to MongoDB");

        const contentCollection=client.db("Content_corner").collection("contents");

        app.post("/contents",async(req,res)=>{
            const data=req.body;
            const contents= await contentCollection.insertOne(data);
            res.send(contents);
        });

        app.get("/contents",async(req,res)=>{
            const contents=await contentCollection.find().toArray();
            res.send(contents);
        })

    }finally{

    }
}
run().catch(console.dir);


app.get("/",(req,res)=>{
    res.send("Content-Corner IS CONNECED....WITH SERVER");
})

app.listen(port, () => {
    console.log(`ContentCorner is listening on port ${port}`)
  })