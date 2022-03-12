const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51KZDPoANuuL1gmXwia2CleLj3NygPk2jZ492AdtmuD6yOF5vpc6DUcEokuSISfvpHK9tnSTZ9RBUtbAOuhPvDy34002UKiWHVw');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // 顧客の支払いライフサイクルを追跡し、支払いの試行失敗があった場合にはその記録を残して
  // 顧客への請求に重複が発生しないようにする。
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));