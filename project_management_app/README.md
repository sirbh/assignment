# Project Management Application

## App is live at

- [Project Management App](https://venerable-raindrop-be571d.netlify.app/)

## Overview

This is a simple React application for managing projects, providing a user-friendly interface to view, launch, and finish projects. The application is designed to allow users to easily interact with a list of projects, where they can manage the state of each project (Not Started, Launched, Finished) through a control panel with action buttons.

## Features

- **Project List Panel**: Displays a list of projects with their names and current states.
- **Project States**: Projects can be in one of three states: Not Started, Launched, or Finished.
- **Control Panel**: Contains action buttons ("Launch" and "Finish") to manage the state of selected projects.
- **Project Selection**: Users can select one or multiple projects from the list and apply actions from the control panel.
- **State Management**: 
  - Projects that are "Finished" are not selectable and no actions can be applied to them.
  - Only projects with the same state can be selected simultaneously.
  - Once a project or multiple projects are selected, the selected item(s) are visually highlighted.

## Application Behavior

- **Visual Cues**:
  - The project state is indicated by both text and color. For example, the border color on the right of the project item can reflect its state.
  - Hovering over a project item will change its background color to indicate that it is selectable (e.g., light grey).
  - Selected projects will change their background color to indicate that they have been selected (e.g., dark blue).
  
- **Actions**:
  - After selecting a project(s), users can apply the "Launch" or "Finish" actions.
  - Once an action is applied, the project’s state is updated, and the project list refreshes accordingly, with the background color reverting to the default state.
  - Projects in the "Finished" state become unselectable and no further actions can be performed on them.

## Initial Data

The application initializes with a set of projects populated from a JSON object that contains their initial states.

## Technical Requirements

- **Language**: TypeScript
- **Framework**: React
- **Data Handling**: The application data (projects and their states) are populated from a predefined JSON object.
- **Testing**: Jest, React Testing Library

## How to test

- Run ```npm run test```
  
## How to Run the Project

1. Clone the repository.
2. Navigate to the project directory.
3. Install the necessary dependencies:
   ```bash
   npm install
   ```
### For dev mode

- run ```npm run dev```

### For production mode

1. Run ```npm run build```
2. Then run ```npm run preview```
