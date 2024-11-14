import React from "react";

const SelectionControls = ({
  selectedCount,
  handleDelete,
  handleCSVExport,
}) => (
  <div className="selection-controls">
    <span>{selectedCount} selected</span>
    <button onClick={handleDelete} disabled={selectedCount === 0}>
      Delete
    </button>
    <button onClick={handleCSVExport}>Export as CSV</button>
  </div>
);

export default SelectionControls;
