import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';


export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("お支払いが完了しました!");
          break;
        case "processing":
          setMessage("少し待っててください");
          break;
        case "requires_payment_method":
          setMessage("ごめんなさい、お支払いできませんでした...　もう一度試してみてください");
          break;
        default:
          setMessage("問題が発生しました");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    // 支払い完了後にStripeがユーザーをリダイレクトする場所を渡す。
    // 認証が必要な支払いの場合、
    // Stripe は 3D セキュア認証のためのモーダルを表示するか、
    // 支払い方法に応じて顧客を認証ページにリダイレクトする。
    // 認証プロセス完了後、return_urlへリダイレクトされる
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/",
      },
    });

    // 即時エラーの処理
    // カード情報等が拒否された時などに、エラーを返す
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);

  };

  return (
    <div onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "お支払い"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </div>
  );

}