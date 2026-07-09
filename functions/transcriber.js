const speech = require('@google-cloud/speech');
const speechClient = new speech.SpeechClient();

async function transcribeAudio(filePath,lang){
    const gcsUri = 'gs://app-mobile-translation-chat.appspot.com' + filePath

  const languageCode = lang
  const config = {
    languageCode: languageCode,
  };

  const audio = {
    uri: gcsUri
  }

  const request = {
    config: config,
    audio: audio,
  };

  // Detects speech in the audio file
  const [response] = await speechClient.recognize(request).catch(error => {
    console.error(error)
      throw Error('error transcribing', 'could NOT transcribe this voice message.');

  });
  // console.log("got response ",response)
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
    return transcription
}



// (async () => {
//     try {
//         const result = await transcribeAudio("/voice/0c6e4cb2-81fe-4047-9d99-d574ace70d79.wav", "fr")
        
//         console.log(result);
//     } catch (e) {
//         console.error("error ", e)
//         // Deal with the fact the chain failed
//     }
//     // `text` is not available here
// })();

module.exports.transcribeAudio = transcribeAudio