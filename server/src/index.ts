// index.ts
import express, { Express } from "express";
import dotenv from "dotenv";
import AuthRouter from "./routers/AuthRouter";
import cors from "cors";
import http from "http";
import { initializeSocketIO } from "./socket";

dotenv.config();
const app: Express = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 5001;

initializeSocketIO(httpServer);

app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/auth/user", AuthRouter);

app.get("/", (req, res) => {
  res.send("Express TS Server");
});

httpServer.listen(port, () => {
  console.log(`Server is running on ${port}`);
});