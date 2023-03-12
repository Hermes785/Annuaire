import React from "react";
import {Rings} from "react-loader-spinner"


function AppLoader() {
 
  
  return (
    <>
        <Rings
              type="Oval"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={5000}
            />
    </>
  );
}

export default AppLoader;
