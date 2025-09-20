import PaymentForm from './components/PaymentForm';
import QRCode from "react-qr-code";

<QRCode value="upi://pay?pa=merchant-vpa@upi&pn=Merchant&am=100&cu=INR" />

function App() {
  return (
    <div className="App">
      <h1>UPI Payment</h1>
      <PaymentForm />
    </div>
  );
}

export default App;