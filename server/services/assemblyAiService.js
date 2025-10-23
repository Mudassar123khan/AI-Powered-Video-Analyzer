const axios = require('axios');

const audioToTranscript = async (audioData) => {
    //setting up API endpoint and headers
    const baseUrl = process.env.ASSEMBLYAI_BASE_URL;
    const assemblyaiApiKey = process.env.ASSEMBLYAI_API_KEY;

    const headers = {
        authorization: assemblyaiApiKey
    }


    //Upload audio data and get upload id in response.
    const uploadResponse = await axios.post(`${baseUrl}/upload`, audioData, {
        headers
    })
    const uploadUrl = uploadResponse.data.upload_url;


    //Create JSON payload using the provided upload id.
    const data = {
        audio_url: uploadUrl
    }


    //Request for transcript by sending the payload and get a transcript id in response.
    const url = `${baseUrl}/transcript`;
    const response = await axios.post(url, data, { headers: headers });


    //Keep hitting the polling endpoint with the provided transcript id until the status becomes "complete", and then retrieve it.
    const transcriptId = response.data.id
    const pollingEndpoint = `${baseUrl}/transcript/${transcriptId}`

    while (true) {
        const pollingResponse = await axios.get(pollingEndpoint, {
            headers: headers
        })
        const transcriptionResult = pollingResponse.data;

        if (transcriptionResult.status === 'completed') {
            // console.log(transcriptionResult.text);
            const transcriptedText = transcriptionResult.text;
            return transcriptedText;
        } else if (transcriptionResult.status === 'error') {
            throw new Error(`Transcription failed: ${transcriptionResult.error}`);
        } else {
            await new Promise((resolve) => setTimeout(resolve, 2000)); //checking after every 2 seconds for the completion status.
        }
    }
}

module.exports = { audioToTranscript };