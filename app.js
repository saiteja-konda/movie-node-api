const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')

app.use(cors())

mongoose.connect("mongodb+srv://govinduchaitanya3:1234@cluster0.jmt1h.mongodb.net/aha?retryWrites=true&w=majority", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const moviesRouter = require("./routes/movies");
app.use("/movies", moviesRouter);

app.listen(3000, () => console.log("Server Started"));
