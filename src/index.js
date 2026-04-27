import db from './config/db.js';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import messages from './routes/messages.js';
const PORT = 3000;

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT,()=>{
   console.log(PORT);
})


