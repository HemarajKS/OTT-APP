import express from "express";
import menuRouter from "./routes/menuRoutes.mjs";
import moviesRouter from "./routes/movieRoutes.mjs";

const app = express();

app.use(express.json());

app.use("/api/menu", menuRouter);
app.use("/api/movies", moviesRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
