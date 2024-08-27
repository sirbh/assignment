import { useSelector } from "react-redux";

import { RootState } from "../../../redux_store";
import Project from "./project";




const ProjectList: React.FC = () => {
    const selectedProjects = useSelector((state: RootState) => state.selectedProjectReducer);
    const projects = useSelector((state: RootState) => state.project);
    return (
        <ul aria-label="List of Projects" role="listbox">
            {projects.map((project) => (
                <Project key={project.id} id={project.id} name={project.name} state={project.state} isSelected={selectedProjects.selectedProjectIds.includes(project.id)} />
            ))}
        </ul>
    );
};

export default ProjectList;