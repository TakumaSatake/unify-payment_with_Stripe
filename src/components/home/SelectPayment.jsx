import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const SelectPayment = () => {
  const { register, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const move = () => {
    navigate('/payment-page');
  };
  const back = () => {
    navigate(-1);
  };

  return (
    <>
      <p>どの決済サービスを使いますか？</p>
      <p>お店で使える決済サービスを選んでください</p>
      <label>
      <select {...register("category")}>
        <option value="">Select...</option>
        <option value="A">Pay A</option>
        <option value="B">Pay B</option>
      </select>
      </label>
      <button type="button" onClick={move}>
        決定
      </button>
      <button type="button" onClick={back}>
        戻る
      </button>
    </>
  );
};

export default SelectPayment;