import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Checkout from './Checkout.jsx';
import {useParams} from 'react-router-dom';

const Success = () => (
    <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-green-500">Payment Successful!</h1>
    </div>
);

const Failure = () => (
    <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Payment Failed!</h1>
    </div>
);

const App = () => {
    return (
       
        <Routes>
            <Route path="/:email" element={<Checkout />} />
            <Route path="/payment-success" element={<Success />} />
            <Route path="/payment-failure" element={<Failure />} />
        </Routes>
    );
};

export default App;