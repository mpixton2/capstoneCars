import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';



dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const cars_collection = process.env.MONGO_DB_COLLECTION1;
const orders_collection = process.env.MONGO_DB_COLLECTION2;
const orders_cars_collection = process.env.MONGO_DB_COLLECTION3;

const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());
app.use(express.static('./public'))

app.get('/cars', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(cars_collection);
        const socks = await collection.find({}).toArray();
        res.json(socks);

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Failed to retrieve any cars");
    }
});

app.get('/carslimit', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 10; // Default to 10 cars per page

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(cars_collection);

        const skip = (page - 1) * limit;

        const cars = await collection.find({}).skip(skip).limit(limit).toArray();

        res.json(cars);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Failed to retrieve any cars");
    }
});

app.get('/cars/count', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(cars_collection);

        const count = await collection.countDocuments({});

        res.json({ count });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Failed to retrieve car count");
    }
});



app.get('/cars/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const { id } = req.params;
        const collection = db.collection(cars_collection);
        const car = await collection.findOne({ "car_id": Number(id) });
        res.json(car);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Failed to retrieve car");
    }
});


app.get('/orders/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const { id } = req.params
        console.log(id)
        const collection = db.collection(orders_collection);
        const order = await collection.findOne({ "order_id": Number(id) });
        res.json(order)
    }
    catch (err) {
        res.status(500).send("Failed to retrieve order")
    }
});

app.get('/orders', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(orders_collection);
        const orders = await collection.find({}).toArray();
        res.json(orders);

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Failed to retrieve any cars");
    }
});
  

app.get('/orders_cars/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const { id } = req.params
        console.log(id)
        const collection = await db.collection(orders_cars_collection);
        const orders_cars = await collection.find({ "order_id": Number(id) });

        res.json(await orders_cars.toArray())
    }
    catch (err) {
        console.error(err)
        res.status(500).send("Failed to retrieve order")
    }
});



app.post('/orders', async (req, res) => {
    try {
      const order = req.body;
      const nextOrderId = order.order_id; 
  
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const collection = db.collection(orders_collection);
      
      const result = await collection.insertOne(order);
      
      client.close();
  
      res.json(result);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Failed to add a new order');
    }
  });
  

  app.post('/orders_cars', async (req, res) => {
    try {
      const orderCar = req.body;
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const collection = db.collection(orders_cars_collection);
      const result = await collection.insertOne(orderCar);
      res.json(result);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Failed to add a new order_car');
    }
  });

app.post('/cars/search', async (req, res) => {
    try {
        const { searchTerm } = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(cars_collection);
        const result = await collection.find({ 'car_color': searchTerm }).toArray();
        res.json(result);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Failed to find any cars of given color');
    }
});

app.put('/orders/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const { id } = req.params
        const body = req.body
        console.log(id, body)
        const collection = db.collection(orders_collection);
        const order = await collection.updateOne({ "order_id": Number(id) }, { $set: body });
        res.json(order)
    }
    catch (err) {
        res.status(500).send("Failed to retrieve order")
    }
});

app.delete('/orders_cars/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(orders_cars_collection);

        const result = await collection.deleteOne({ _id: ObjectId(id) });
        client.close();

        if (result.deletedCount === 1) {
            res.json({ message: 'Item deleted successfully' });
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (err) {
        console.error('Error deleting item from cart:', err);
        res.status(500).send('Failed to delete item from cart');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});