import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SummaryPage.css"
import GlobalStore from "../../contexts/GlobalStore/GlobalStore";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function SummaryPage() {

  const globalStore = useContext(GlobalStore);
  const { resObj, fileInput, linkInput } = globalStore;

  const navigate = useNavigate();

  useEffect(() => {
    //Dont allow the user to navigate to the summary page is no input file is selected
    if (!fileInput && !linkInput) {
      navigate("/");
    }
  }, []);

  if (resObj) {
    return (<div className="main-container">
      <div className="keyword-section">
        <div className="heading">
          <h1>Keywords</h1>
        </div>
        <div className="content">
          <ul>
            {resObj.keywords.map((keyword, index) => <li key={keyword}>{index + 1}. {keyword}</li>)}
          </ul>
        </div>
      </div>
      <div className="summary-section">
        <div className="heading">
          <h1>Summary</h1>
        </div>
        <div className="content">
          <p>{resObj.summary}</p>
        </div>
      </div>
    </div>);
  } else {
    return (<LoadingSpinner />);
  }
}
