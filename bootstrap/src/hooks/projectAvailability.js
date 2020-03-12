import { useState, useEffect } from "react";

import { defaultSourceState } from "../utils";
import sdk from "../sdk";

export const useProjectAvailability = projectId => {
    const [projectCheckState, setProjectCheckState] = useState({ ...defaultSourceState });
    useEffect(() => {
        const getProjectStatus = async projectId => {
            setProjectCheckState({ isLoading: true });
            try {
                const config = await sdk.project.getConfig(projectId);
                setProjectCheckState({ isLoading: false, data: config });
            } catch (error) {
                setProjectCheckState({ isLoading: false, error });
            }
        };
        getProjectStatus(projectId);
    }, [projectId]);

    return projectCheckState;
};
