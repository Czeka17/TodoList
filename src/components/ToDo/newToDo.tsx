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

    if(!title || title.trim() === '' || !description || description.trim() === ''){
      alert("Please provide a title and description.");
      return
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
    <div className={classes.formContainer}>
      <div className={classes.overlay} onClick={onHideModal}></div>
      <form className={classes.form} onSubmit={handleFormSubmit}>
        <p>{todo ? 'Edit Todo' : 'Add Todo'}</p>
        <input
          placeholder="title"
          ref={titleRef}
          className={classes.formTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="description"
          ref={descriptionRef}
          className={classes.formDescription}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className={classes.formTitle}
          type="date"
          value={date ? date.toISOString().split("T")[0] : ""}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        <div>
          <label htmlFor="priority">Important?</label>
          <input
            type="checkbox"
            name="priority"
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
          />
          <label htmlFor="completion">Completed?</label>
          <input
            type="checkbox"
            name="completion"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
        </div>
        <button type="submit">{todo ? 'Save' : 'Create'}</button>
        <button onClick={onHideModal}>Cancel</button>
      </form>
    </div>
  );
}

export default NewToDo;
