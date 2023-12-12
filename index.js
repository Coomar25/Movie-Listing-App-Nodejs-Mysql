import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userRouter } from "./routes/userRouter.js";
import { authRouter } from './routes/authRouter.js';
import { adminAuthRouter } from './routes/admin/adminAuthRouter.js';
import {movieRouter} from './routes/admin/movieRouter.js';
import  createConnection  from "./config/dbConnect.js";
import cors from "cors"



const app = express();
const PORT = process.env.APP_PORT || 5000;
dotenv.config();

app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Create a connection pool
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

app.use(cors({origin: process.env.CORS_URL}));
// cors error auuna sakxa ra aslai chai route handler vanda agadi nai rakhna parxa
app.use("/", userRouter);
app.use('/auth', authRouter);
app.use('/admin', adminAuthRouter);
app.use('/movie', movieRouter);


app.set('view engine', 'ejs');











