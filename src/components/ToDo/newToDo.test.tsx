import { render, fireEvent, screen } from '@testing-library/react';
import NewToDo from './newToDo';

describe('Todo modal', () => {
    test('renders ToDoModal component without errors', () => {
      render(<NewToDo  editTodo={() => {}}
      createTodo={() => {}}
      onHideModal={() => {}} />);
  
      expect(screen.getByTestId('todo-modal')).toBeInTheDocument();
    })

test('creates a new todo', () => {
  const createTodoMock = jest.fn();

  render(
    <NewToDo
      editTodo={jest.fn()}
      createTodo={createTodoMock}
      onHideModal={jest.fn()}
    />
  );

  const titleInput = screen.getByLabelText('title');
  fireEvent.change(titleInput, { target: { value: 'New Todo Title' } });

  const descriptionTextarea = screen.getByLabelText('Description');
  fireEvent.change(descriptionTextarea, {
    target: { value: 'New Todo Description' },
  });

  const submitButton = screen.getByText('Create');
  fireEvent.click(submitButton);

  expect(createTodoMock).toHaveBeenCalledWith(
    'New Todo Title',
    'New Todo Description',
    false,
    false,
    null
  );
});
  test('does not proceed if title or description is not valid', () => {
    const createTodoMock = jest.fn();
    const editTodoMock = jest.fn();
    const onHideModalMock = jest.fn();
  
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(
      <NewToDo
        createTodo={createTodoMock}
        editTodo={editTodoMock}
        onHideModal={onHideModalMock}
      />
    );
  
    const submitButton = screen.getByText('Create');
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('Please provide a title.' || 'Please provide a description.');
  
    expect(createTodoMock).not.toHaveBeenCalled();
    expect(editTodoMock).not.toHaveBeenCalled();

    mockAlert.mockRestore();
  });

  test('edits a todo item', () => {
    const editTodoMock = jest.fn();
    const onHideModalMock = jest.fn();
  
    const todo = {
      id: 1,
      title: 'Existing Todo',
      description: 'This is an existing todo',
      isImportant: false,
      isCompleted: false,
      date: null,
    };
  
    render(
      <NewToDo
      createTodo={() => {}}
        editTodo={editTodoMock}
        onHideModal={onHideModalMock}
        todo={todo}
      />
    );
  
    const titleInput = screen.getByLabelText('title');
    const descriptionTextarea = screen.getByLabelText('Description');
    fireEvent.change(titleInput, { target: { value: 'Updated Todo Title' } });
    fireEvent.change(descriptionTextarea, {
      target: { value: 'This is the updated description' },
    });
  
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
  
    expect(editTodoMock).toHaveBeenCalledTimes(1);
    expect(editTodoMock).toHaveBeenCalledWith(
      todo.id,
      'Updated Todo Title',
      'This is the updated description',
      false,
      false,
      null
    );

    expect(onHideModalMock).toHaveBeenCalledTimes(1);
  });
})