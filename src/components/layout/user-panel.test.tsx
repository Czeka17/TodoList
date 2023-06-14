import { render, screen, fireEvent } from '@testing-library/react';
import UserPanel from './user-panel';

describe('UserPanel', () => {
  const mockTodos = [
    { id: 1,
        title: 'Existing Todo',
        description: 'This is an existing todo',
        isImportant: false,
        isCompleted: false,
        date: null
    }
  ];

  it('should display the correct completion percentage', () => {
    const onDeleteMock = jest.fn();
    const formattedDate = 'June 14, 2023';
  
    const todayTasks = mockTodos.filter(
      (todo) => todo.date === formattedDate
    );
  
    render(
      <UserPanel todos={mockTodos} onDelete={onDeleteMock} formattedDate={formattedDate} showMetrics={true} />
    );
  
    const allTasksPercentage = screen.getByTestId('all-tasks');
    expect(allTasksPercentage).toBeInTheDocument();
  
    if (todayTasks.length > 0) {
      const todayTasksPercentage = screen.getByTestId('today-tasks');
      expect(todayTasksPercentage).toBeInTheDocument();
    }
  });

  it('should call the onDelete function when "Delete all todos" button is clicked', () => {
    const onDeleteMock = jest.fn();
    const formattedDate = 'June 14, 2023';

    render(
      <UserPanel todos={mockTodos} onDelete={onDeleteMock} formattedDate={formattedDate} showMetrics={true} />
    );

    const deleteButton = screen.getByText('Delete all todos');
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalled();
  });

  it('should render the GitHub link with the correct href', () => {
    const onDeleteMock = jest.fn();
    const formattedDate = 'June 14, 2023';

    render(
      <UserPanel todos={mockTodos} onDelete={onDeleteMock} formattedDate={formattedDate} showMetrics={true} />
    );

    const githubLink = screen.getByText('Made by Jakub Czekański');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.getAttribute('href')).toBe('https://github.com/Czeka17');
  });
});
