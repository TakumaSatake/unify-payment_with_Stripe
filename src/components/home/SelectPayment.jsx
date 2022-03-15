import React, { useRef }  from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const SelectPayment = () => {
  const { register } = useForm()
  const navigate = useNavigate();
  const payment = useRef<HTMLInputElement>("");

  const onClick = () => {
    navigate('/payment-page');
  }

  const back = () => {
    navigate(-1);
  };

  return (
    <>
      <label htmlFor='payment'>お店で使える決済サービスを選んでください</label>
      <select
        {...register('payment', {
          required: '* 決済サービスを選んでください'
        })} 
      >
        <option value='' hidden>決済サービスを選択...</option>
        <option value='payA'>Pay A</option>
        <option value='payB'>Pay B</option>
      </select>

      <button type="submit" onClick={onClick}>
        決定
      </button>
      <button type="button" onClick={back}>
        戻る
      </button>
    </>
  );
};

export default SelectPayment;