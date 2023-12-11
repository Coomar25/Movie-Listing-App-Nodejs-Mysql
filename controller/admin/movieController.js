import { response } from "express";
import createConnection from "../../config/dbConnect.js";
import validatePostData from "../../utils/validateMovies.js";
import joi from "joi";

const db = createConnection();

// proper sanitization ra validation garera slug generate gareko
const generateSlug = (connection, movie_name) => {
  // Sanitize input to prevent potential SQL injection
  const sanitizedMovieName = connection.escape(movie_name);
  let slug = sanitizedMovieName.toLowerCase().replace(/\s+/g, "-").trim("-"); // white space lai hatayra hypohne ma convert gareko
  
  //random string generate gareko aade slug chai chooto vayo vane
  if (slug.length < 3) {
    slug = `${slug}-${Math.random().toString(36).substring(2, 5)}`;
  }

  // Remove invalid characters
  slug = slug.replace(/[^a-z0-9-]+/g, "");
  return slug;
};


// Function to insert movie data into the database
const insertMovie = async (connection, movie, res) => {
  // Destructure movie object for easier access to data
  const {
    movie_name,
    movie_description,
    category_id,
    embedded_links,
    cover_image,
    movie_length,
    releasing_on,
    slug, // yeha chai slug paune garxaam hamle
  } = movie; //yo chai destructuring hamle

  // check gareko aade tei name gareko movie xa ki nai vanera jasma chai slug lai check garne gareko xaaam
  const checkSlugQuery = "SELECT COUNT(*) AS count FROM movies WHERE slug = ?";
  const [slugCheckResults] = await connection.execute(checkSlugQuery, [slug]);
  const slugCount = slugCheckResults[0].count;
  if (slugCount > 0) {
    return res.json({ warning: "Movie with that name already exists" });
  }

  //  parameterized query use gareko SQL injection lai prevent garna ko lagi
  const sql = `
    INSERT INTO movies(movie_name, slug, movie_description, category_id, embedded_links, cover_image, movie_length, releasing_on)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;


  // Execute the insert query with parameterized values
  await connection.execute(sql, [
    movie_name,
    slug,
    movie_description,
    category_id,
    embedded_links,
    cover_image,
    movie_length,
    releasing_on,
  ]);
};




//Yo chai hamro main function hooo movie add garna lai
export const addMovie = async (req, res) => {
  let connection;
  try {
    connection = await db.promise().getConnection(); //yeha chai hamle database connection ko suruwaat gareka xaau
    await connection.beginTransaction();

    // asma chai JOI package use gareka xaam validation ko lagi
    // validatePostData(req.body);

    // Generate the slug outside of the SQL statement
    const slug = generateSlug(connection, req.body.movie_name);
    console.log(slug);

    await insertMovie(
      connection,
      {
        ...req.body, //spread operator use gareko yeha chai slug lai add garna lai
        slug,
      },
      res
    );

    await connection.commit();

    return res.status(200).json({
      message: "Post has been created",
      response: { ...req.body, slug },
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
      connection.release();
    }

    if (error instanceof joi.ValidationError) {
      const validationErrorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return res.status(400).json({ error: validationErrorMessage });
    } else {
      console.error(error.message);
      return res.status(500).send({
        response: "Internal Server Error",
      });
    }
  } finally {
    if (connection) {
      connection.release();
    }
  }
};




// ===========================================================================================================================
// ===========================================================================================================================
// ===========================================================================================================================


const updateMovie = async (connection, movie, res) => {
  // Destructure movie object for easier access to data
  const {
    id,
    movie_name,
    movie_description,
    category_id,
    showtime_id,
    embedded_links,
    cover_image,
    movie_length,
    releasing_on,
  } = movie;



  // Parameterized query to prevent SQL injection
  const sql = `
    UPDATE movies
    SET
      movie_name = ?,
      movie_description = ?,
      category_id = ?,
      showtime_id = ?,
      embedded_links = ?,
      cover_image = ?,
      movie_length = ?,
      releasing_on = ?
    WHERE id = ?
  `;

  try {
    // Execute the update query with parameterized values
    await connection.execute(sql, [
      movie_name,
      movie_description,
      category_id,
      showtime_id,
      embedded_links,
      cover_image,
      movie_length,
      releasing_on,
      id,
    ]);

    res.status(200).json({
      message: "Movie updated successfully",
      response: movie,
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).send({
      response: "Internal Server Error",
    });
  }
};

export const updateMovieHandler = async (req, res) => {
  let connection;
  try {
    connection = await db.promise().getConnection();
    await updateMovie(connection, req.body, res);
  } catch (error) {
    if (connection) {
      connection.release();
    }


  } finally {
    if (connection) {
      connection.release();
    }
  }
};
