import {
  AiFillEdit,
  AiFillStar,
  AiOutlineCheck,
  AiFillDelete,AiOutlineClose,AiOutlineCalendar
} from "react-icons/ai";
import classes from './toDo.module.css'
interface ToDo {
  id: number;
  title: string;
  description: string;
  isImportant: boolean;
  isCompleted: boolean;
  date: Date | null
}
interface ToDoProps{
    todo:ToDo;
    statusHandler:(id: number) => void;
    addToDoHandler:(todo?:ToDo) => void;
    deleteHandler: (id:number) => void;
    importantHandler: (id:number) => void;
}
function ToDo({todo, statusHandler,addToDoHandler,deleteHandler, importantHandler}:ToDoProps){
    return <li key={todo.id}  className={classes.todo}>
    <h4 className={todo.isCompleted ? classes.completed : ''}>{todo.title}</h4>
    <p className={todo.isCompleted ? classes.completed : ''}>{todo.description}</p>
    {todo.date ? <p><AiOutlineCalendar/>{new Date(todo.date).toLocaleDateString('en-GB')}</p> : <p>No date</p>}
    <hr className={classes.hr} />
  <div className={classes.controls}>
  <button onClick={() => statusHandler(todo.id)}>
    {todo.isCompleted ? <div className={classes.completion}><AiOutlineCheck /></div> : <div className={classes.completion}><AiOutlineClose/></div>}
  </button>
  <button onClick={() =>{addToDoHandler(todo)}}>
    <AiFillEdit />
  </button>
  <button onClick={() => deleteHandler(todo.id)}>
    <AiFillDelete />
  </button>
  <button
    onClick={() => {
      importantHandler(todo.id);
    }}
    className={
      todo.isImportant ? classes.important : classes.notImportant
    }
  >
    <AiFillStar />
  </button>
  </div>
</li>
}
export default ToDo;