import React from "react";
import { FaSearch } from "react-icons/fa";
import "./UrlInput.css";

const UrlInput = ({ url, setUrl, fetchCompanies }) => (
  <div className="search-bar-container">
    <div className="input-container">
      <FaSearch className="input-icon" />
      <input
        type="text"
        placeholder="Enter domain name"
        className="search-input"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </div>
    <button className="fetch-button" onClick={fetchCompanies}>
      Fetch & Save Details
    </button>
  </div>
);

export default UrlInput;
