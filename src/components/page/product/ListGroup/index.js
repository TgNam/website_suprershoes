import React, { useState } from "react";
import "./ListGroup.scss";

function ListGroup({ items = [], title, onSelectionChange }) {
  const [selectedItem, setSelectedItem] = useState(null); // Chỉ lưu một mục được chọn

  const handleItemClick = (item) => {
    const updatedSelectedItem = selectedItem === item ? null : item; // Bỏ chọn nếu mục đã được chọn
    setSelectedItem(updatedSelectedItem);

    if (onSelectionChange) {
      onSelectionChange(updatedSelectedItem); // Gửi mục được chọn lên parent
    }
  };

  return (
    <div className="list-group-container">
      <div className="list-group-header">
        {title && <h3 className="list-group-title">{title}</h3>}
      </div>
      <div className="m-3">
        {items.map((item, index) => (
          <button
            key={index}
            className={`btn btn-select m-1 ${
              selectedItem === item ? "selected" : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ListGroup;
