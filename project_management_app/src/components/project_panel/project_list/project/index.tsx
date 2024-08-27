import { useDispatch } from "react-redux";
import { useCallback, useMemo, useState } from "react";

import styles from "./styles.module.css";
import { selectProject } from "../../../../redux_store/selected_project_reducer";
import { IProject, ProjectState } from "../../../../types/project";
import { getFlagClassName, getProjectStateLabel } from "../../../../utility";

interface IProjectProps extends IProject {
  isSelected: boolean;
}

const Project = ({
  name,
  state,
  isSelected,
  id,
}: IProjectProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const dispatch = useDispatch();

  const flagClassName = useMemo(() => getFlagClassName(state, styles), [state]);
  const projectLabel = useMemo(() => getProjectStateLabel(state), [state]);

  const listClickHandler = useCallback(() => {
    dispatch(selectProject({ projectId: id, state }));
  }, [state, id, dispatch]);

  return (
    <li
      className={styles.list}
      onClick={state === ProjectState.FINISHED ? undefined : listClickHandler}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      aria-selected={isSelected}
      role="option"
    >
      <a
        className={`${styles.project} ${isSelected ? styles.projectSelected : ""
          } ${!isSelected && isHovered && state !== ProjectState.FINISHED
            ? styles.projectHover
            : ""
          }`}
        role="button"
        aria-disabled={state === ProjectState.FINISHED}
        aria-label={`${name}, ${projectLabel}`}
      >
        <h3>{name}</h3>
        <p>{projectLabel}</p>
        <span className={`${styles.flag} ${flagClassName}`}></span>
      </a>
    </li>
  );
};
export default Project;
