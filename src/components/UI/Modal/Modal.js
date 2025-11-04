import React, { Component } from "react";
import Backdrop from "../Backdrop/Backdrop";

import "./Modal.css";

class Modal extends Component {
    // this could be functional component, doesn't have to be a class
    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.show !== this.props.show
        );
    }

    componentDidUpdate() {
        console.log("[Modal] DidUpdate");
    }

    render() {
        return (
            <>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modelClosed}
                />
                <div
                    className="Modal"
                    style={{
                        transform: this.props.show
                            ? "translateY(0)"
                            : "translateY(-100vh)",
                        opacity: this.props.show ? "1" : "0",
                    }}
                >
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default Modal;
