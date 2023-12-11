import joi from "joi"
import path from "path"

const postSchema = joi.object({
    movie_name: joi.string().required().trim(),
    movie_description: joi.string().required().trim(),
    category_id: joi.number().integer().required(),
    // showtime_id: joi.number().integer().required(),
    embedded_links: joi.string().required().trim(),
    // cover_image: joi.string()
    //     .required()
    //     .custom((value, context) => {
    //         const ext = path.extname(value); // Get the file extension
    //         if (!ext.match(/\.(jpg|jpeg|png)$/i)) {
    //             throw new joi.ValidationError(
    //                 "Invalid image format. Only .jpg, .jpeg, and .png are allowed."
    //             );
    //         }
    //         return value;
    //     }),
    movie_length: joi.number().integer().required(),
    releasing_on: joi.string().required(),
});


  
  const validatePostData = (data) => {
    const { error, value } = postSchema.validate(data, { abortEarly: false });
  
    if (error) {
      console.log(error.details[0].message);
      return res.statu(401).send({ error: error.details[0].message });
      // throw new Error(error.details[0].message); 
    }
    return value; 
  };
  
  export default validatePostData;



