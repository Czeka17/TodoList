import { useState } from "react";
import {AiOutlineSearch,AiOutlineStock} from "react-icons/ai";
import classes from "./toDoList.module.css";
import NewToDo from "./newToDo";
import ToDos from "./toDo";
import ToDoActions from "./toDoActions";
import Hamburger from "hamburger-react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';


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
  showMetricsHandler:() => void
  hamburgerToggled: boolean
  hambugerToggledHandler:() => void
  hamburgerToggleHandler:(toggle:boolean) => void
}


function TodoList({
  todos,
  createTodo,
  updateTodo,
  deleteTodo, formattedDate,showMetricsHandler,hamburgerToggled,hambugerToggledHandler,hamburgerToggleHandler
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
  function altListHandler() {
    setTimeout(() => {
      setAltList(true);
    }, 0);
  }
  
  function normalListHandler() {
    setTimeout(() => {
      setAltList(false);
    }, 0);
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
       <div className={classes.burger}>
       <Hamburger toggled={hamburgerToggled} toggle={hambugerToggledHandler} onToggle={hamburgerToggleHandler} />
       </div>
      <div>
        <span className={classes.appName}>Todo List</span>
      <p>{formattedDate}</p>
      </div>
      <button className={classes.newTodo} onClick={() => addToDoHandler()}>Add todo</button>
      <button onClick={showMetricsHandler} className={classes.metrics}><AiOutlineStock/></button>
      </div>
      <button className={classes.newTodoMobile} onClick={() => addToDoHandler()}>Add todo</button>
      </div>
      <ToDoActions altListHandler={altListHandler} normalListHandler={normalListHandler} altList={altList} />
      <ul className={`${classes.todoList} ${altList ? classes.todoListAlternative : ''}`} data-testid="todo-list" key={altList ? 'alt' : 'normal'}>
      <TransitionGroup component={null}>
        {filterTodos().map((todo) => (
           <CSSTransition
           key={todo.id}
           timeout={500}
           classNames={{
             enter: classes.todoEnter,
             enterActive: classes.todoEnterActive,
             exit: classes.todoExit,
             exitActive: classes.todoExitActive,
           }}
         >
          <ToDos todo={todo} statusHandler={statusHandler} addToDoHandler={addToDoHandler} deleteHandler={deleteHandler} importantHandler={importantHandler} />
          </CSSTransition>
        ))}
        
        <li onClick={() => addToDoHandler()} className={`${classes.createTodo} ${altList ? classes.todoListAlternative : ''}`}>
          <button>Add todo</button>
        </li>
        </TransitionGroup>
      </ul>
      {showModal && <NewToDo createTodo={createTodo} onHideModal={hideModal} editTodo={editTodo} todo={selectedTodo} />}
    </section>
  );
}

export default TodoList;
