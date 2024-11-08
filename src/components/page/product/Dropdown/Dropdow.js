import { useState } from "react";
import "./Dropdown.scss";
function Dropdown({ title, menu = [] }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="dropdown"
      onBlur={() => {
        setShow(false);
      }}
      onClick={() => {
        setShow(!show);
      }}
    >
      <button
        className={
          show
            ? "btn btn-secondary dropdown-toggle show"
            : "btn btn-secondary dropdown-toggle"
        }
        type="button"
        data-bs-toggle="dropdown"
      >
        {title}
      </button>
      <ul
        className={show ? "dropdown-menu show" : "dropdown-menu"}
        aria-labelledby="dropdownMenuButton1"
      >
        {menu.map((item, index) => {
          return (
            <li key={index}>
              <a className="dropdown-item" href="/">
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dropdown;
