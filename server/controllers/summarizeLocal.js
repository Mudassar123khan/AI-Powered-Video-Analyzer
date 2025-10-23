const { extractAudio } = require('../services/ffmpegService');
const { audioToTranscript } = require('../services/assemblyAiService');
// const { summarizeTranscript } = require('../services/googleGeminiService');
import { summarizeTranscript } from "../services/googleGeminiService.js";


const summarizeLocal = async (req, res) => {
    try {
        if (!req.files || !req.files.input) {
            return res.status(400).send("No files were uploaded.");
        }

        const videoData = req.files.input.data;

        const audioData = await extractAudio(videoData);

        // const transcriptedText = await audioToTranscript(audioData);
        // console.log("Transcription: ", transcriptedText);

        const transcriptedText = "Vue J's it's a JavaScript framework for building front end UIS. In Vue you can start simple and then progressively add in the tools and features that you need to build a complex web application. At its core, it provides a way to build components that encapsulate data or state in your JavaScript and then connect that state reactively to a template. In HTML we call these components declarative views because the same data inputs will always produce the same output in the visual UI. When we declare data on this data object, it links or binds it to the HTML on the template above. When the value of the data changes, the component will automatically re render or in other words its reactive and the framework does a ton of work under the hood. To make sure that this process is performant across a huge component tree, we can work with this data in the template thanks to views HTML based template syntax we can interpolate a value or expression using double braces and we also have a variety of directives to control the behavior of the HTML based on the data. We can use v if to only render an element when the value on the right side is truthy and then we might have a fallback element."

        const summary = await summarizeTranscript(transcriptedText);

        res.status(200).send(summary);

    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send("An unexpected error occurred");
    }
};
module.exports = { summarizeLocal };