const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

const app = express();

// middle ware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eluedpr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const mobileCategoryCollection = client.db('mobilePlanet').collection('mobileCategory');

    const usersCollection = client.db('mobilePlanet').collection('users');

    app.get('/mobileCategory', async (req, res) => {
      const query = {};
      const result = await mobileCategoryCollection.find(query).toArray();
      res.send(result);
    });




    app.post('/users', async (req, res) => {
      const users = req.body;
      console.log(users);
      const result = await usersCollection.insertOne(users);
      res.send(result);
    });

  }

  finally {

  }
}

run().catch(console.log);




app.get('/', (req, res) => {
  res.send('Mobile planet server is running');
});

app.listen(port, (req, res) => {
  console.log(`Mobile planet running on ${port}`);;
});