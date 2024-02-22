import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userRouter } from "./routes/userRouter.js";
import { authRouter } from "./routes/authRouter.js";
import { adminAuthRouter } from "./routes/admin/adminAuthRouter.js";
import { movieRouter } from "./routes/admin/movieRouter.js";
import createConnection from "./config/dbConnect.js";
import cors from "cors";

const app = express();

const PORT = process.env.APP_PORT;
dotenv.config();
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// cors error auuna sakxa ra aslai chai route handler vanda agadi nai rakhna parxa
app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a connection pool
const db = await createConnection();

// Check the database connection status
db.promise()
  .getConnection()
  .then((connection) => {
    console.log("Connected to the database!");
    connection.release();
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });

app.use("/", userRouter);
app.use("/auth", authRouter);
app.use("/admin", adminAuthRouter);
app.use("/movie", movieRouter);

app.set("view engine", "ejs");
