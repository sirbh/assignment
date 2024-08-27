// src/redux/slices/projectSlice.test.ts
import projectReducer, { updateProjectState } from '../../redux_store/project_reducer';
import { ProjectState } from '../../types/project';

// Define the initial state
const INITIAL_STATE = [
    {
        id: 1,
        name: "Travel to mars",
        state: ProjectState.LAUNCHED,
    },
    {
        id: 2,
        name: "Build a rocket",
        state: ProjectState.FINISHED,
    },
    {
        id: 3,
        name: "Study: grow plants on mars",
        state: ProjectState.NOT_STARTED,
    },
    {
        id: 4,
        name: "Study: new human generation on mars",
        state: ProjectState.NOT_STARTED,
    }
];

describe('projectSlice reducer', () => {
    it('should return the initial state', () => {
        expect(projectReducer(undefined, { type: '@@INIT' })).toEqual(INITIAL_STATE);
    });

    it('should handle updateProjectState', () => {
        const newState = ProjectState.FINISHED;
        const projectIds = [1, 3];
        
        const action = updateProjectState({ projectIds, state: newState });
        const updatedState = projectReducer(INITIAL_STATE, action);

        expect(updatedState).toEqual([
            {
                id: 1,
                name: "Travel to mars",
                state: newState,  // Should be updated
            },
            {
                id: 2,
                name: "Build a rocket",
                state: ProjectState.FINISHED,
            },
            {
                id: 3,
                name: "Study: grow plants on mars",
                state: newState,  // Should be updated
            },
            {
                id: 4,
                name: "Study: new human generation on mars",
                state: ProjectState.NOT_STARTED,
            }
        ]);
    });

    it('should not change state for projectIds that are not present', () => {
        const newState = ProjectState.LAUNCHED;
        const projectIds = [999];  // ID not present in initial state
        
        const action = updateProjectState({ projectIds, state: newState });
        const updatedState = projectReducer(INITIAL_STATE, action);

        expect(updatedState).toEqual(INITIAL_STATE);  // State should remain unchanged
    });
});
