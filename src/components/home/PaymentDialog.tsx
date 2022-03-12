import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import ReactModal from 'react-modal';

interface Props {
  /** このダイアログを表示するなら true */
  isOpen: boolean;
  /** このダイアログを閉じるときのコールバック */
  onClose?: () => void;
}

interface State {
  price: number;
}

export class PaymentDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // 値の保持
    this.state = {
      price: 0
    };

    ReactModal.setAppElement('body');
  }

  // const stripe = useStripe();
  // const elements = useElements();

  // const [message setMessage] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   if (!stripe) {
  //     return;
  //   }

  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     "payment_intent_client_secret"
  //   );

  //   if (!clientSecret) {
  //     return;
  //   }

  //   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //     switch (paymentIntent.status) {
  //       case "succeeded":
  //         setMessage("お支払いが完了しました!");
  //         break;
  //       case "processing":
  //         setMessage("処理中です");
  //         break;
  //       case "requires_payment_method":
  //         setMessage("お支払いができませんでした　もう一度試してください");
  //         break;
  //       default:
  //         setMessage("問題が発生しました");
  //         break;
  //     }
  //   });
  // }, [stripe]);

  public render(): React.ReactNode {
    return <div>
      <ReactModal
        isOpen={this.props.isOpen}
        onAfterOpen={this.handleOpen}
        onRequestClose={this.handleClose}
        style={this.customStyles}
        contentLabel="Settings"
      >
        <form onSubmit={this.handleSubmit}>
          <label>
            お店が導入している決済サービスを選んでください
          </label>
        </form>
      </ReactModal>
    </div>;
  }

  // フォームのサブミット時にダイアログを閉じる
  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.handleClose();
  }

  // private handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   this.setState({price: event.target.value})
  // }

  // ダイアログが開いたときに呼び出される
  private handleOpen = () => {
    // ここで設定情報などを読み込む
  }

  // ダイアログ領域外のクリックや、ESCキーを押したときに呼び出される
  private handleClose = () => {
    // 親コンポーネントにダイアログを閉じてもらうためのコールバック通知
    this.props.onClose?.();
  }

  // スタイルのカスタマイズ
  private customStyles: ReactModal.Styles = {
    // ダイアログ内のスタイル（中央に表示）
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    },
    // 親ウィンドウのスタイル（ちょっと暗くする）
    overlay: {
      background: 'rgba(0, 0, 0, 0.2)'
    }
  }
}