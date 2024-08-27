import { ProjectState } from "../types/project";

export const getFlagClassName = (state: ProjectState, styles:{[className:string]:string}) => {
    switch (state) {
        case ProjectState.LAUNCHED:
            return styles.launched;
        case ProjectState.FINISHED:
            return styles.finished;
        case ProjectState.NOT_STARTED:
            return styles.notStarted;
        default:
            return null;
    }
}


export const getProjectStateLabel = (state: ProjectState) => {
    switch (state) {
        case ProjectState.LAUNCHED:
            return "Launched";
        case ProjectState.FINISHED:
            return "Finished";
        case ProjectState.NOT_STARTED:
            return "Not started";
        default:
            return null;
    }
}