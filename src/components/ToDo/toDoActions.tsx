import {AiOutlineUnorderedList,AiOutlineTable} from "react-icons/ai";
import classes from './toDoActions.module.css'
interface ToDoActionsProps{
altListHandler: () => void
normalListHandler: () => void
altList: boolean;
}
function ToDoActions({altListHandler, normalListHandler,altList}:ToDoActionsProps){
return <div className={classes.actions}>
<div className={classes.listActions}>
<button data-testid="alt-list" onClick={altListHandler} className={`${altList ? classes.activeAction : classes.notActiveAction}`}><AiOutlineUnorderedList/></button>
<button data-testid="normal-list" onClick={normalListHandler} className={`${altList ? classes.notActiveAction : classes.activeAction}`}><AiOutlineTable/></button>
</div>
</div>
}
export default ToDoActions;