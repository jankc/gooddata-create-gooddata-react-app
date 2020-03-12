import React from "react";
import { useHistory } from "react-router-dom";
import last from "lodash/last";

import InlineLoading from "../InlineLoading";
import { useProjectId } from "../../contexts/ProjectId";
import { useProjectList } from "../../contexts/ProjectList";

const isInList = (projectId, projectList) => {
    return (
        projectId &&
        projectList &&
        projectList.some(project => last(project.links.self.split("/")) === projectId)
    );
};

const projectOptions = projects =>
    projects.map(project => {
        const projectId = last(project.links.self.split("/"));
        return (
            <option value={projectId} key={projectId}>
                {`${project.meta.title} - ${projectId}`}
            </option>
        );
    });

const ProjectPicker = () => {
    const { projectId } = useProjectId();
    const projectList = useProjectList();
    const history = useHistory();

    const redirectProject = projectId => {
        return history.push(`/project/${projectId}/`);
    };

    return (
        <div>
            {projectList.isLoading && <InlineLoading />}
            {!projectList.isLoading && projectList.data && (
                <select value={projectId} onChange={event => redirectProject(event.target.value)}>
                    {!isInList(projectId, projectList.data) && (
                        <option value={""} key={"0"}>
                            Please select...
                        </option>
                    )}
                    {projectOptions(projectList.data)}
                </select>
            )}
            {!projectList.isLoading && projectList.error && "Error loading projects"}
        </div>
    );
};

export default ProjectPicker;
