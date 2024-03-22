import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import AuthRouter from "./routers/AuthRouter";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

