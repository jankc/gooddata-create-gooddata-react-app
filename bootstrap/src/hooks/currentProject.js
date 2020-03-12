import { useState, useEffect } from "react";

import { defaultSourceState } from "../utils";
import sdk from "../sdk";

export const useCurrentProject = () => {
    const [currentProjectState, setCurrentProjectState] = useState({ ...defaultSourceState });
    useEffect(() => {
        const getProjectStatus = async () => {
            setCurrentProjectState({ isLoading: true });
            try {
                const config = await sdk.project.getCurrentProjectId();
                setCurrentProjectState({ isLoading: false, data: config });
            } catch (error) {
                setCurrentProjectState({ isLoading: false, error });
            }
        };
        getProjectStatus();
    });

    return currentProjectState;
};
