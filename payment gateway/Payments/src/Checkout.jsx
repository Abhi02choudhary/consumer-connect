import React from "react";
import axios from 'axios';
import {useState, useEffect} from 'react';

  const path = window.location.pathname; // e.g., "/dhruvishah116122@gmail.com"
  const email = path.substring(1); // remove the leading "/"

const Checkout = () =>{
    const [isProcessing, setIsProcessing] = useState(false);
    const handlePayment = async()=>{
        // setIsProcessing(true);
        const data={
            name:"Dhruvi shah",
            email:email,
            amount:1000,
            mobileNumber:"9999999999",
        }
        try{
        const response = await axios.post('http://localhost:8085/create-order',data)
        // setIsProcessing(false);
        window.location.href = response.data.url;
        }catch(err){
        console.log(err)
        }
        }
    
    return (
        <div style={{
            margin: 0,
            padding: 0,
            height: '100%',
            fontFamily: 'Arial, sans-serif',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              background: 'linear-gradient(135deg, #5933aa 0%, #473190 100%)',
              color: 'white',
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
                width: '320px',
              }}>
                <svg style={{
                  width: '120px',
                  marginBottom: '15px',
                }} viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M75.5 15H44.5C41.5 15 39 17.5 39 20.5V59.5C39 62.5 41.5 65 44.5 65H75.5C78.5 65 81 62.5 81 59.5V20.5C81 17.5 78.5 15 75.5 15Z" fill="#5933AA"/>
                  <path d="M60 52.5C66.9036 52.5 72.5 46.9036 72.5 40C72.5 33.0964 66.9036 27.5 60 27.5C53.0964 27.5 47.5 33.0964 47.5 40C47.5 46.9036 53.0964 52.5 60 52.5Z" fill="white"/>
                  <path d="M57 36L63 40L57 44V36Z" fill="#5933AA"/>
                  <path d="M102 31H95V49H102V31Z" fill="#5933AA"/>
                  <path d="M110 31H103V49H110V31Z" fill="#5933AA"/>
                  <path d="M118 31H111V49H118V31Z" fill="#5933AA"/>
                  <path d="M133 31H126V49H133V31Z" fill="#5933AA"/>
                  <path d="M148 31H141V49H148V31Z" fill="#5933AA"/>
                  <path d="M163 31H156V49H163V31Z" fill="#5933AA"/>
                  <path d="M178 31H171V49H178V31Z" fill="#5933AA"/>
                  <path d="M193 31H186V49H193V31Z" fill="#5933AA"/>
                  <path d="M208 31H201V49H208V31Z" fill="#5933AA"/>
                  <path d="M223 31H216V49H223V31Z" fill="#5933AA"/>
                  <path d="M238 31H231V49H238V31Z" fill="#5933AA"/>
                  <path d="M95 22H238V26H95V22Z" fill="#5933AA"/>
                  <path d="M95 54H238V58H95V54Z" fill="#5933AA"/>
                </svg>
                
                <h1 style={{
                  color: '#333',
                  marginBottom: '20px',
                  fontSize: '24px',
                }}>Complete Your Payment</h1>
                
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#333',
                  margin: '25px 0',
                }}>₹1,000.00</div>
                
                <button 
                  onClick={handlePayment}
                  style={{
                    backgroundColor: '#5933aa',
                    border: 'none',
                    color: 'white',
                    padding: '12px 30px',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease, transform 0.2s ease',
                    width: '100%',
                    marginTop: '20px',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#4a2b92';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#5933aa';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(1px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                >
                  Pay Now
                </button>
                
                <div style={{
                  fontSize: '12px',
                  color: '#666',
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ marginRight: '5px', fontSize: '14px' }}>🔒</span> 
                  Secure Payment
                </div>
              </div>
            </div>
            
            {isProcessing && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 999,
              }}>
                <div style={{
                  border: '5px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  borderTop: '5px solid white',
                  width: '50px',
                  height: '50px',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '20px',
                }} />
                <p style={{ color: 'white', fontSize: '18px' }}>Processing Payment...</p>
                
                <style>
                  {`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}
                </style>
              </div>
            )}
          </div>
    )
}
export default Checkout;