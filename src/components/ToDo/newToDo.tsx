import classes from './newToDo.module.css';
import { useRef, useState, useEffect } from 'react';

interface Todo {
    id: number;
    title: string;
    description: string;
    isImportant: boolean;
    isCompleted: boolean;
    date: Date | null;
  }
  
  interface TodoListProps {
    createTodo: (
      title: string,
      description: string,
      isImportant: boolean,
      isCompleted: boolean,
      date: Date | null
    ) => void;
    editTodo: (
      id: number,
      title: string,
      description: string,
      isImportant: boolean,
      isCompleted: boolean,
      date: Date | null
    ) => void;
    onHideModal: () => void;
    todo?: Todo | null;
  }
  

function NewToDo({
  createTodo,
  editTodo,
  onHideModal,
  todo,
}: TodoListProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if (todo) {
      const { title, description, isImportant, isCompleted, date } = todo;
      setTitle(title);
      setDescription(description);
      setIsImportant(isImportant);
      setIsCompleted(isCompleted);
      setDate(date);
    }
  }, [todo]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(!title || title.trim() === ''){
      alert("Please provide a title.");
      return
    }
    if(!description || description.trim() === ''){
      alert("Please provide a description.")
    }
    if (description.length > 500) {
      alert('Description cannot exceed 500 characters.');
      return;
    }
    if(title.length > 80){
      alert('Title cannot exceed 80 characters.');
      return;
    }
    if (todo) {
      editTodo(
        todo.id,
        title,
        description,
        isImportant,
        isCompleted,
        date
      );
    } else {
      createTodo(
        title,
        description,
        isImportant,
        isCompleted,
        date
      );
    }

    setTitle('');
    setDescription('');
    setIsImportant(false);
    setIsCompleted(false);
    setDate(null);

    onHideModal();
  }

  return (
    <div className={classes.formContainer} data-testid="todo-modal">
      <div className={classes.overlay} onClick={onHideModal}></div>
      <form className={classes.form} onSubmit={handleFormSubmit}>
        <h2>{todo ? 'Edit Task' : 'Add Task'}</h2>
        <label htmlFor="title">title</label>
        <input
          placeholder="e.g, study"
          ref={titleRef}
          className={classes.formTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
        />
        <label htmlFor="description">Description</label>
        <textarea
          placeholder="(max 500 characters)"
          ref={descriptionRef}
          className={classes.formDescription}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
        />
        <label htmlFor='date'>Date</label>
        <input
          className={classes.formTitle}
          type="date"
          value={date ? date.toISOString().split("T")[0] : ""}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        <div className={classes.checkboxContainer}>
          <div>
          <label htmlFor="priority">Important</label>
          <input
            type="checkbox"
            name="priority"
            className={classes.checkbox}
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
          />
          </div>
          <div>
          <label htmlFor="completion">Completed</label>
          <input
            type="checkbox"
            name="completion"
            className={classes.checkbox}
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          </div>
        </div>
        <div className={classes.formButtons}>
        <button onClick={onHideModal}>Cancel</button>
        <button type="submit">{todo ? 'Save' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
}


export default NewToDo;
