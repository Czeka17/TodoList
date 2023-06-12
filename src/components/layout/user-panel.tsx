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
}

const UserPanel: React.FC<UserPanelProps> = ({ todos }) => {
  const getCompletionPercentage = (): number => {
    if (todos.length === 0) {
      return 0;
    }

    const completedTodos = todos.filter((todo) => todo.isCompleted);
    return (completedTodos.length / todos.length) * 100;
  };
  const completedTasks = todos.filter((todo) => todo.isCompleted);
    const totalTasks = todos.length;

  return (
    <div className={classes.container}>
      <p className={classes.percentage}>Tasks: {completedTasks.length}/{totalTasks}</p>
      <div className={classes.line}>
      <div
          className={classes.fill}
          style={{ width: `${getCompletionPercentage()}%` }}
        />
      </div>
    </div>
  );
};

export default UserPanel;
