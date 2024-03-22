import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import AuthRoter from "./routers/AuthRouter";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/auth/user',AuthRoter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express ts Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

