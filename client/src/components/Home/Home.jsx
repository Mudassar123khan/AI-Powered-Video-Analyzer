import "./Home.css"
import React, { useContext, useEffect } from "react";
import GlobalStore from "../../contexts/GlobalStore/GlobalStore";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const globalStore = useContext(GlobalStore);
  const { fileInput, setFileInput, linkInput, setLinkInput, summarizeLocalVid, summarizeYtVid, setResObj } = globalStore;

  const navigate = useNavigate();

  useEffect(() => {
    setResObj(null); //To empty resObj when user jump from summary page to home page(so that he cant return to the same summary again)

    // To avoid returning back to loading component or summary component after jumping to the home (using input values in SummaryPage.jsx and LoadingSpinner.jsx to achieve this.)
    setFileInput(null);
    setLinkInput("");
  }, [])

  const handleFileUpload = (event) => {
    setFileInput(event.target.files[0])
  }

  const handleLinkUpload = (event) => {
    setLinkInput(event.target.value);
  }

  const handleClick = async () => {
    if (!fileInput && !linkInput) {
      alert("Provide valid input!");
      return;
    }

    if (fileInput) {
      summarizeLocalVid() //summarize local video using AssemblyAI
    } else if (linkInput) {
      summarizeYtVid(); //summarize YT video using captions
    }

    navigate("/summary");
  }

  return (
    <>
      <div className="container">
        <div className="template-container">
          <div className="heading-container">
            <h1>AI-Powered Video Analyzer</h1>
          </div>
          <div className="input-container">
            <div className="link-input-container">
              <p>Have a YouTube video link? Paste it below</p>
              <input className="video-link-input" type="text" name="input-link" value={linkInput} onChange={handleLinkUpload} disabled={fileInput ? true : false} />
            </div>
            <h4>Or</h4>
            <div className="video-input-container">
              <p>Have a local file? Select it below</p>
              <input className="video-file-input" type="file" accept="video/*" name="input-video" onChange={handleFileUpload} disabled={linkInput ? true : false} />
            </div>
          </div>
          <div className="btn-container">
            <button className="summarize-btn" onClick={handleClick} disabled={linkInput || fileInput ? false : true}>Summarize</button>
          </div>
        </div>
      </div>
    </>
  );


}
