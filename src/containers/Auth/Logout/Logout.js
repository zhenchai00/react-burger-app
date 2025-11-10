import React, { useEffect } from "react";
import * as actions from "../../../store/actions/index";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Logout = (props) => {
    let navigation = useNavigate();
    useEffect(() => {
        props.onLogout();
        navigation("/");
    }, []);
    return (
        <></>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout()),
    };
}

export default connect(null, mapDispatchToProps)(Logout);