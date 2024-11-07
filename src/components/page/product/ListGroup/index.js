import "./ListGroup.scss";
function ListGroup({ items, title }) {
  return (
    <ul className="list-group">
      <h3>{title}</h3>
      {items.length &&
        items.map((item, index) => {
          return (
            <li key={index} className="list-group-item" aria-current="true">
              {item}
            </li>
          );
        })}
    </ul>
  );
}

export default ListGroup;
