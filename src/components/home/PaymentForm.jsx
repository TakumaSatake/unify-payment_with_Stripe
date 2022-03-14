import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import CheckoutForm from "./CheckoutForm";
import SelectPayment from "./SelectPayment";
import PaymentPage from "./PaymentPage";

export default function PaymentForm() {

  return (
    <Router>
        <form id="payment-form">
          <Routes>
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/select-payment" element={<SelectPayment />} />
            <Route path="/payment-page" element={<PaymentPage />} />
          </Routes>
        </form>

    </Router> 
  );

}