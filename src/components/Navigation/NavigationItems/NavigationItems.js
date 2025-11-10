import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import './NavigationItems.css';

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticated && <NavigationItem link="/orders" exact>Orders</NavigationItem>}
        {!props.isAuthenticated ? (
            <NavigationItem link="/auth" exact>Authenticate</NavigationItem>
        ) : (
            <NavigationItem link="/logout" exact>Logout</NavigationItem>
        )}
    </ul>
);

export default navigationItems;
