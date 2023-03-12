import axios from "axios"
import React from "react"
import NavBar from "./NavBar"
import { Link } from "react-router-dom"
class Home extends React.Component {
    constructor() {
        super()
        this.state = {

            pictures: [],
            search:""
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/pictures')
            .then(res => {
                this.setState({ pictures: res.data })
            }).catch(error => {
                console.log(error.response)
            });
    }
handleSearchChange = event =>{
    this.setState({search : event.target.value},function(){
        console.log(this.state)
        if(this.state.search===''){
            this.getArticle()
        }
    })
}
handleSubmit = event =>{
    event.preventDefault()
   // console.log(this.getArticle())
  this.getArticle()
}

getArticle(){
    let bodyFormData = new FormData()
    bodyFormData.set('search',this.state.search)

    axios.get(`http://127.0.0.1:8000/api/pictures?search=${this.state.search}`)
    .then(res => {
        this.setState({ pictures: res.data }, () => {
            // votre code à exécuter après la mise à jour de l'état
           //g console.log("Pictures updated: ", this.state.pictures);
        })
    }).catch(error => {
        console.log(error.response)
    });
}

    render() {
        return (
            <>
                <NavBar/>
                <div class="container my-5">
                    <div class="d-flex justify-content-center mb-5">
            <form class="form-inline my-2 my-lg-0" method="POST" onSubmit={this.handleSubmit} >
                   <input  onChange={this.handleSearchChange} class="form-control mr-sm-2" name="search" placeholder="Search a picture here.."/>
                     
                   

            </form>


                    </div>
                    <div class="row justify-content-between">
                        {
                            this.state.pictures.map((picture) =>
                                <div class="card mx-2 my-3" style={{ width: '350px' }}>
                                   <img src={`http://127.0.0.1:8000/storage/uploads/${picture.image}`} class="card-img-top" alt="..." />

                                    <div class="card-body">
                                        <h5 class="card-title">{picture.title}</h5>
                                        <p class="card-text">{picture.description}</p>
                                        <Link to={`/pictures/${picture.id}`} class="btn btn-primary">En savoir plus</Link>
                                    </div>
                                </div>

                            )
                        }

                    </div>
                </div>

            </>
        )
    }

}
export default Home;
