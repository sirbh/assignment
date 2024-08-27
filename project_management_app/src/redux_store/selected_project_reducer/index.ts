import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectState } from "../../types/project";

const INITIAL_STATE:{
    selectedProjectIds:number[],
    state:null|ProjectState
} = {
  selectedProjectIds: [],
  state: null,
};

export const selectedProjectsSlice = createSlice({
  name: "selectedProject",
  initialState: INITIAL_STATE,
  reducers: {
    selectProject: (selectedProjects, action:PayloadAction<{projectId:number,state:ProjectState}>) => {
        if(!selectedProjects.state||selectedProjects.state!==action.payload.state){
            selectedProjects.selectedProjectIds = [action.payload.projectId];
            selectedProjects.state = action.payload.state;
        }
        else if(selectedProjects.selectedProjectIds.includes(action.payload.projectId)){
            selectedProjects.selectedProjectIds = selectedProjects.selectedProjectIds.filter((id)=>id!==action.payload.projectId);
            if(selectedProjects.selectedProjectIds.length===0){
                selectedProjects.state = null;
            }
        }
        else {
            selectedProjects.selectedProjectIds.push(action.payload.projectId);
        }
    },

    reset: (selectedProjects) => {
        selectedProjects.selectedProjectIds = [];
        selectedProjects.state = null
    }
  },
});


export const { selectProject, reset } = selectedProjectsSlice.actions;
export default selectedProjectsSlice.reducer;