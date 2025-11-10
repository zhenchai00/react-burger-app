import React, { use, useState } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import "./ContactData.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

const ContactData = (props) => {
    const orderForm = {
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Your Name",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: true,
        },
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Your Email",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: true,
        },
        street: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Street",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: true,
        },
        zipCode: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "ZIP Code",
            },
            value: "",
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
            },
            valid: true,
        },
        country: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Country",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: true,
        },
        deliveryMethod: {
            elementType: "select",
            elementConfig: {
                options: [
                    { value: "fastest", displayValue: "Fastest" },
                    { value: "cheapest", displayValue: "Cheapest" },
                ],
            },
            value: "fastest",
            // validation: {},
            valid: false,
        },
    };
    const [formData, setFormData] = useState(orderForm);
    const [formIsValid, setFormIsValid] = useState(false);


    const orderHandler = (event) => {
        event.preventDefault();
        const data = {};
        for (let formElementIdentifier in formData) {
            data[formElementIdentifier] = formData[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: data,
            userId: props.userId,
        };
        props.onOrderBurger(order, props.token);
    };

    const checkValidity = (value, rules = {}) => {
        // if no rules provided, consider the field valid
        let isValid = true;
        if (!rules) return true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormData = {
            ...formData,
        };
        const updatedFormElement = {
            ...updatedFormData[inputIdentifier],
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedFormData[inputIdentifier] = updatedFormElement;

        let formValid = true;
        for (let inputId in updatedFormData) {
            formValid = updatedFormData[inputId].valid && formValid;
        }
        setFormIsValid(formValid);
        setFormData(updatedFormData);
    };

    // build form elements from state so updates are reflected in the UI
    const formElementsArray = [];
    for (let key in formData) {
        formElementsArray.push({
            id: key,
            config: formData[key],
        });
    }

    if (props.loading) {
        return <Spinner />;
    }

    return (
        <div className="ContactData">
            <h4>Enter your Contact Data</h4>
            <form onSubmit={orderHandler}>
                {formElementsArray.map((formElement) => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) =>
                            inputChangedHandler(event, formElement.id)
                        }
                    />
                ))}
                <Button
                    btnType="Success"
                    clicked={orderHandler}
                    type="submit"
                    disabled={!formIsValid}
                >
                    ORDER
                </Button>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
