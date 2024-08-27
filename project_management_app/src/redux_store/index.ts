import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./project_reducer";
import selectedProjectReducer from "./selected_project_reducer";


const store =  configureStore({
  reducer: {
    project: projectReducer,
    selectedProjectReducer: selectedProjectReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type StoreType = typeof store;
