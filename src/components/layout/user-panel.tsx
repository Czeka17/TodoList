import React from "react";
import classes from './user-panel.module.css'
interface ToDo {
	id: number;
	title: string;
	description: string;
	isImportant: boolean;
	isCompleted: boolean;
	date: Date | null
  }
interface UserPanelProps {
  todos: ToDo[];
  onDelete: () => void
  formattedDate: string;
}

const UserPanel: React.FC<UserPanelProps> = ({ todos, onDelete, formattedDate }) => {
  const getCompletionPercentage = (): number => {
    if (todos.length === 0) {
      return 0;
    }
    const completedTodos = todos.filter((todo) => todo.isCompleted);
    return (completedTodos.length / todos.length) * 100;
  };
  const getTodayCompletionPercentage = ():number => {
    if(todayTasks.length === 0){
      return 0;
    }
    const completedTodayTasks = todayTasks.filter((todo) => todo.isCompleted);
    return (completedTodayTasks.length / todayTasks.length) * 100;
  }
  const completedTasks = todos.filter((todo) => todo.isCompleted);
    const totalTasks = todos.length;
    const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
    const todayTasks = todos.filter(
      (todo) =>
        todo.date &&
        todo.date.toLocaleDateString('en-US', options) === formattedDate
    );
    const completedTodayTasks = todayTasks.filter((todo) => todo.isCompleted)
  return (
    <div className={classes.container}>
      <div>
      <p>Hello user!</p>
      {totalTasks ? <div><p className={classes.percentage}>All tasks: {completedTasks.length}/{totalTasks}</p>
      <div className={classes.line}>
      <div
          className={classes.fill}
          style={{ width: `${getCompletionPercentage()}%` }}
        />
      </div></div>: <p>No tasks!</p>}
      {todayTasks.length > 0 && <div>
        <p className={classes.percentage}>Today tasks: {completedTodayTasks.length}/{todayTasks.length}</p>
      <div className={classes.line}>
      <div
          className={classes.fill}
          style={{ width: `${getTodayCompletionPercentage()}%` }}
        />
      </div></div>}

      </div>
    <div>
    <button className={classes.deleteHandler} onClick={onDelete}>Delete all todos</button>
    <button className={classes.githubAnchor}><a href="https://github.com/Czeka17" target="_blank">Made by Jakub Czekański</a></button>
    </div>
    </div>
  );
};

export default UserPanel;
