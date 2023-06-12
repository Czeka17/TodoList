import React, { useState } from "react";
import classes from './filters.module.css'
interface FilterNavProps {
  onFilter: (filter: string) => void;
}

const FilterNav: React.FC<FilterNavProps> = ({ onFilter }) => {
  const [activeFilter, setActiveFilter] = useState("");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilter(filter);
  };

  return (
    <header className={classes.container}>
        <h1>TO-DO LIST</h1>
    <nav>
      <ul className={classes.navList}>
        <li onClick={() => handleFilterClick("important")}>
          <a
            className={activeFilter === "important" ? "active" : ""}
          >
            Show Important
          </a>
        </li>
        <li onClick={() => handleFilterClick("completed")}>
          <a
            className={activeFilter === "completed" ? "active" : ""}
          >
            Show Completed
          </a>
        </li>
        <li onClick={() => handleFilterClick("uncompleted")}>
          <a
            className={activeFilter === "uncompleted" ? "active" : ""}
          >
            Show Uncompleted
          </a>
        </li>
        <li onClick={() => handleFilterClick("")}>
          <a
            className={activeFilter === "" ? "active" : ""}
          >
            Show All
          </a>
        </li>
      </ul>
    </nav>
    </header>
  );
};

export default FilterNav;
