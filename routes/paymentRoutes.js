const { route } = require("./productRoutes");

const router = require("express").Router();
const keyStripe = process.env.KEY_STRIPE;
const stripe = require("stripe")(keyStripe);

router.get("/stripepayment", async (req, res) => {
  res.send("Strip");
});
const YOUR_DOMAIN = "http://localhost:3000/finishedpaid";
router.post("/paymentsession", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    metadata: {
      email: "erkanisuf@gmail.com",
      name: "asdfq",
      phone: "050030404",
      ebah: "analno",
    },
    shipping_address_collection: {
      allowed_countries: ["FI"],
    },
    payment_method_types: ["card"],
    line_items: req.body.products,
    mode: "payment",

    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  console.log(session);

  res.json({ id: session.id });
});

//////

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client

  const sum = items.reduce((a, b) => {
    return (
      a.price_data.unit_amount * a.quantity +
      b.price_data.unit_amount * b.quantity
    );
  });

  console.log(sum, "CALCULTATTT");
  return sum;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  console.log(items);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    info: paymentIntent,
  });
});
module.exports = router;
