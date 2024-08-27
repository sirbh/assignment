export enum ProjectState {
    LAUNCHED = "LAUNCHED",
    FINISHED = "FINISHED",
    NOT_STARTED = "NOT_STARTED"
}


export interface IProject {
    id: number;
    name: string;
    state: ProjectState;
}



