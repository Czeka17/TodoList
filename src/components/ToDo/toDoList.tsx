import { useState } from "react";
import {AiOutlineSearch
} from "react-icons/ai";
import classes from "./toDoList.module.css";
import NewToDo from "./newToDo";
import ToDos from "./toDo";
import ToDoActions from "./toDoActions";

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
  formattedDate: string
}


function TodoList({
  todos,
  createTodo,
  updateTodo,
  deleteTodo, formattedDate
}: TodoListProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ToDo | null>()
  const [filterByImportance, setFilterByImportance] = useState(false);
  const [filterByCompletion, setFilterByCompletion] = useState(false);
  const [altList, setAltList] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");

  

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
  function filterByImportanceHandler(){
    setFilterByCompletion(false)
    setFilterByImportance(true)
  }
  function filterByCompletionHandler(){
    setFilterByImportance(false);
    setFilterByCompletion(true);
  }
  function filterAllTodos(){
    setFilterByImportance(false);
        setFilterByCompletion(false);
  }

  function filterTodos() {
    let filteredTodos = todos;

    if (filterByImportance) {
      filteredTodos = filteredTodos.filter((todo) => todo.isImportant);
    }
  
    if (filterByCompletion) {
      filteredTodos = filteredTodos.filter((todo) => todo.isCompleted);
    }
  
    if (searchQuery.trim() !== "") {
      const searchQueryLowerCase = searchQuery.toLowerCase();
      filteredTodos = filteredTodos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQueryLowerCase)
      );
    }
  
    return filteredTodos;
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
  function handleSearchQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      setFilterByImportance(false);
      setFilterByCompletion(false);
      
    }
  }
  
  return (
    <section className={classes.todoContainer}>
      <div className={classes.menuContainer}>
      <div className={classes.search}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      /><AiOutlineSearch/>
      </div>
      <div className={classes.date}>
      <p>{formattedDate}</p>
      <button className={classes.newTodo} onClick={() => addToDoHandler()}>Add todo</button>
      </div>
      </div>
      <ToDoActions altListHandler={altListHandler} normalListHandler={normalListHandler} altList={altList} filterAllTodos={filterAllTodos} filterByCompletionHandler={filterByCompletionHandler} filterByImportanceHandler={filterByImportanceHandler} />
      <ul className={`${classes.todoList} ${altList ? classes.todoListAlternative : ''}`} >
        {filterTodos().map((todo) => (
          <ToDos todo={todo} statusHandler={statusHandler} addToDoHandler={addToDoHandler} deleteHandler={deleteHandler} importantHandler={importantHandler} />
        ))}
        <li className={`${classes.createTodo} ${altList ? classes.todoListAlternative : ''}`}>
          <button onClick={() => addToDoHandler()}>Add todo</button>
        </li>
      </ul>
      {showModal && <NewToDo createTodo={createTodo} onHideModal={hideModal} editTodo={editTodo} todo={selectedTodo} />}
    </section>
  );
}

export default TodoList;
