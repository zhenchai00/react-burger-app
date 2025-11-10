import React, { useEffect, useState } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = (props) => {
    const [controls, setControls] = useState({
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Mail Address",
            },
            value: "",
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                placeholder: "Password",
            },
            value: "",
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false,
        },
    });
    const [isSignup, setIsSignup] = useState(true);
    let navigate = useNavigate();

    const checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    };

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    controls[controlName].validation
                ),
                touched: true,
            },
        };
        setControls(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup);
    };

    const switchAuthModeHandler = () => {
        setIsSignup((prevState) => !prevState);
    };

    // if (props.error) {
    //     return <p>{props.error.message}</p>;
    // }
    useEffect(() => {
        if (props.buildingBurger === false && props.authRedirectPath !== "/") {
            props.onSetRedirectPath();
        }
        if (props.isAuthenticated) {
            navigate(props.authRedirectPath);
        }
    },[]);

    return (
        <div className="Auth">
            {props.error && <p>{props.error.message}</p>}
            {props.loading ? (
                <Spinner />
            ) : (
                <>
                    <form onSubmit={submitHandler}>
                        {Object.keys(controls).map((key) => (
                            <Input
                                key={key}
                                elementType={controls[key].elementType}
                                elementConfig={controls[key].elementConfig}
                                value={controls[key].value}
                                invalid={!controls[key].valid}
                                shouldValidate={controls[key].validation}
                                touched={controls[key].touched}
                                changed={(event) => {
                                    inputChangedHandler(event, key);
                                }}
                            />
                        ))}
                        <Button btnType="Success" type="submit">
                            SUBMIT
                        </Button>
                    </form>
                    <Button btnType="Danger" clicked={switchAuthModeHandler}>
                        SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
                    </Button>
                </>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) =>
            dispatch(actions.auth(email, password, isSignup)),
        onSetRedirectPath: () =>
            dispatch(actions.setAuthRedirectPath("/")),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
