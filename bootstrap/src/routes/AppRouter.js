import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "@gooddata/react-components/styles/css/main.css";

import Login from "./Login";
import Logout from "./Logout";

import styles from "./AppRouter.module.scss";
import Welcome from "./Welcome";
import ProjectRouter from "./ProjectRouter";

// Uncomment these lines if you want to redirect unauthorized users to login form
// import { useAuth } from "../contexts/Auth";
// const RedirectIfNotLoggedIn = () => {
//     const auth = useAuth();
//     const user = auth.data;
//     const isLoading = auth.isLoading;
//     const shouldRedirectToLogin = !isLoading && !user;
//     return shouldRedirectToLogin ? <Route component={() => <Redirect to="/login" />} /> : null;
// };

const AppRouter = () => {
    return (
        <div className={styles.AppRouter}>
            <Router>
                <Switch>
                    <Route exact path="/welcome" component={Welcome} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />
                    {/* Uncomment the next line if you want to redirect unauthorized users to login form */}
                    {/* <RedirectIfNotLoggedIn /> */}
                    <Route path="/project/:projectId">
                        <ProjectRouter />
                    </Route>
                    {/* DELETE THIS LINE */} <Redirect to="/welcome" />
                </Switch>
            </Router>
        </div>
    );
};

export default AppRouter;
