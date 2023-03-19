const { Configuration, OpenAIApi } = require('openai');

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp');
const puppeteer = require('puppeteer');


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

class Generation{


    

    async generate(prompt, size){

        console.log("gerar")

        const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: imageSize,
          });
        
          const imageUrl = response.data.data[0].url;
        
          const imageResponse = await axios({
            url: imageUrl,
            responseType: 'arraybuffer',
          });
        
          let date = new Date();
          const fileName = date.getDate().toString() +'_'+date.getTime().toString() + '_generated.jpeg';
          const imagePath = path.join(__dirname, 'images', fileName);
        
          const image = sharp(imageResponse.data)
            .resize({ width: 2272, height: 1760 })
            .jpeg({ quality: 80 });
        
          // save the resized image to disk
          image.pipe(fs.createWriteStream(imagePath)).on('finish', () => {
            console.log('Image saved successfully!');
          }).on('error', (err) => {
            console.error(err);
          });
      


        return imageUrl;
    }




}

module.exports = new Generation();