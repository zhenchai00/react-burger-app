import React from "react";

import "./NavigationItem.css";
import { NavLink } from "react-router";

const navigationItem = (props) => (
    <li className="NavigationItem">
        <NavLink to={props.link} className={props.active ? "active" : ""} exact={props.exact}>
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;
