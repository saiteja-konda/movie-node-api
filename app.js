const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')

app.use(cors())

mongoose.connect("mongodb+srv://baskinnature:3V6lxDhOpU7ujLnL@cluster0.x3arp.mongodb.net/Store?authSource=admin&replicaSet=atlas-v4kqin-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const moviesRouter = require("./routes/movies");
const addressRouter = require("./routes/address");
app.use("/movies", moviesRouter);
app.use("/address", addressRouter);

app.listen(process.env.PORT || 3001, () => console.log("Server Started"));
