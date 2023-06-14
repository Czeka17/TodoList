import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterNav from './filters';
import classes from './filters.module.css'
describe('FilterNav', () => {
  it('should set the initial active filter to empty', () => {
    const onFilterMock = jest.fn();
    const hideMenuHandlerMock = jest.fn();

    const { getByText } = render(
      <FilterNav
        onFilter={onFilterMock}
        showMenu={false}
        hideMenuHandler={hideMenuHandlerMock}
      />
    );

    expect(getByText('Today\'s')).not.toHaveClass('active');
    expect(getByText('Important')).not.toHaveClass('active');
    expect(getByText('Completed')).not.toHaveClass('active');
    expect(getByText('Uncompleted')).not.toHaveClass('active');
    expect(getByText('All')).not.toHaveClass('active');
  });

  it('should handle clicking on a filter', () => {
    const onFilterMock = jest.fn();
    const hideMenuHandlerMock = jest.fn();

    const { getByTestId} = render(
      <FilterNav
        onFilter={onFilterMock}
        showMenu={false}
        hideMenuHandler={hideMenuHandlerMock}
      />
    );

    const importantFilter = getByTestId("todo-filter")
    fireEvent.click(importantFilter);

    expect(onFilterMock).toHaveBeenCalledWith('important');
    expect(importantFilter.classList.contains(classes.active)).toBeTruthy();
    expect(hideMenuHandlerMock).toHaveBeenCalled();
  });

  it('should handle hiding the menu', () => {
    const onFilterMock = jest.fn();
    const hideMenuHandlerMock = jest.fn();

    const { getByText } = render(
      <FilterNav
        onFilter={onFilterMock}
        showMenu={true}
        hideMenuHandler={hideMenuHandlerMock}
      />
    );

    const completedFilter = getByText('Completed');
    fireEvent.click(completedFilter);

    expect(hideMenuHandlerMock).toHaveBeenCalled();
  });
});
