import React from "react";
import CompanyTableHeader from "../CompanyHeader/CompanyHeader";
import CompanyTableRow from "../CompanyTableRow/CompanyTableRow";

const CompanyTable = ({ companies, selectedIds, setSelectedIds }) => {
  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <table className="company-table">
      <CompanyTableHeader />
      <tbody>
        {companies.map((company) => (
          <CompanyTableRow
            key={company._id}
            company={company}
            selected={selectedIds.includes(company._id)}
            handleSelect={() => handleSelect(company._id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CompanyTable;
