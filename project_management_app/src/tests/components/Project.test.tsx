import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Project from '../../components/project_panel/project_list/project';
import selectedProjectReducer, { selectProject } from '../../redux_store/selected_project_reducer';
import { ProjectState } from '../../types/project';

// Create a mock store for action verification
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      selectedProjectReducer: selectedProjectReducer,
    },
    preloadedState: initialState,
  });
};

describe('Project Component', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
  });

  it('should render correctly', () => {
    const props = {
      id: 1,
      name: 'Test Project',
      state: ProjectState.NOT_STARTED,
      isSelected: false,
    };

    render(
      <Provider store={store}>
        <Project {...props} />
      </Provider>
    );


    expect(screen.getByText(/Test Project/i)).toBeInTheDocument();
    expect(screen.getByText(/Not started/i)).toBeInTheDocument();

  });

  it('should apply the correct flag class based on project state', () => {
    const props = {
      id: 1,
      name: 'Test Project',
      state: ProjectState.LAUNCHED,
      isSelected: false,
    };

    render(
      <Provider store={store}>
        <Project {...props} />
      </Provider>
    );

    const flagElement = screen.getByRole('option').querySelector('span');
    expect(flagElement).toHaveClass('launched'); // Adjust class based on your actual CSS class
  });

  it('should dispatch selectProject action on click if project is not finished', () => {
    const props = {
      id: 1,
      name: 'Test Project',
      state: ProjectState.NOT_STARTED,
      isSelected: false,
    };

    const actionSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Project {...props} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('option'));

    expect(actionSpy).toHaveBeenCalledWith(selectProject({
      projectId: 1,
      state: ProjectState.NOT_STARTED,
    }));
  });

  it('should not dispatch selectProject action if project is finished', () => {
    const props = {
      id: 1,
      name: 'Test Project',
      state: ProjectState.FINISHED,
      isSelected: false,
    };

    const actionSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Project {...props} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('option'));

    expect(actionSpy).not.toHaveBeenCalledWith(selectProject({
      projectId: 1,
      state: ProjectState.FINISHED,
    }));
  });

  it('should change hover state when mouse enters and leaves', () => {
    const props = {
      id: 1,
      name: 'Test Project',
      state: ProjectState.NOT_STARTED,
      isSelected: false,
    };

    render(
      <Provider store={store}>
        <Project {...props} />
      </Provider>
    );

    const listItem = screen.getByRole('option');
    fireEvent.mouseEnter(listItem);
    expect(listItem.querySelector('a')).toHaveClass('projectHover'); // Adjust class based on your actual CSS class

    fireEvent.mouseLeave(listItem);
    expect(listItem.querySelector('a')).not.toHaveClass('projectHover');
  });
});
