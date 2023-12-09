import createConnection from "../../config/dbConnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const db = createConnection();


export const adminloginUser = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.send({warning: "Please provide email and password"});
    }
    const sqlSelect = "SELECT * FROM admin WHERE email = ?";
    try {
        // prepared statement use gareko sql injection lai rokna ko lagi
        const [rows] = await db.promise().execute(sqlSelect, [email]);

        if (rows.length === 0) {
          return res.send({warning: "Invalid email! Please check your email"});
        }

        const hashedPasswordFromDB = rows[0].password;

        const isPasswordValid = (password === hashedPasswordFromDB);

        if (!isPasswordValid) {
          console.log("Invalid email! Please check your email");
          return res.send({ warning: "Invalid password!" });
        }

        const userId = rows[0].id;
        const { id, username } = rows[0];
        const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '900s'});

        return res.cookie('token', token, {httpOnly:true, maxAge:90000}).status(200).json({
            success: "Login successful",
            token: token,
            user: {
              id,
              username,
              email,
            }
        });


    } catch (error) {
        return res.status(401).send({
            error: error.message || "An error occurred while logging in the user.",
        });
    }
};