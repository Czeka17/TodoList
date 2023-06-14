import { render, screen, fireEvent } from '@testing-library/react';
import ToDoActions from './toDoActions';

describe('ToDoActions', () => {
  it('should call the appropriate handlers when buttons and select options are clicked', () => {
    const altListHandlerMock = jest.fn();
    const normalListHandlerMock = jest.fn();
    const filterAllTodosMock = jest.fn();
    const filterByCompletionHandlerMock = jest.fn();
    const filterByImportanceHandlerMock = jest.fn();

    render(
      <ToDoActions
        altListHandler={altListHandlerMock}
        normalListHandler={normalListHandlerMock}
        altList={false}
        filterAllTodos={filterAllTodosMock}
        filterByCompletionHandler={filterByCompletionHandlerMock}
        filterByImportanceHandler={filterByImportanceHandlerMock}
      />
    );

    const altListButton = screen.getByTestId('alt-list');
    fireEvent.click(altListButton);
    expect(altListHandlerMock).toHaveBeenCalled();


    const normalListButton = screen.getByTestId('normal-list');
    fireEvent.click(normalListButton);
    expect(normalListHandlerMock).toHaveBeenCalled();


    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'importance' } });
    expect(filterByImportanceHandlerMock).toHaveBeenCalled();


    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'completion' } });
    expect(filterByCompletionHandlerMock).toHaveBeenCalled();


    fireEvent.change(screen.getByRole('combobox'), { target: { value: '' } });
    expect(filterAllTodosMock).toHaveBeenCalled();
  });
});
