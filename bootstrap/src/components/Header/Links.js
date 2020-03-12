import React from "react";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useProjectId } from "../../contexts/ProjectId";

const Links = () => {
    const { projectId } = useProjectId();

    return (
        <>
            <NavLink
                to="/welcome"
                className={cx(styles.Link, "s-welcome-link")}
                activeClassName={styles.LinkActive}
            >
                Welcome
            </NavLink>
            {projectId && (
                <NavLink
                    to={`/project/${projectId}/`}
                    className={styles.Link}
                    activeClassName={styles.LinkActive}
                    exact
                >
                    Home
                </NavLink>
            )}
        </>
    );
};

export default Links;
