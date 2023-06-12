import React, {useState, useEffect} from "react";
import TodoList from "./components/ToDo/toDoList";
import FilterNav from "./components/layout/filters";
import classes from './App.module.css'
import UserPanel from "./components/layout/user-panel";
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
  const [nextId, setNextId] = useState(1);
  const [filter, setFilter] = useState("");


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

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNextId(nextId + 1);
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
	  }
	  return true;
	})
  : todos;
	return (
		<section className={classes.display}>
			<FilterNav onFilter={handleFilter} />
			<TodoList todos={filteredTodos} createTodo={createTodo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
			<UserPanel todos={filteredTodos}/>
		</section>
	);
}

export default App;
