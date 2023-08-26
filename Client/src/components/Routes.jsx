import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";


import Confirmation from "./RecordPage/Confirmation";
import Login from "./LoginPage/Login";
import Signup from "./SignupPage/Signup";
import Record from "./RecordPage/Record";

const RoutesPath = () => {
    return(
    <BrowserRouter>
    <Routes>
        <Route path="/signup" element={<Signup />}/>      
        <Route path="/" element={<Login />}/>
        <Route path="/recorderPage" element={<Record />}/>
        <Route path="/confirmation" element={<Confirmation/>}/>
    </Routes>
    </BrowserRouter>
    )
};

export default RoutesPath;