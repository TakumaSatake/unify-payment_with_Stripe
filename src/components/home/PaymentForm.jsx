import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import CheckoutForm from "./CheckoutForm";
import SelectPayment from './SelectPayment';

export default function PaymentForm() {

  return (
    <Router>
        <form id="payment-form">
          <Routes>
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/selectPayment" element={<SelectPayment />} />
          </Routes>
        </form>

    </Router> 
  );

}