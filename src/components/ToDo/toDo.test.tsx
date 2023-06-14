import { render, fireEvent, screen } from '@testing-library/react';
import ToDo from './toDo';

describe('Todo', () => {
    test('renders ToDo component without errors', () => {
        const todo = {
            id: 1,
            title: 'Test Todo',
            description: 'This is a test todo',
            isImportant: false,
            isCompleted: false,
            date: null
          };
      render(<ToDo  todo={todo}
        statusHandler={() => {}}
        addToDoHandler={() => {}}
        deleteHandler={() => {}}
        importantHandler={() => {}}/>);
  
      expect(screen.getByTestId('todo-title')).toBeInTheDocument();
    })
    test('should render the todo title and description', () => {
        const todo = {
          id: 1,
          title: 'Test Todo',
          description: 'This is a test todo',
          isImportant: false,
          isCompleted: false,
          date: null
        };
        render(
          <ToDo
            todo={todo}
            statusHandler={jest.fn()}
            addToDoHandler={jest.fn()}
            deleteHandler={jest.fn()}
            importantHandler={jest.fn()}
          />
        );
      
        const titleElement = screen.getByTestId('todo-title');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent('Test Todo');
      
        const descriptionElement = screen.getByText('This is a test todo');
        expect(descriptionElement).toBeInTheDocument();
      });
      test('should toggle the completion status when clicked', () => {
        const todo = {
          id: 1,
          title: 'Test Todo',
          description: 'This is a test todo',
          isImportant: false,
          isCompleted: false,
          date: null
        };
        const statusHandlerMock = jest.fn();
        render(
          <ToDo
            todo={todo}
            statusHandler={statusHandlerMock}
            addToDoHandler={jest.fn()}
            deleteHandler={jest.fn()}
            importantHandler={jest.fn()}
          />
        );
      
        const completionButton = screen.getByTestId('completion');
        fireEvent.click(completionButton);
      
        expect(statusHandlerMock).toHaveBeenCalledWith(1);
      });
      it('should call the deleteHandler when the delete button is clicked', () => {
        const todo = {
          id: 1,
          title: 'Test Todo',
          description: 'This is a test todo',
          isImportant: false,
          isCompleted: false,
          date: null
        };
        const deleteHandlerMock = jest.fn();
        render(
          <ToDo
            todo={todo}
            statusHandler={jest.fn()}
            addToDoHandler={jest.fn()}
            deleteHandler={deleteHandlerMock}
            importantHandler={jest.fn()}
          />
        );
      
        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);
      
        expect(deleteHandlerMock).toHaveBeenCalledWith(1);
      });      
}) 