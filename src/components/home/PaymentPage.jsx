import React from 'react';
import { useQRCode } from 'react-hook-qrcode';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const navigate = useNavigate();

    const [inputRef] = useQRCode({
        text: 'https://google.com',
        options: {
            level: 'S',
            margin: 7,
            scale: 1,
            width: 300,
        },
    });

    const home = () => {
        navigate('/checkout');
    };

    const back = () => {
        navigate(-1);
    };

    return (
        <div>
            <canvas ref={inputRef} />
            <button type="button" onClick={home}>
              ホームへ
            </button>
            <button type="button" onClick={back}>
              戻る
            </button>
        </div>
    );
};

export default PaymentPage;