const { Configuration, OpenAIApi } = require('openai');


const Generation = require('../helper/Generation');


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;

  try {

    let generate = await Generation.generate(prompt, size);

    for(let i =0; i<= 3; i++){
      let generate = await Generation.generate(prompt, size);
    }

    res.status(200).json({
      success: true,
      data: generate,
    });
  
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};

module.exports = { generateImage };
