import express from 'express';
import { addMovie } from '../../controller/admin/movieController.js';

const router = express.Router();

router.post("/addmovie",addMovie);


export { router as movieRouter };