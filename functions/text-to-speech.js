const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const client = new textToSpeech.TextToSpeechClient();


async function convertTextToSpeech(text,lang,filePath,gender){
    const request = {
        input: {text: text},
        voice: { languageCode: lang, ssmlGender: gender },
        audioConfig: {audioEncoding: 'MP3'},
      };
      const [response] = await client.synthesizeSpeech(request);
      const writeFile = util.promisify(fs.writeFile);
      await writeFile(filePath, response.audioContent, 'binary');
      console.log(`Audio content written to file: ${filePath}`);
}





module.exports.convertTextToSpeech = convertTextToSpeech