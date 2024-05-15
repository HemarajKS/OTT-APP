import express from "express";
import cors from "cors";
import "dotenv/config";
import menuRouter from "./routes/menuRoutes.mjs";
import moviesRouter from "./routes/movieRoutes.mjs";
import tvShowsRouter from "./routes/tvShowsRoutes.mjs";
import dashboardRouter from "./routes/dashboardRoutes.mjs";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/api/menu", menuRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/tv-shows", tvShowsRouter);
app.use("/api/home", dashboardRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
