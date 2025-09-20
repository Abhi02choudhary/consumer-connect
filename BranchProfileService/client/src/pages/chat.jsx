// import  CustomerChat from "consumer-chat-service/client/src/pages/CustomerChat";
// import CustomerChat from "../../../../Chat service/client/src/pages/CustomerChat";
import { CustomerChat } from "../../node_modules/consumer-chat-service/client/src/pages/CustomerChat";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
export default function Chat(){
    return(
        <Routes>
       <Route path="/customer/:chatID" element={<CustomerChat className=" w-full"/>}/>
       </Routes>
    )
}