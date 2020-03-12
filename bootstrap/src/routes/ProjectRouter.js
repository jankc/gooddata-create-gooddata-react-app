import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch, useParams } from "react-router-dom";
import { ErrorComponent } from "@gooddata/react-components";

import { useProjectAvailability } from "../hooks/projectAvailability";
import { useProjectId } from "../contexts/ProjectId";

import Home from "./Home";
import Page from "../components/Page";
import CustomLoading from "../components/CustomLoading";

const NotFoundPage = () => (
    <Page>
        <ErrorComponent message={"Project not available"} description={"Please select another project"} />
    </Page>
);
const ErrorPage = () => (
    <Page>
        <ErrorComponent message={"Internal Server Error"} description={"Please try again later"} />
    </Page>
);
const LoadingPage = () => (
    <Page>
        <CustomLoading />
    </Page>
);

const ProjectRouter = () => {
    const { path } = useRouteMatch();
    const { projectId } = useParams();
    const projectAvailability = useProjectAvailability(projectId);
    const { setProjectId } = useProjectId();

    useEffect(() => {
        setProjectId(projectId);
        console.log("Set project ID", projectId);
        // Do not update on setProjectId change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId]);

    if (projectAvailability.isLoading) return <LoadingPage />;

    if (projectAvailability.error) {
        if (((projectAvailability.error.code / 100) | 0) === 5) return <ErrorPage />;
        return <NotFoundPage />;
    }

    return (
        <Switch>
            <Route exact path={`${path}/`} component={Home} />
            <Route exact path={`${path}/dashboard`} component={() => <Page>Dashboard</Page>} />
        </Switch>
    );
};

export default ProjectRouter;
