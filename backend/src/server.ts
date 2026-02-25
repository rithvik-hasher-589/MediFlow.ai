import "dotenv/config";
import express from "express";
import cors from "cors";
import intakeRoutes from "./routes/intake.routes";

const app = express();
const port = process.env.PORT ?? 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/intake", intakeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
