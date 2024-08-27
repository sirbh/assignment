import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject, ProjectState } from "../../types/project";


const INITIAL_STATE:IProject[] = [
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
export const projectSlice = createSlice({
    name: "project",
    initialState: INITIAL_STATE,
    reducers: {
        updateProjectState: (projects, action:PayloadAction<{projectIds:number[],state:ProjectState}>) => {
            return projects.map((project) => {
                if (action.payload.projectIds.includes(project.id)) {
                    return {
                        ...project,
                        state: action.payload.state,
                    };
                }
                return project;
            });
        },
    },
});

export const { updateProjectState } = projectSlice.actions;
export default projectSlice.reducer;