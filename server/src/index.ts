import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import AuthRouter from "./routers/AuthRouter";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import {ServerResponse, createServer} from "http";
const port = process.env.PORT || 5001;

dotenv.config();

const app: Express = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection",(socket)=>{
  console.log("User Connected", socket.id);

  socket.on("message",(data)=>{
    console.log(data);
  })

  socket.on("disconnect",()=>{
    console.log("User Disconnected", socket.id);
  })
})

app.use(express.json());

const corsOptions ={
  origin:['http://localhost:3000'], 
  credentials:true,         
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use('/auth/user',AuthRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express ts Server");
});

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });

httpServer.listen(port, () => {
  console.log(`Server is running on ${port}`);
});