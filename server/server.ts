import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import listsRoute from "./routes/list";

dotenv.config();

const app = express()
app.use(express.json());
app.use(cors({
    origin: "*"
}));


app.use('/api/users', userRoute);
app.use('/api/lists', listsRoute);
app.use('/api/auth', authRoute);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
