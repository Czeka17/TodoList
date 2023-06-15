import React, {useState, useEffect} from "react";
import TodoList from "./components/ToDo/toDoList";
import FilterNav from "./components/layout/filters";
import classes from './App.module.css'
import UserPanel from "./components/layout/user-panel";
import { Helmet } from 'react-helmet';

interface ToDo {
	id: number;
	title: string;
	description: string;
	isImportant: boolean;
	isCompleted: boolean;
	date: Date | null
  }
  
function App() {
	const [todos, setTodos] = useState<ToDo[]>([]);
  const [nextId, setNextId] = useState(4);
  const [filter, setFilter] = useState("");
  const [showMenu, setShowMenu] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)
  const [hamburgerToggled, setHamburgerToggled] = useState(false);
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;

  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  const DUMMY_TODOS = [ 
    {
      id: 1,
      title: 'Test Todo',
      description: 'This is a test todo',
      isImportant: false,
      isCompleted: false,
      date: null
    },
    {
      id: 2,
      title: 'Test Todo',
      description: 'This is a test todo',
      isImportant: true,
      isCompleted: false,
      date: new Date(currentDate.toLocaleDateString('en-US', options))
    },{
      id: 3,
      title: 'Test Todo',
      description: 'This is a test todo',
      isImportant: false,
      isCompleted: true,
      date: null
    }
  ]
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
      setNextId(JSON.parse(storedTodos).length + 1); 
    }else {
      setTodos([...DUMMY_TODOS]);
      setNextId(DUMMY_TODOS.length + 1);
    }
    }, []);
    
  
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
  
	function deleteTodos(){
		setTodos([])
	}

  function createTodo(
    title: string,
    description: string,
    isImportant: boolean,
    isCompleted: boolean,
    date: Date | null
  ) {
    const newTodo = {
      id: nextId,
      title: title,
      description: description,
      isImportant: isImportant,
      isCompleted: isCompleted,
      date: date
    };

    setTodos((prevTodos) => [newTodo,...prevTodos]);
    setNextId((prevNextId) => prevNextId + 1);
  }

  function deleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function updateTodo(updatedTodo: ToDo) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  }
  function handleFilter(filter: string) {
    setFilter(filter);
  }
  const filteredTodos = filter
  ? todos.filter((todo) => {
	  if (filter === "important") {
		return todo.isImportant;
	  } else if (filter === "completed") {
		return todo.isCompleted;
	  }else if(filter === "uncompleted"){
		return !todo.isCompleted
	  }else if(filter === "today"){
      return todo.date && todo.date.toLocaleDateString('en-US', options) === formattedDate
    }
	  return true;
	})
  : todos;

  function hideMenuHandler(){
    setShowMenu(false)
    setHamburgerToggled(false);
  }
  function showMetricsHandler(){
    setShowMetrics(true)
  }
  function hideMetricsHandler(){
    setShowMetrics(false)
  }
  function hambugerToggledHandler(){
    setHamburgerToggled(prevState => !prevState)
  }
  function hamburgerToggleHandler(toggled: boolean){
    setShowMenu(toggled)
    setShowMetrics(false)
  }
	return (
		<main className={classes.display}>
      <Helmet>
      <title>Todo List App</title>
      <meta name="description" content="A simple todo list app to manage your tasks and stay organized." />
      <meta name="keywords" content="todo list, task manager, task tracker, productivity app" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="author" content="Jakub Czekański"/>
      </Helmet>
      {showMenu && <div className={classes.backdrop} onClick={hideMenuHandler}></div>}
			<FilterNav hideMenuHandler={hideMenuHandler} onFilter={handleFilter} showMenu={showMenu} />
			<TodoList todos={filteredTodos} createTodo={createTodo} updateTodo={updateTodo} deleteTodo={deleteTodo} formattedDate={formattedDate} showMetricsHandler={showMetricsHandler} hamburgerToggled={hamburgerToggled} hambugerToggledHandler={hambugerToggledHandler} hamburgerToggleHandler={hamburgerToggleHandler} />
      {showMetrics && <div className={classes.backdrop} onClick={hideMetricsHandler}></div>}
			<UserPanel todos={filteredTodos} onDelete={deleteTodos} formattedDate={formattedDate} showMetrics={showMetrics}/>
		</main>
	);
}

export default App;
