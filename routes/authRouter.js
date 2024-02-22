import express from "express";
import { registerUser } from "../controller/auth.js";
import { loginUser } from "../controller/auth.js";
import { logoutUser } from "../controller/auth.js";
import { testTokenFunction } from "../controller/auth.js";
import { authenticateToken } from "../middleware/authentication.js";
import { bardAPI } from "../controller/bardapi/bardapi.js";
const router = express.Router();

router.post("/registeruser", registerUser);
router.post("/loginuser", loginUser);
router.post("/logoutuser", logoutUser);
router.get("/bardapi/:questions", bardAPI);

router.get("/testtoken", authenticateToken, testTokenFunction);

export { router as authRouter };
