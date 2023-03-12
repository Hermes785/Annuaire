import React from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { Navigate } from 'react-router-dom';

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            redirect:false
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

    handleNameChange = event => {
        this.setState({ name: event.target.value }, () => {
            console.log(this.state)
        })
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
    handleConfirmpasswordChange = event => {
        this.setState({ confirm_password: event.target.value }, () => {
            console.log(this.state)
        })
    }
handleSubmit= event=>{
    event.preventDefault()
    console.log("Inscription")
/*
recupere les donnees saisis dans les champs du formulaire et les
 stocke depuis un client web afin de les envoyer a un serveur via des requettes http.
 */
let bodyFormData= new FormData()
bodyFormData.set('name',this.state.name)
bodyFormData.set('email',this.state.email)
bodyFormData.set('password',this.state.password)
bodyFormData.set('confirm_password',this.state.confirm_password)

axios.post('http://127.0.0.1:8000/api/register',bodyFormData)
.then(res=>{
    console.log(res.data)
    localStorage.setItem('token',res.data.api_token)
    this.setState({redirect:true})
})
.catch(error=>{
  console.log(error.response)
})

}


    render() {
        if(this.state.redirect){
            return  (< Navigate to="/"/>)
        }
        return (
            <>
                <NavBar />
                <div class="container w-50">
                    <h2 class="text-center my-5">Inscriptiom</h2>
                    <form methode="POST" onSubmit={this.handleSubmit}>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Nom</label>
                            <input onChange={this.handleNameChange} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>

                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Address Email</label>
                            <input onChange={this.handleEmailChange} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
                            <input onChange={this.handlePasswordChange} type="password" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Comfirmation du mot de passe</label>
                            <input onChange={this.handleConfirmpasswordChange} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        
                        </div>
                        <button type="submit" class="btn btn-primary">Je m'inscrit</button>
                    </form>

                </div>
            </>
        )
    }

}
export default Register;
