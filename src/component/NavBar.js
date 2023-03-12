import React from "react"
import { Link } from 'react-router-dom'

class NavBar extends React.Component {

    constructor() {
        super()
        this.state = {
            token:null

        }
    }

logout=()=>{
   localStorage.setItem('token'," ");
localStorage.clear()
this.setState({token:null})
}
    
    render() {
        return (
            <div>

                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <Link class="navbar-brand" to="/">Lareact</Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto">

                                {

                                    localStorage.getItem('token')
                                        ?
                                        <>
                                        <li class="nav-item">
                                            <Link class="nav-link active" to="/picture/new">Poster une photo</Link>
                                        </li>
                                        <li class="nav-item">
                                            <button class="btn" onClick={()=>this.logout}>Deconnexion</button>
                                        </li>
                                    </>
                                    :

                                        <>

                                            <li class="nav-item">
                                                <Link class="nav-link active" to="/login">Connexion</Link>
                                            </li>
                                            <li class="nav-item">
                                                <Link class="nav-link" to="/register">Inscriptiom</Link>
                                            </li>
                                        </>
                                }

                            </ul>
                        </div>
                    </div>
                </nav>


            </div>
        )
    }
}

export default NavBar;