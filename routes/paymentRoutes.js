const router = require("express").Router();
const keyStripe = process.env.KEY_STRIPE;
const stripe = require("stripe")(keyStripe);
const { v4: uuidv4 } = require("uuid");

const calculateOrderAmount = (items) => {
  console.log(items.length);
  const sum = items.reduce((a, b) => {
    return (
      a.price_data.unit_amount * a.quantity +
      b.price_data.unit_amount * b.quantity
    );
  });
  if (items.length > 1) {
    console.log("sum of all items", sum);
    return sum;
  } else {
    console.log("sum of one item", items[0].price_data.unit_amount);
    return items[0].price_data.unit_amount;
  }
};

router.post("/create-payment-intent", async (req, res) => {
  const { items, userinfo, cart } = req.body;
  console.log(items);
  console.log(userinfo);
  console.log(cart);

  const cartItems = cart.map((el) => {
    const newObj = {
      name: el.name,
      mongoProductID: el.id,
      color: el.color,
      user: { ...el.user[0] },
    };
    return newObj;
  });
  console.log(cartItems);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    receipt_email: userinfo.contactemail,
    metadata: {
      date: new Date(),
      cartProducts: JSON.stringify({ cartItems }),
    },
    shipping: {
      address: {
        line1: userinfo.street,
        city: userinfo.city,
        postal_code: userinfo.postcode,
      },
      tracking_number: uuidv4(),
      name: userinfo.name + "," + userinfo.surname,
      phone: userinfo.phone,
    },
  });
  console.log(paymentIntent.metadata);
  res.send({
    clientSecret: paymentIntent.client_secret,
    info: paymentIntent,
  });
});
module.exports = router;
