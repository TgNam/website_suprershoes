import React, { useState, useEffect, useRef } from "react";
import "./Dropdown.scss";

function Dropdown({ title, menu = [], value, onChange }) {
    const [show, setShow] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShow(false);
        }
    };

    // Add event listener for outside click
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button
                className={`btn btn-secondary dropdown-toggle ${show ? "show" : ""}`}
                type="button"
                onClick={() => setShow(!show)}
            >
                {value || title} {/* Show selected value or fallback to title */}
            </button>
            <ul
                className={`dropdown-menu ${show ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton1"
            >
                {menu.map((item, index) => (
                    <li key={index}>
                        <button
                            className={`dropdown-item ${item === value ? "active" : ""}`} // Highlight selected item
                            onClick={() => {
                                onChange(item); // Notify parent of selection
                                setShow(false); // Close dropdown after selection
                            }}
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dropdown;
