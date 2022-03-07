import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./components/home/CheckoutForm";
import Tab from "./components/home/Tab";

import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51KZDPoANuuL1gmXwKF9ZcF2LxtZBENW0PGr8aZ25dbI6qTF0IMOeP6vcztbJ9ZWCBk7sroEumeIJAhjtocgAHQPj00sTWM0lEm");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      <header className="header">
        <div className="title-container">
          <h1 className="title">Unify Payment</h1>
        </div>
      </header>
      <main className="main">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </main>
      <footer className="footer">
        <Tab />
      </footer>
    </div>
  );
}