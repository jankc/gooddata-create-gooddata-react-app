import React, { createContext, useState, useContext, useEffect } from "react";
import { defaultSourceState } from "../utils";
import sdk from "../sdk";
import { useAuth } from "../contexts/Auth";

const ProjectListContext = createContext({
    ...defaultSourceState,
});

export const ProjectListProvider = ({ children }) => {
    const authState = useAuth();
    const [projectListState, setProjectListState] = useState({ ...defaultSourceState });

    useEffect(() => {
        const getProjects = async userId => {
            setProjectListState({ isLoading: true });
            try {
                const currentProjects = await sdk.project.getProjects(userId);
                setProjectListState({ isLoading: false, data: currentProjects });
            } catch (error) {
                setProjectListState({ isLoading: false, error });
            }
        };

        setProjectListState({ isLoading: false });
        if (!authState.isLoading && authState.data) getProjects(authState.data.loginMD5);
    }, [authState.isLoading, authState.data]);

    return (
        <ProjectListContext.Provider value={{ ...projectListState }}>{children}</ProjectListContext.Provider>
    );
};

export const useProjectList = () => useContext(ProjectListContext);
