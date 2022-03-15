import React from 'react';
import { useQRCode } from 'react-hook-qrcode';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentPage = () => {
    const navigate = useNavigate();

    const [inputRef] = useQRCode({
        text: 'https://google.com',
        options: {
            level: 'S',
            width: 300,
        },
    });

    const location = useLocation();
    // クエリパラメーターを取得
    const search = location.search;
    // 値だけ取り出す
    const query = new URLSearchParams(search);
  

    const home = () => {
        navigate('/checkout');
    };

    const back = () => {
        navigate(-1);
    };

    return (
        <div>
            <canvas ref={inputRef} />
            {query.get("keyword")}
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