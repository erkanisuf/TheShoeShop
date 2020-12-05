import React, { useEffect, useState } from "react";
import { REMOVE_ALL_CART } from "../../Context/reducers";
import { useHistory, useLocation } from "react-router-dom";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import "./Stripe.css";

const Stripe = ({ state, dispatch }) => {
  const history = useHistory();
  const sendToStrapiProducts = state.cart.map((el) => {
    const newArr = {
      price_data: {
        currency: "eur",
        product_data: {
          name: el.name,
          images: el.image.map((element) => {
            return `http://localhost:4000/uploads/${element.filename}`;
          }),
        },
        unit_amount: el.price * 100,
      },
      quantity: el.quantity,
    };
    return newArr;
  });

  ///////////////////

  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [mongoWaiter, setmongoWaiter] = useState(null);
  console.log(mongoWaiter);
  useEffect(() => {
    window
      .fetch("http://localhost:4000/api/payment/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: sendToStrapiProducts,
          userinfo: state.user.adress,
          cart: state.cart,
          typeUser: state.user,
        }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data, "Data From Stripe (not succ yet)");
        const waiter = {
          ...JSON.parse(data.info.metadata.cartProducts),
          ...JSON.parse(data.info.metadata.typeUser),
        };
        setmongoWaiter({ ...waiter });
        setClientSecret(data.clientSecret);
      });
  }, [state.cart, state.user.adress]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    console.log(payload, "payload");
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      const objtoMongoOders = {
        ...mongoWaiter,
        ...payload.paymentIntent.shipping,
        dateofsucc: payload.paymentIntent.created,
        receipt_email: payload.paymentIntent.receipt_email,
        amount: payload.paymentIntent.amount,
      }; ///////////This goes to mongo If succes
      console.log("ifSUCCCCC", objtoMongoOders);
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      history.push({
        pathname: "/finishedpaid",

        state: { detail: objtoMongoOders },
      });
    }
  };
  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",

        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  return (
    <div>
      <h1>Stripe</h1>
      {/* <button onClick={handleClick}>Send To Strapi</button> */}
      <form id="payment-form" onSubmit={handleSubmit} className="Stripeform">
        <CardElement
          className="Stripeinput "
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
          name
        />
        <button
          disabled={processing || disabled || succeeded}
          id="submit"
          className={succeeded ? "StripebuttonGreen" : "Stripebutton"}
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              `${succeeded ? "Paid" : "Pay"}`
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        {succeeded && <p>Succsesfully paid !</p>}
      </form>
    </div>
  );
};

export default Stripe;
