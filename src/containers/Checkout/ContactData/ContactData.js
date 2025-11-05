import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";

import "./ContactData.css";

const ContactData = (props) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: "",
        },
    });

    const orderHandler = (event) => {
        event.preventDefault();
        console.log("Order placed!", props.ingredients);
        setLoading(true);
        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            customer: {
                name: "John Doe",
                address: {
                    street: "123 Main St",
                    zipCode: "12345",
                    country: "USA",
                },
                email: "johndoe@example.com",
            },
        };
        axios.post("/orders.json", order).then((response) => {
            console.log(response);
            setLoading(false);
            props.navigation("/");
        }).catch((error) => {
            console.log(error);
        });
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="ContactData">
            <h4>Enter your Contact Data</h4>
            <form onSubmit={orderHandler}>
                <input className="Input" type="text" name="name" placeholder="Your Name" />
                <input className="Input" type="email" name="email" placeholder="Your Email" />
                <input className="Input" type="text" name="street" placeholder="Street" />
                <input
                    className="Input"
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                />
                <Button btnType="Success" clicked={orderHandler} type="submit">ORDER</Button>
            </form>
        </div>
    );
};

export default ContactData;
