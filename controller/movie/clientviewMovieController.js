import createConnection from "../../config/dbConnect.js";
import joi from "joi";

const db = createConnection();

export const getAllMovies = async (req, res) => {
  let connection;
  try {
    connection = await db.promise().getConnection();
    // Retrieve now showing movies with category information

    const nowShowingSql = `
  SELECT m.*, c.type as category_type
  FROM movies m
  JOIN category c ON m.category_id = c.id
  WHERE c.type = 'nowshowing';
`;

    const commingsoonSql = `
  SELECT m.*, c.type as category_type
  FROM movies m
  JOIN category c ON m.category_id = c.id
  WHERE c.type = 'commingsoon';
`;

    const nextreleaseSql = `
  SELECT m.*, c.type as category_type
  FROM movies m
  JOIN category c ON m.category_id = c.id
  WHERE c.type = 'nextrelease';
`;

    const [nowShowingMovies] = await connection.execute(nowShowingSql);
    const [commingSoonMOvies] = await connection.execute(commingsoonSql);
    const [nextReleaseMovies] = await connection.execute(nextreleaseSql);
    console.log(nowShowingMovies);
    res.status(200).json({
      nowShowing: nowShowingMovies,
      upcoming: commingSoonMOvies,
      nextRelease: nextReleaseMovies,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const nowShowingMovies = async (req, res) => {
  let connection;
  try {
    connection = await db.promise().getConnection();
    const limit = 4;
    const nowShowingSql = `
  SELECT m.*, c.type as category_type
  FROM movies m
  JOIN category c ON m.category_id = c.id
  WHERE c.type = 'nowshowing'
  ORDER BY m.releasing_on DESC
  LIMIT ${limit};
`;
    const [nowShowingMovies] = await connection.execute(nowShowingSql);
    console.log(nowShowingMovies);
    res.status(200).json({
      nowShowing: nowShowingMovies,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const nextReleaseMovies = async (req, res) => {
  let connection;
  try {
    connection = await db.promise().getConnection();

    const limit = 4; // Set the limit of data to be sent

    const nextreleaseSql = `
    SELECT m.*, c.type as category_type
    FROM movies m
    JOIN category c ON m.category_id = c.id
    WHERE c.type = 'nextrelease'
    ORDER BY m.releasing_on DESC
    LIMIT ${limit};
    `;

    const [nextReleaseMovies] = await connection.execute(nextreleaseSql);

    console.log(nowShowingMovies);
    res.status(200).json({
      nextrealese: nextReleaseMovies,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};



export const commingSoonMovies = async (req, res) => {
  let connection;
  try {
    connection = await db.promise().getConnection();

    const limit = 6; // Set the limit of data to be sent

    const commingsoonSql = `
    SELECT m.*, c.type as category_type
    FROM movies m
    JOIN category c ON m.category_id = c.id
    WHERE c.type = 'commingsoon'
    ORDER BY m.releasing_on DESC
    LIMIT ${limit};
    `;

    const [commingSoonMovies] = await connection.execute(commingsoonSql);

    res.status(200).json({
      commingsoon: commingSoonMovies,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};


export const getMovieBySlug = async (req, res) => {
  let connection;
  try {
    connection = await db.promise().getConnection();

    const { slug } = req.params; 
    console.log(slug);


    const movieBySlugSql = `
      SELECT m.*, c.type as category_type
      FROM movies m
      JOIN category c ON m.category_id = c.id
      WHERE m.slug = ?
    `;

    const [movieBySlug] = await connection.execute(movieBySlugSql, [slug]);
    console.log(movieBySlug);

    if (movieBySlug.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({
      movie: movieBySlug[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};


export const bookSeat = async (req, res) => {
  let connection;

  try {
    connection = await db.promise().getConnection();

    const { seat, total_cost } = req.body;
    const {  slug, user_id, } = req.params;

    console.log(seat, total_cost, slug, user_id);

    // Get the movie_id using the provided slug
    const getmovieId = 'SELECT id FROM movies WHERE slug = ?';
    const [movieid] = await connection.execute(getmovieId, [slug]);
    const movie_id = movieid[0].id;

    // fetch booked date
    const bookingDateTime = new Date();
    const year = bookingDateTime.getFullYear();
    const month = String(bookingDateTime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(bookingDateTime.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Insert into booking_details table
    const insertBookingQuery = `
      INSERT INTO booking_details (user_id, movie_id, seat, total_cost, bookingDateTime)
      VALUES (?, ?, ?, ?, ?)
    `;
    const insertBookingParams = [user_id, movie_id, JSON.stringify(seat), total_cost, formattedDate];

    await connection.execute(insertBookingQuery, insertBookingParams);

    res.status(200).json({ message: 'Booking successful' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (connection) {
      connection.release(); // Release connection back to pool
    }
  }
};


export const getBookedSeats = async (req, res) => {
  let connection;

  try {
    connection = await db.promise().getConnection();

    const { slug, user_id } = req.params;

    // Get the movie_id using the provided slug
    const getmovieId = 'SELECT id FROM movies WHERE slug = ?';
    const [movieid] = await connection.execute(getmovieId, [slug]);
    const movie_id = movieid[0].id;

    // Fetch booked seats for the given movie and user
    const getBookedSeatsQuery = 'SELECT seat FROM booking_details WHERE movie_id = ? ';
    const [rows] = await connection.execute(getBookedSeatsQuery, [movie_id]);

    // Parse JSON strings to JavaScript arrays
    const bookedSeats = rows.map((row) => JSON.parse(row.seat));


    res.status(200).json({ bookedSeats });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (connection) {
      connection.release(); // Release connection back to pool
    }
  }
};





