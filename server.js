// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());  // This allows all origins by default

app.use(express.json());  // Middleware to parse JSON request bodies

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));

// Use the routes
app.use('/products', productRoutes);  // Route for products
app.use('/auth', authRoutes);  // Route for authentication
app.use(cors({ origin: 'https://front-end-eta-one-74.vercel.app/' }));
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bi44309:yRAa8NyY4bo85tEL@cluster0.obdqg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




