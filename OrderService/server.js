import express from 'express';
import { connect } from 'mongoose';
import bodyParser from 'body-parser';
import Order from './models/Order.js';
import amqp from 'amqplib';
const app = express();
const { json } = bodyParser;
app.use(json());

// Connect to MongoDB
connect('mongodb://localhost:27017/OrderDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create an order
app.post('/orders', async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
});

// Get all orders
app.get('/orders', async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
});

app.listen(3001, () => {
    console.log('Order Service running on port 3001');
});



async function consumeMessages() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'user_created';
    await channel.assertQueue(queue, { durable: false });

    console.log('Waiting for messages...');

    channel.consume(queue, (message) => {
        if (message !== null) {
            console.log(`Received message: ${message.content.toString()}`);
            channel.ack(message);
        }
    });
}

consumeMessages().catch(console.error);