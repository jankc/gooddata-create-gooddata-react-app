import React from "react";

import "@gooddata/react-components/styles/css/main.css";
import { AuthProvider } from "./contexts/Auth";
import AppRouter from "./routes/AppRouter";
import { ProjectListProvider } from "./contexts/ProjectList";
import { ProjectIdProvider } from "./contexts/ProjectId";

function App() {
    return (
        <AuthProvider>
            <ProjectListProvider>
                <ProjectIdProvider>
                    <AppRouter />
                </ProjectIdProvider>
            </ProjectListProvider>
        </AuthProvider>
    );
}

export default App;
