import express from "express";
import notes from "./data/notes.js";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
config(); // initialize dotenv

const app = express();

app.use(cors()); // to allow cross-origin requests

connectDB(); // connect to database

app.use(express.json()); // to accept JSON data in the body

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// app.get('/api/notes/:id', (req, res) => {
//   const note = notes.find((n) => n._id === req.params.id);
//   res.send(note);
// });

app.use("/api/users", userRoutes);

app.use(notFound); // use the notFound handler
app.use(errorHandler); // use the error handlers

app.listen(PORT, console.log(`Server running on port ${PORT}`)); // listen to port

export default app;
