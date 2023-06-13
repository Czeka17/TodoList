import {AiOutlineUnorderedList,AiOutlineTable,} from "react-icons/ai";
import classes from './toDoActions.module.css'
interface ToDoActionsProps{
altListHandler: () => void
normalListHandler: () => void
altList: boolean;
filterAllTodos: () => void
filterByCompletionHandler: () => void;
filterByImportanceHandler: () => void;
}
function ToDoActions({altListHandler, normalListHandler,altList,filterAllTodos,filterByCompletionHandler,filterByImportanceHandler}:ToDoActionsProps){
return <div className={classes.actions}>
<div className={classes.listActions}>
<button onClick={altListHandler} className={`${altList ? classes.activeAction : classes.notActiveAction}`}><AiOutlineUnorderedList/></button>
<button onClick={normalListHandler} className={`${altList ? classes.notActiveAction : classes.activeAction}`}><AiOutlineTable/></button>
</div>
  <select className={classes.selectFilter}
    onChange={(e) => {
      const selectedValue = e.target.value;
      if (selectedValue === "importance") {
        filterByImportanceHandler()
      } else if (selectedValue === "completion") {
        filterByCompletionHandler()
      } else {
        filterAllTodos()
      }
    }}
  >
    <option value="">All</option>
    <option value="importance">Important</option>
    <option value="completion">Completed</option>
  </select>
</div>
}
export default ToDoActions;