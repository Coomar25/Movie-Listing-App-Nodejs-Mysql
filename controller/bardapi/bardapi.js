import { GoogleGenerativeAI } from "@google/generative-ai";
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.BARDAPI;

export const bardAPI = async (req, res) => {
  console.log("Function has been hit");
  const { questions } = req.params;
  // console.log(questions);
  // return res.json(questions);
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(questions);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return res.json({
      response: text,
      outcomes: "Success fully send messages budddy",
    });
  } catch (error) {
    console.log(error);
  }
};
