import React from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { GoogleLoginButton } from "react-social-login-buttons";
import { maxWidth } from "@mui/system";
class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            redirect: false,
            errors: []

        }
    }
    componentDidMount() {
        if (localStorage.getItem('token')) {
            const email = localStorage.getItem('email');
            this.setState({ email }, () => {
                console.log(this.state);
            });
        }
    }

    handleEmailChange = event => {
        this.setState({ email: event.target.value }, () => {
            console.log(this.state)
        })
    }
    handlePasswordChange = event => {
        this.setState({ password: event.target.value }, () => {
            console.log(this.state)
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log("Inscription")
        /*
        recupere les donnees saisis dans les champs du formulaire et les
         stocke depuis un client web afin de les envoyer a un serveur via des requettes http.
         */
        let bodyFormData = new FormData()
        bodyFormData.set('email', this.state.email)
        bodyFormData.set('password', this.state.password)

        axios.post('http://127.0.0.1:8000/api/login', bodyFormData)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('token', res.data.api_token)
                this.setState({ redirect: true })
            })
            .catch(error => {
                if (error.response.status === 401) {
                    this.setState({ errors: error.response.data.errors }, () => { console.log(this.state) })

                }
            })

    }
    render() {
        if (this.state.redirect) {
            return (< Navigate to="/" />)
        }
        return (
            <>
                <NavBar />
                <div class="container w-50">
                    <h2 class="text-center my-5">Connexion</h2>
                    <form methode="POST" onSubmit={this.handleSubmit}>

                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Address Email</label>
                            <input onChange={this.handleEmailChange} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                 {this.state.errors && this.state.errors.email? <div class="text-danger">{this.state.errors['email']}</div>:""}
                        </div>

                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
                            <input onChange={this.handlePasswordChange} type="password" class="form-control" id="exampleInputPassword1" />
                            {this.state.errors && this.state.errors.email? <div class="text-danger">{this.state.errors['password']}</div>:""}
                        </div>
                          
                          {this.state.errors && this.state.errors ==='Identifiants incorectes' ? <div class="alert alert-warning">Vos identifiant sont incorect</div>:""}



                        <button type="submit" class="btn btn-primary">Connexion</button>

                       
                    </form>
                    <div>
                    <p>Pas encore de compte ? inscrit toi <Link to="/register">ici</Link></p>
                    </div>

                    <div class="d-flex justify-content-center mt-5">
                         <a href="http://127.0.0.1:8000/auth/redirect/google">
                       <GoogleLoginButton style={{maxWidth:400 , minWidth:300}}/>
                       </a>
                    </div>
                </div>
            </>
        )
    }

}
export default Login;
