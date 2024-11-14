import React, { useState, useEffect } from "react";
import SelectionControls from "./components/SelectionControl/SelectionControls";
import CompanyTable from "./components/CompanyTable/CompanyTable";
import Pagination from "./components/Pagination/Pagination";
import UrlInput from "./components/UrlInput/UrlInput";
import "./App.css";

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [url, setUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 5;

  const fetchCompanies = async () => {
    if (!url) {
      alert("Please enter a URL.");
      return;
    }

    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = `http://${url}`;
    }

    try {
      const response = await fetch("http://localhost:5000/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: formattedUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setCompanies((prevCompanies) => [...prevCompanies, data]);
      } else {
        const errorText = await response.text();
        alert(`Failed to fetch data: ${errorText}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(`An error occurred`);
    }
  };

  const loadCompanies = async () => {
    const response = await fetch("/api/companies");
    const data = await response.json();
    setCompanies(data);
  };

  const handleDelete = async () => {
    await fetch("/api/companies", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedIds }),
    });
    setCompanies(
      companies.filter((company) => !selectedIds.includes(company._id))
    );
    setSelectedIds([]);
  };

  const handleCSVExport = () => {
    const headers =
      "Name,Description,Logo,Facebook,LinkedIn,Twitter,Instagram,Address,Phone,Email\n";
    const rows = companies
      .map(
        (c) =>
          `${c.name},${c.description},${c.logo},${c.facebookUrl},${c.linkedinUrl},${c.twitterUrl},${c.instagramUrl},${c.address},${c.phone},${c.email}`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "companies.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const paginatedCompanies = companies.slice(
    (currentPage - 1) * companiesPerPage,
    currentPage * companiesPerPage
  );

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <div>
      <UrlInput url={url} setUrl={setUrl} fetchCompanies={fetchCompanies} />
      <SelectionControls
        selectedCount={selectedIds.length}
        handleDelete={handleDelete}
        handleCSVExport={handleCSVExport}
      />
      <CompanyTable
        companies={paginatedCompanies}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
      <Pagination
        totalCompanies={companies.length}
        companiesPerPage={companiesPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
