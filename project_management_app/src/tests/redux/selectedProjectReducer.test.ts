// src/redux/slices/selectedProjectsSlice.test.ts
import selectedProjectsReducer, { selectProject, reset } from '../../redux_store/selected_project_reducer';
import { ProjectState } from '../../types/project';

// Define the initial state
const INITIAL_STATE = {
    selectedProjectIds: [],
    state: null,
};

// Test for `selectProject` and `reset` reducers
describe('selectedProjectsSlice reducer', () => {
    it('should return the initial state', () => {
        expect(selectedProjectsReducer(undefined, { type: '@@INIT' })).toEqual(INITIAL_STATE);
    });

    it('should handle selectProject when no projects are selected', () => {
        const action = selectProject({ projectId: 1, state: ProjectState.LAUNCHED });
        const expectedState = {
            selectedProjectIds: [1],
            state: ProjectState.LAUNCHED,
        };
        expect(selectedProjectsReducer(INITIAL_STATE, action)).toEqual(expectedState);
    });

    it('should handle selectProject when a project is selected and then deselected', () => {
        // Initial state with one selected project
        const initialState = {
            selectedProjectIds: [1],
            state: ProjectState.LAUNCHED,
        };
        const action = selectProject({ projectId: 1, state: ProjectState.LAUNCHED });
        const expectedState = {
            selectedProjectIds: [],
            state: null,
        };
        expect(selectedProjectsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle selectProject when a new project is added to an existing selection', () => {
        // Initial state with one selected project
        const initialState = {
            selectedProjectIds: [1],
            state: ProjectState.LAUNCHED,
        };
        const action = selectProject({ projectId: 2, state: ProjectState.LAUNCHED });
        const expectedState = {
            selectedProjectIds: [1, 2],
            state: ProjectState.LAUNCHED,
        };
        expect(selectedProjectsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle selectProject when changing state', () => {
        // Initial state with one selected project
        const initialState = {
            selectedProjectIds: [1],
            state: ProjectState.LAUNCHED,
        };
        const action = selectProject({ projectId: 2, state: ProjectState.FINISHED });
        const expectedState = {
            selectedProjectIds: [2],
            state: ProjectState.FINISHED,
        };
        expect(selectedProjectsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle reset', () => {
        const initialState = {
            selectedProjectIds: [1, 2],
            state: ProjectState.LAUNCHED,
        };
        const action = reset();
        const expectedState = INITIAL_STATE;
        expect(selectedProjectsReducer(initialState, action)).toEqual(expectedState);
    });
});
