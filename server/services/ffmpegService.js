const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')

async function extractAudio(videoData) {
    const inputFilePath = 'uploads/vid.mp4';
    const outputFilePath = 'uploads/aud.mp3';

    try {
        // Write video data to the input file
        fs.writeFileSync(inputFilePath, videoData);

        // Execute ffmpeg to extract audio
        await new Promise((resolve, reject) => {
            ffmpeg(inputFilePath)
                .noVideo()
                .audioCodec('libmp3lame')
                .audioQuality(4)
                .on('end', () => {
                    console.log("Audio extraction complete");
                    resolve();
                })
                .on('error', (err) => {
                    console.error("Error during audio extraction:", err);
                    reject(err);
                })
                .save(outputFilePath);
        });

        // Read the extracted audio file
        const audioData = fs.readFileSync(outputFilePath);

        //Delete the saved video and audio file from the server
        fs.unlinkSync(inputFilePath);
        fs.unlinkSync(outputFilePath);

        // Return the audio data
        return audioData;
    } catch (error) {
        console.log("Error in ffmpegService.js: ", error);
        throw error;
    }
}

module.exports = { extractAudio };
