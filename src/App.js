import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "./store/actions/index";
import Spinner from "./components/UI/Spinner/Spinner";

const App = (props) => {
    const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
    const Orders = lazy(() => import("./containers/Orders/Orders"));
    const Auth = lazy(() => import("./containers/Auth/Auth"));
    let navigate = useNavigate();

    useEffect(() => {
        if (!props.isAuthenticated) {
            navigate("/");
        }
        props.onTryAutoSignup();
    }, []);

    return (
        <div>
            <Layout>
                {/* parent route must allow deeper matching for nested routes */}
                {props.isAuthenticated ? (
                    <Suspense fallback={<Spinner />}>
                        <Routes basepath="/react-burger-app/">
                            <Route path="/checkout/*" Component={Checkout} />
                            <Route path="/orders" Component={Orders} />
                            <Route path="/logout" Component={Logout} />
                            <Route path="/auth" Component={Auth} />
                            <Route path="/" Component={BurgerBuilder} />
                            <Route path="/" />
                        </Routes>
                    </Suspense>
                ) : (
                    <Suspense fallback={<Spinner />}>
                        <Routes basepath="/react-burger-app/">
                            <Route path="/auth" Component={Auth} />
                            <Route path="/" Component={BurgerBuilder} />
                        </Routes>
                    </Suspense>
                )}
            </Layout>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
