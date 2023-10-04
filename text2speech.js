const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: "./cheftalk-401015-2df6c845f5cf.json",
});

// function to synthesize speech
async function synthesizeSpeech(text) {
  const request = {
    input: { text },
    voice: {
      languageCode: "en-US",
      name: "en-US-Wavenet-D",
      ssmlGender: "NEUTRAL",
    },
    audioConfig: { audioEncoding: "MP3" },
  };
  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("output.mp3", response.audioContent, "binary");
  console.log("Audio content written to file: output.mp3");
}
