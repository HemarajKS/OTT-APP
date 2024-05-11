import express from "express";
import menuRouter from "./routes/menuRoutes.mjs";
import moviesRouter from "./routes/movieRoutes.mjs";
import tvShowsRouter from "./routes/tvShowsRoutes.mjs";

const app = express();

app.use(express.json());

app.use("/api/menu", menuRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/tv-shows", tvShowsRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
