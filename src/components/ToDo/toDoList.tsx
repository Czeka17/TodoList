import { useEffect, useState } from "react";
import {
  AiFillEdit,
  AiFillStar,
  AiOutlineCheck,
  AiFillDelete,AiOutlineUnorderedList,AiOutlineTable
} from "react-icons/ai";
import classes from "./toDoList.module.css";
import NewToDo from "./newToDo";

interface ToDo {
  id: number;
  title: string;
  description: string;
  isImportant: boolean;
  isCompleted: boolean;
  date: Date | null
}
interface TodoListProps {
  createTodo: (
    title: string,
    description: string,
    isImportant: boolean,
    isCompleted: boolean,
    date: Date | null
  ) => void;
  updateTodo: (
    updatedTodo: ToDo
  ) => void;
  deleteTodo: (
    id: number
  ) => void;
  todos: ToDo[];
}


function TodoList({
  todos,
  createTodo,
  updateTodo,
  deleteTodo,
}: TodoListProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ToDo | null>()
  const [filterByImportance, setFilterByImportance] = useState(false);
  const [filterByCompletion, setFilterByCompletion] = useState(false);
  const [altList, setAltList] = useState(false)


  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  

  function deleteHandler(id: number) {
    deleteTodo(id);
  }
  function altListHandler(){
    setAltList(true)
  }
  function normalListHandler(){
    setAltList(false)
  }


  function importantHandler(id: number) {
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (updatedTodo) {
      updatedTodo.isImportant = !updatedTodo.isImportant;
      updateTodo(updatedTodo);
    }
  }
  
  function statusHandler(id: number) {
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (updatedTodo) {
      updatedTodo.isCompleted = !updatedTodo.isCompleted;
      updateTodo(updatedTodo);
    }
  }

  function filterTodos() {
    if (filterByImportance && filterByCompletion) {
      return todos.filter((todo) => todo.isImportant && todo.isCompleted);
    } else if (filterByImportance) {
      return todos.filter((todo) => todo.isImportant);
    } else if (filterByCompletion) {
      return todos.filter((todo) => todo.isCompleted);
    } else {
      return todos;
    }
  }

  function addToDoHandler(todo?: ToDo){
    setSelectedTodo(todo || null);
    setShowModal(true)
  }
  function hideModal(){
    setShowModal(false)
  }

  const editTodo = (
    id: number,
    title: string,
    description: string,
    isImportant: boolean,
    isCompleted: boolean,
    date: Date | null
  ) => {
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (updatedTodo) {
      updatedTodo.title = title;
      updatedTodo.description = description;
      updatedTodo.isImportant = isImportant;
      updatedTodo.isCompleted = isCompleted;
      updatedTodo.date = date;
      updateTodo(updatedTodo);
      setSelectedTodo(null);
    }
  };
  
  return (
    <section className={classes.todoContainer}>
      <button className={classes.newTodo} onClick={() => addToDoHandler()}>Add todo</button>
      <div className={classes.actions}>
      <div className={classes.listActions}>
      <button onClick={altListHandler} className={`${altList ? classes.activeAction : classes.notActiveAction}`}><AiOutlineUnorderedList/></button>
      <button onClick={normalListHandler} className={`${altList ? classes.notActiveAction : classes.activeAction}`}><AiOutlineTable/></button>
      </div>
        <select className={classes.selectFilter}
          onChange={(e) => {
            const selectedValue = e.target.value;
            if (selectedValue === "importance") {
              setFilterByImportance(true);
              setFilterByCompletion(false);
            } else if (selectedValue === "completion") {
              setFilterByImportance(false);
              setFilterByCompletion(true);
            } else {
              setFilterByImportance(false);
              setFilterByCompletion(false);
            }
          }}
        >
          <option value="">All</option>
          <option value="importance">Important</option>
          <option value="completion">Completed</option>
        </select>
      </div>
      <ul className={classes.todoList}>
        {filterTodos().map((todo) => (
          <li key={todo.id}  className={`${classes.todo} ${altList ? classes.todoListAlternative : ''}`}>
              <h4>{todo.title}</h4>
              <p>{todo.description}</p>
              {todo.date ? <p>{new Date(todo.date).toLocaleDateString('en-GB')}</p> : <p>No date</p>}
            <div className={classes.controls}>
            <button onClick={() => statusHandler(todo.id)}>
              {todo.isCompleted ? <AiOutlineCheck /> : "no"}
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
        ))}
      </ul>
      <p>All todos: {todos.length}</p>
      {showModal && <NewToDo createTodo={createTodo} onHideModal={hideModal} editTodo={editTodo} todo={selectedTodo} />}
      {/* {showModal && <ToDoModal todo={selectedTodo} />} */}
    </section>
  );
}

export default TodoList;
