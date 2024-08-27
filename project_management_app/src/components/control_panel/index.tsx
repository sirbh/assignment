import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import store from "../../redux_store";
import { updateProjectState } from "../../redux_store/project_reducer";
import { reset } from "../../redux_store/selected_project_reducer";
import styles from "./styles.module.css";
import { ProjectState } from "../../types/project";
import {
  launchBtnLabel,
  finishBtnLabel,
} from "../../app_constants/controlPanel";

const ControlPanel:React.FC = () => {

  const dispatch = useDispatch();
  const selectedProjects = useSelector(
    (state: ReturnType<typeof store.getState>) => state.selectedProjectReducer
  );

  // disable the buttons if no project is selected or the selected projects are already in the state
  const isDisabled = useCallback((state: ProjectState) => {
    return (
      selectedProjects.selectedProjectIds.length === 0 ||
      selectedProjects.state === state
    );
  },[selectedProjects]);

  // update the state of the selected projects
  const updateState = useCallback((state: ProjectState) => {
    dispatch(
      updateProjectState({
        projectIds: selectedProjects.selectedProjectIds,
        state: state,
      })
    );
    dispatch(reset());
  },[selectedProjects,dispatch]);

  return (
    <div className={styles.panleButtonContainer}  role="group" aria-label="Control Panel">
      <button
        className={styles.panelButton}
        aria-disabled={isDisabled(ProjectState.LAUNCHED)}
        aria-label={`Launch selected projects. ${isDisabled(ProjectState.LAUNCHED) ? 'Currently disabled.' : ''}`}
        disabled={isDisabled(ProjectState.LAUNCHED)}
        onClick={() => {
          updateState(ProjectState.LAUNCHED);
        }}
      >
        {launchBtnLabel}
      </button>
      <button
        className={styles.panelButton}
        disabled={isDisabled(ProjectState.FINISHED)}
        aria-disabled={isDisabled(ProjectState.FINISHED)}
        aria-label={`Finish selected projects. ${isDisabled(ProjectState.FINISHED) ? 'Currently disabled.' : ''}`}
        onClick={() => {
          updateState(ProjectState.FINISHED);
        }}
      >
        {finishBtnLabel}
      </button>
    </div>
  );
};

export default ControlPanel;
