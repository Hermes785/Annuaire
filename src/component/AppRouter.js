import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
//import Picture2 from "./Picture2";
import Picture from "./Picture";
import PostPicture from "./PostPicture";

class AppRouter extends React.Component{
    render(){
        return(
     <Routes>
        <Route  exact path="/" element={<Home/>}  />  
        <Route  path="/register" element={<Register/>}/>
        <Route  path="/login" element={<Login/>}/>
        <Route  path="/picture/new" element={<PostPicture/>}/>
        <Route  path="/pictures/:id" element={<Picture/>}/>
     </Routes>

        )
    }
}
export default AppRouter;