import React from 'react'
import logo from  '../logo.svg'


class Welcome extends React.Component{

    render(){
        return(
            <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1> Hello word!</h1>
            
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
             
            </header>
          </div>


        )
    }
}
export default Welcome;// le rend importable ,le rendre visible pour les autres classe