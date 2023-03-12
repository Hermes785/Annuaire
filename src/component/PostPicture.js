import React from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { Navigate } from "react-router-dom";

class PostPicture extends React.Component {

    constructor() {
        super()
        this.state = {
            title:'',
            description:'',
            image:'',
            status:'',
            redirect:''

        }
    }

    handletitleChange = event => {
        this.setState({ title: event.target.value }, () => {
            console.log(this.state)
        })
    }
    handledescriptionChange = event => {
        this.setState({ description: event.target.value }, () => {
            console.log(this.state)
        })
    }
    handleimageChange = event => {
       
        this.setState({ image: event.target.files[0] }, () => {
            console.log(this.state)
        })
    }
    handleSubmit = event => {
        event.preventDefault()
        /*
        recupere les donnees saisis dans les champs du formulaire et les
         stocke depuis un client web afin de les envoyer a un serveur via des requettes http.
         */
        let bodyFormData = new FormData()
        bodyFormData.set('title', this.state.title)
        bodyFormData.set('description', this.state.description)
        bodyFormData.set('image', this.state.image)

let headers={
    headers:{
        'API_TOKEN':localStorage.getItem('token')
    }
}

        axios.post('http://127.0.0.1:8000/api/postpictures', bodyFormData, headers)
            .then(res => {
                console.log(res)
            //   localStorage.setItem('token', res.data.api_token)
              //  this.setState({ redirect: true })
            })
            .catch(error => {
               if (error.response.status === 401) {
                    this.setState({ errors: error.response.data.errors }, () => { 
                        console.log(this.state) })

                }
                console.log(error.response)
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
                    <h2 class="text-center my-5">Ajouter une nouvelle photo</h2>
                    <form method="POST" onSubmit={this.handleSubmit} encType="multipart/from-data">

                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Titre</label>
                            <input onChange={this.handletitleChange} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            {this.state.errors && this.state.errors.title ? <div class="text-danger">{this.state.errors['title']}</div> : ""}
                        </div>

                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Description</label>
                            <textarea onChange={this.handledescriptionChange} type="text" class="form-control" id="exampleInputPassword1" ></textarea>
                            {this.state.errors && this.state.errors.description ? <div class="text-danger">{this.state.errors['description']}</div> : ""}
                        </div>

                       

                        <div class="mb-3">
                            <label for="formFile" class="form-label">Default file input example</label>
                            <input onChange={this.handleimageChange} class="form-control" type="file" id="formFile"/>
                            {this.state.errors && this.state.errors.image ? <div class="text-danger">{this.state.errors['image']}</div> : ""}
                        </div>
                        <button onChange={this.handleSubmit} type="submit" class="btn btn-primary">Ajouter</button>
                    </form>

                </div>
            </>
        )
    }
}

export default PostPicture;