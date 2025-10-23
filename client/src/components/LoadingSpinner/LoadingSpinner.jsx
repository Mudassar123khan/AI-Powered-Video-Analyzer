import React, { useContext, useEffect } from 'react';
import './LoadingSpinner.css';
import GlobalStore from '../../contexts/GlobalStore/GlobalStore';
import { useNavigate } from 'react-router-dom';

const LoadingSpinner = () => {

  const globalStore = useContext(GlobalStore);
  const { fileInput, linkInput } = globalStore;

  const navigate = useNavigate();

  useEffect(() => {
    if (!fileInput && !linkInput) {
      navigate("/");
    }
  }, [])

  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Summarizing your video, please wait...</p>
    </div>
  );
};

export default LoadingSpinner;
