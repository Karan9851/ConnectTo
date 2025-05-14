import express from "express";
import { createServer } from "node:http";



import path from 'path';
import { fileURLToPath } from 'url';

import { Server } from "socket.io";

import mongoose from "mongoose";
import connectToSocket from "./controllers/socketManager.js";

import cors from "cors";
import { connect } from "node:http2";
import userRoutes from "./routes/users.route.js";




const app = express();
const server = createServer(app);
const io = connectToSocket(server);





import roomRoutes from './routes/room.route.js';
app.use(express.json());








app.set("port", (process.env.PORT || 8080));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);


app.use('/api/v1/rooms', roomRoutes);


app.get('/', (req, res) => {
  res.send('Backend is working!');
});





const start = async () => {
    const connectionDB = await mongoose.connect("mongodb+srv://loginmail8250:connectto@connectto.yk8uefw.mongodb.net/?retryWrites=true&w=majority&appName=ConnectTo");

    console.log(`MONGO Connected DB Host: ${connectionDB.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("LISTENING ON PORT 8080")
    });

}


start();

export default app;



