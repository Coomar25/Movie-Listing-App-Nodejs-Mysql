import express from "express";
const router = express.Router();


router.get('/', (req, res) => {
        res.send("Hello there this Movie App WOrking Fine visit https://kumarchaudhary.com.np/ for more info");
}   
);


export { router as userRouter };
