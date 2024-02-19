import express from "express";
import connectDB from "../database/mongoDb.mjs";
import dotenv from "dotenv";
dotenv.config({ path: "../env"});


const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

import urlsRouter from "../routes/urls.mjs";
import indexRouter from "../routes/index.mjs";

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// api routes
app.use("/", indexRouter);
app.use("/api", urlsRouter);



// Server Setup
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});