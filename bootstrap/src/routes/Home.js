import React from "react";
import { Headline, Model } from "@gooddata/react-components";

import Page from "../components/Page";
import { useProjectId } from "../contexts/ProjectId";

const Home = () => {
    const { projectId } = useProjectId();
    return (
        <Page>
            <Headline
                primaryMeasure={Model.measure("agGujhRmcjQD").localIdentifier("m_1")}
                projectId={projectId}
            />
        </Page>
    );
};

export default Home;
