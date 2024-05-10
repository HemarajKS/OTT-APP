import express from "express";
import menuRouter from "./routes/menuRoutes.mjs";

const app = express();

app.use(express.json());

app.use("/api", menuRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
