import { useCallback } from "react";
import { loadProjectsActionCreator } from "../../store/features/projectsSlice/projectsSlice";
import { ProjectsData } from "../../store/features/projectsSlice/types";
import {
  setIsLoadingActionCreator,
  unsetIsLoadingActionCreator,
} from "../../store/features/uiSlice/uiSlice";
import { useAppDispatch } from "../../store/hooks";

const apiUrl = process.env.REACT_APP_URL_API;
const pathProjects = "/projects";
const getProjectsEndpoint = "/projects";

const useProjects = () => {
  const dispatch = useAppDispatch();

  const getProjects = useCallback(async () => {
    try {
      dispatch(setIsLoadingActionCreator());

      const response = await fetch(
        `${apiUrl}${pathProjects}${getProjectsEndpoint}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      const { projects } = (await response.json()) as ProjectsData;

      if (!response.ok) {
        return;
      }

      dispatch(unsetIsLoadingActionCreator());
      dispatch(loadProjectsActionCreator(projects));
    } catch (error) {
      dispatch(unsetIsLoadingActionCreator());

      return (error as Error).message;
    }
  }, [dispatch]);

  return { getProjects };
};

export default useProjects;
