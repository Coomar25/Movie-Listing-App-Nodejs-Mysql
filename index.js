import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userRouter } from "./routes/userRouter.js";
import { authRouter } from './routes/authRouter.js';
import { postRouter } from './routes/postRouter.js';
import  createConnection  from "./config/dbConnect.js";
import checkPrismaConnection from "./config/checkPrismaConnection.js";
import cors from "cors"



const app = express();
const PORT = process.env.APP_PORT || 4000;
dotenv.config();

app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: process.env.CORS_URL}));


// Create a connection pool
checkPrismaConnection();
const db = createConnection();

// Check the database connection status
db.promise()
  .getConnection()
  .then((connection) => {
    console.log('Connected to the database!');
    connection.release(); 
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
  });



app.use("/", userRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);









