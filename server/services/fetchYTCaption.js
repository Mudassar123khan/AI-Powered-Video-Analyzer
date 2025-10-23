const { YoutubeTranscript } = require("youtube-transcript");

const fetchYTCaption = async (videoLink) => {
    try {
        const response = await YoutubeTranscript.fetchTranscript(videoLink);

        let transcript = "";

        for (let i = 0; i < response.length; i++) {
            transcript = transcript + " " + response[i].text;
        }

        transcript = transcript.replace(/&amp;#39;/g, "'"); //fixing apostrophe(') problem using regular expression
        return transcript;
    } catch (error) {
        console.log("Error in fetchYTCaption.js ", error);
        throw error;
    }
};

module.exports = { fetchYTCaption };