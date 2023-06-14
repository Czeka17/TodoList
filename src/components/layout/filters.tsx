import React, { useState } from "react";
import classes from './filters.module.css'
interface FilterNavProps {
  onFilter: (filter: string) => void;
  showMenu: boolean;
  hideMenuHandler: () => void;
}

const FilterNav: React.FC<FilterNavProps> = ({ onFilter, showMenu,hideMenuHandler }) => {
  const [activeFilter, setActiveFilter] = useState("");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilter(filter);
    hideMenuHandler(); 
  };

  return (
    <header className={`${classes.container} ${showMenu ? classes.showMenu : ''}`}>
        <h1>TO-DO LIST</h1>
    <nav>
      <ul className={classes.navList}>

        <li onClick={() => handleFilterClick("today")} className={activeFilter === "today" ? classes.active : ""}>
          <a>
            Today's
          </a>
        </li>
        <li data-testid="todo-filter" onClick={() => handleFilterClick("important")} className={activeFilter === "important" ? classes.active : ""}>
          <a>
            Important
          </a>
        </li>
        <li onClick={() => handleFilterClick("completed")} className={activeFilter === "completed" ? classes.active : ""}>
          <a>
            Completed
          </a>
        </li>
        <li onClick={() => handleFilterClick("uncompleted")} className={activeFilter === "uncompleted" ? classes.active : ""}>
          <a>
            Uncompleted
          </a>
        </li>
        <li onClick={() => handleFilterClick("")} className={activeFilter === "" ? classes.active : ""}>
          <a>
            All
          </a>
        </li>
      </ul>
    </nav>
    </header>
  );
};

export default FilterNav;
