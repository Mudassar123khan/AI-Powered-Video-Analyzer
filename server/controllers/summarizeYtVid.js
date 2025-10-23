const { fetchYTCaption } = require("../services/fetchYTCaption");
const { summarizeTranscript } = require('../services/googleGeminiService');

const summarizeYtVid = async (req, res) => {
    const videoLink = req.body.videoLink;

    const ytVidTranscript = await fetchYTCaption(videoLink);

    const summary = await summarizeTranscript(ytVidTranscript);

    res.status(200).send(summary);
};

module.exports = { summarizeYtVid };