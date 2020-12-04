import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useElements,
  useStripe,
  CardElement,
} from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51HugH2HIfBlErhlnFlqyz57Nft2p700zznt5h5Fj0Up8rEqQgyahdB2Dw8WNjJPpxKbNngpGAsHjBnv6gIOGjXAb0064AxWTjS"
);
// {
//   "products":[{"price_data":{
//   "currency": "eur",
//    "product_data": {
//      "name": "Stubborn Attachments",
//      "images": ["https://i.imgur.com/EHyR2nP.png"]
//       },
//      "unit_amount": "2000"
//    },
//   "quantity": "1"},
//  {"price_data":{
//   "currency": "eur",
//    "product_data": {
//      "name": "ANUSSS",
//      "images": ["https://i.imgur.com/EHyR2nP.png"]
//       },
//      "unit_amount": "3500"
//    },
//   "quantity": "1"}]
//   }
const Stripe = ({ state }) => {
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
  console.log(sendToStrapiProducts);
  const handleClick = async (event) => {
    const stripe = await stripePromise;
    const response = await axios({
      url: `http://localhost:4000/api/payment/paymentsession`,
      method: "post",
      data: { products: sendToStrapiProducts },
    }).then((response) => {
      console.log(response, "After send");
      const session = response.data;
      // When the customer clicks on the button, redirect them to Checkout.
      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      }
    });
  };

  ///////////////////

  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    window
      .fetch("http://localhost:4000/api/payment/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: sendToStrapiProducts }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data, "SECZZ");
        setClientSecret(data.clientSecret);
      });
  }, [state.cart]);
  console.log(clientSecret, "SECRET CLIENT");
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    console.log(payload, "payload"); //IF PAYLOAD.STATUS === SUCCEEDED
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
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
    <div style={{ width: "500px" }}>
      <h1>Stripe</h1>
      <button onClick={handleClick}>Send To Strapi</button>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            {" "}
            Stripe dashboard.
          </a>{" "}
          Refresh the page to pay again.
        </p>
      </form>
    </div>
  );
};

export default Stripe;
