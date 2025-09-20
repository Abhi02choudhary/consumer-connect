import { useState } from 'react';
import axios from 'axios';
import Receipt from './Receipt';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [txnId, setTxnId] = useState('');
  const [status, setStatus] = useState('');
  const [done, setDone] = useState(false);

  const handlePayment = async () => {
    const res = await axios.post('http://localhost:5005/api/payment/initiate', { amount });
    setQrUrl(res.data.qr_url);
    setTxnId(res.data.txn_id);

    const interval = setInterval(async () => {
      const check = await axios.post('http://localhost:5005/api/payment/check', { txn_id: res.data.txn_id });
      if (check.data.status === 'SUCCESS') {
        clearInterval(interval);
        setStatus('Payment Successful');
        setDone(true);
      }
    }, 3000);
  };

  if (done) return <Receipt amount={amount} txnId={txnId} />;

  return (
    <div>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount" />
      <button onClick={handlePayment}>Pay Now</button>
      {qrUrl && <img src={qrUrl} alt="Scan QR" style={{ marginTop: '20px' }} />}
      <p>{status}</p>
    </div>
  );
};

export default PaymentForm;