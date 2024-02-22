import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Hello from a server / server has been hit");
  res.send(
    "Hello there this Movie App WOrking Fine visit https://kumarchaudhary.com.np/ for more info"
  );
});

export { router as userRouter };
