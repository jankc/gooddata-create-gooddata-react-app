import React, { createContext, useState, useContext, useEffect } from "react";

import { projectId as constProjectId } from "../constants";
import sdk from "../sdk";
import { useAuth } from "../contexts/Auth";

const ProjectIdContext = createContext({
    projectId: constProjectId,
    setProjectId: () => {},
});

export const ProjectIdProvider = ({ children }) => {
    const authState = useAuth();
    const [projectId, setProjectId] = useState(constProjectId);

    useEffect(() => {
        const getCurrentProjectId = async () => {
            try {
                const bootstrapProjectId = await sdk.project.getCurrentProjectId();
                console.log("projectId", projectId);
                if (!projectId) {
                    console.log("Switching to last used project: ", bootstrapProjectId);
                    setProjectId(bootstrapProjectId);
                }
            } catch {}
        };
        console.log("projectId OUT", projectId);

        if (!projectId) getCurrentProjectId();
        // Do not update on projectId change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <ProjectIdContext.Provider value={{ projectId, setProjectId }}>{children}</ProjectIdContext.Provider>
    );
};

export const useProjectId = () => useContext(ProjectIdContext);
