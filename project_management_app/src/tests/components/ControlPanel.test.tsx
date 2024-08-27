import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ControlPanel from "../../components/control_panel";
import selectedProjectReducer from "../../redux_store/selected_project_reducer";
import projectReducer from "../../redux_store/project_reducer";
import { ProjectState } from "../../types/project";
import { finishBtnLabel, launchBtnLabel } from "../../app_constants/controlPanel";
import { StoreType } from "@/redux_store";

describe("ControlPanel Component", () => {
  let store: StoreType;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        project:projectReducer,
        selectedProjectReducer:selectedProjectReducer,
      },
      preloadedState: {
        selectedProjectReducer: {
          selectedProjectIds: [],
          state: null,
        },
        project: [],
      },
    });
  });

  it(" should renders buttons with correct labels", () => {
    render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    expect(screen.getByText(launchBtnLabel)).toBeInTheDocument();
    expect(screen.getByText(finishBtnLabel)).toBeInTheDocument();
  });

  it(" should have buttons disabled when no projects are selected", () => {
    render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    expect(screen.getByText(launchBtnLabel)).toBeDisabled();
    expect(screen.getByText(finishBtnLabel)).toBeDisabled();
  });

  it(" should have buttons enabled when projects are selected", () => {
    store = configureStore({
      reducer: {
        selectedProjectReducer:selectedProjectReducer,
        project:projectReducer,
      },
      preloadedState: {
        selectedProjectReducer: {
          selectedProjectIds: [1, 2],
          state: ProjectState.NOT_STARTED,
        },
        project: [],
      },
    });

    render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    expect(screen.getByText(launchBtnLabel)).not.toBeDisabled();
    expect(screen.getByText(finishBtnLabel)).not.toBeDisabled();
  });

  it(" should dispatch correct actions on button click", () => {
    store = configureStore({
      reducer: {
        selectedProjectReducer:selectedProjectReducer,
        project:projectReducer,
      },
      preloadedState: {
        selectedProjectReducer: {
          selectedProjectIds: [1, 2],
          state: ProjectState.NOT_STARTED,
        },
        project: [{
            id: 1,
            name: "Travel to mars",
            state: ProjectState.NOT_STARTED,
            }, {
            id: 2,
            name: "Build a rocket",
            state: ProjectState.NOT_STARTED,
        }],
      },
    });

    render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    fireEvent.click(screen.getByText(launchBtnLabel));
    expect (store.getState().project[0].state).toBe(ProjectState.LAUNCHED);
    expect (store.getState().project[1].state).toBe(ProjectState.LAUNCHED);

  });

  it("should reset selectedProjectIds after dispatching actions", () => {
    store = configureStore({
      reducer: {
        selectedProjectReducer:selectedProjectReducer,
        project:projectReducer,
      },
      preloadedState: {
        selectedProjectReducer: {
          selectedProjectIds: [1, 2],
          state: ProjectState.NOT_STARTED,
        },
        project: [{
            id: 1,
            name: "Travel to mars",
            state: ProjectState.NOT_STARTED,
            }, {
            id: 2,
            name: "Build a rocket",
            state: ProjectState.NOT_STARTED,
        }],
      },
    });

    render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    fireEvent.click(screen.getByText(launchBtnLabel));
    expect (store.getState().selectedProjectReducer.selectedProjectIds).toEqual([]);
    expect (store.getState().selectedProjectReducer.state).toBe(null);
  });

  it("should make buttons disabled if selected projects are already in the respective state", () => {
    store = configureStore({
      reducer: {
        selectedProjectReducer:selectedProjectReducer,
        project:projectReducer,
      },
      preloadedState: {
        selectedProjectReducer: {
          selectedProjectIds: [1, 2],
          state: ProjectState.LAUNCHED,
        },
        project: [],
      },
    });

    render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    expect(screen.getByText(launchBtnLabel)).toBeDisabled();
    expect(screen.getByText(finishBtnLabel)).not.toBeDisabled();
  });
});
