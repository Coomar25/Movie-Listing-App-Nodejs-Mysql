import express from 'express';
import { adminloginUser} from '../../controller/admin/adminAuth.js';

const router = express.Router();

router.post("/login", adminloginUser);



export { router as adminAuthRouter };
