import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import dbConnect from "./Models/dbConnect.js"; 
import bodyParser from "body-parser";
import AuthRouter from "./Routes/AuthRouter.js";
import ProductRouter from "./Routes/ProductRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());


dbConnect();
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);

app.get("/", (req, res) => {
    res.send("This is home");
});

app.get("/comments", (req, res) => {
    res.send(["This is comment"]);
});

app.listen(5000, () => {
    console.log("Server is running on port 5000"); 
});
