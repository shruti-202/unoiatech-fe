import React from "react";

const CompanyTableRow = ({ company, selected, handleSelect }) => (
  <tr>
    <td>
      <input type="checkbox" checked={selected} onChange={handleSelect} />
    </td>
    <td>
      <img src={company.logo} alt={`${company.name} logo`} width="30" />
      {company.name}
    </td>
    <td>
      <span>Facebook | Twitter | LinkedIn</span>
    </td>
    <td>{company.description}</td>
    <td>{company.address}</td>
    <td>{company.phone}</td>
    <td>{company.email}</td>
  </tr>
);

export default CompanyTableRow;
