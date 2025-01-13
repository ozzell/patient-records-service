import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorLoggingMiddleware } from "./middlewares/logging";
import patientRoutes from "./routes/patients.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.redirect("/api");
});

app.use("/api", patientRoutes);

app.use(errorLoggingMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
