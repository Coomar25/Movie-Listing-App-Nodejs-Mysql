import express from 'express';
import { addMovie, updateMovieHandler } from '../../controller/admin/movieController.js';
import {getAllMovies,nowShowingMovies , nextReleaseMovies, commingSoonMovies, getMovieBySlug, bookSeat, getBookedSeats} from '../../controller/movie/clientviewMovieController.js';
const router = express.Router();

router.post("/addmovie",addMovie);
router.put("/updateMovie", updateMovieHandler);
router.get("/getallmovies", getAllMovies);
router.get("/nowshowingmovies", nowShowingMovies);
router.get("/nextrelease", nextReleaseMovies);
router.get("/commingsoon", commingSoonMovies);
router.get('/getmovie/:slug', getMovieBySlug);
router.post('/bookseat/:slug/:user_id', bookSeat);
router.post('/getBookedSeats/:slug/:user_id', getBookedSeats);



export { router as movieRouter };