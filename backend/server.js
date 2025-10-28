import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./database/db.js";
import cors from "cors";
import productRoute from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import checkrouter from "./routes/checkoutRoute.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
ConnectDB();
const app = express();

app.use(express.json());
app.use(cors());

//Deployement

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});


app.use("/api", productRoute);
app.use("/api", cartRouter);
app.use("/api", checkrouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});