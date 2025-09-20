const Receipt = ({ amount, txnId }) => {
    return (
      <div>
        <h2>Payment Receipt</h2>
        <p>Transaction ID: {txnId}</p>
        <p>Amount Paid: ₹{amount}</p>
        <p>Status: SUCCESS</p>
        <p>Date: {new Date().toLocaleString()}</p>
      </div>
    );
  };
  
  export default Receipt;
  