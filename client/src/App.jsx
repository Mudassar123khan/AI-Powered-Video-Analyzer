import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SummaryPage from "./components/SummaryPage/SummaryPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/summary" element={<SummaryPage />} />
      </Routes>
    </Router>
  );
}
