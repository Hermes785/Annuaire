import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import AppLoader from "./AppLoader";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';

function Picture() {
  // On utilise useParams pour récupérer l'ID de l'image dans l'URL
  const { id } = useParams();
  
  // On utilise useState pour stocker l'image récupérée depuis l'API
  const [picture, setPicture] = useState({});
  
  // On prépare les headers de la requête API avec le token stocké dans le local storage
  const headers = {
    headers: {
      API_TOKEN: localStorage.getItem("token"),
    },
  };
  
  // On utilise useEffect pour exécuter la requête API au chargement du composant
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/pictures/show/${id}`, headers)
      .then(res => {
        // On met à jour le state avec les données de l'image récupérées depuis l'API
        setPicture(res.data);
        
        // On appelle la fonction checkLite() pour vérifier si l'utilisateur a aimé cette image
        checkLite();
      })
      .catch(error => {
        console.log(error.response);
      });
  }, [id]);

  // Cette fonction permet de vérifier si l'utilisateur a aimé cette image
  function checkLite() {
    axios
      .get(`http://127.0.0.1:8000/api/pictures/showlike/${id}`, headers)
      .then((res) => {
        // On met à jour le state de l'image en ajoutant une propriété "liked"
        setPicture(prevPicture => ({ ...prevPicture, liked: res.data.liked }));
        
        // On appelle la fonction handleLike() ici
        handleLike();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  
  // Cette fonction permet de gérer le clic sur le bouton "J'aime" et de mettre à jour l'état de l'image en conséquence
  function handleLike() {
    if (picture.liked) {
      axios
        .delete(`http://127.0.0.1:8000/api/pictures/handlelike/${id}`, headers)
        .then((res) => {
          // On met à jour l'état de l'image en changeant la propriété "liked" à false
          setPicture(prevPicture => ({ ...prevPicture, liked: false }));
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      axios
        .post(`http://127.0.0.1:8000/api/pictures/handlelike/${id}`, {}, headers)
        .then((res) => {
          // On met à jour l'état de l'image en changeant la propriété "liked" à true
          setPicture(prevPicture => ({ ...prevPicture, liked: true }));
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }
  
  return (
    <>
      <NavBar />
      <div className="container my-5">
        {
          picture && picture.user
            ?
            <div class="row">
              <div class="col-5">
                <div className="card mx-2 my-3" style={{ width: "350px" }}>
                  <img class="img-fluid"
                    src={`http://127.0.0.1:8000/storage/uploads/${picture.image}`}
                    className="card-img-top"
                    alt="..."
                  />
                </div>
              </div>
              <div class="col-sm-4">
                <div class="author">
                  <h3></h3>
                  <h2 className="card-title">{picture.title}</h2>
                  <p className="card-text">{picture.description}</p>
                  <h2>Autheur:<span class="badge bg-secondary"> {picture.user.name}</span></h2>
                 {
                  picture.liked
                   ?
                   <>
                   <FavoriteBorderIcon  onClick={handleLike} /> J'aime 
                   </>
                  :
                  <><FavoriteIcon  onClick={handleLike}/> 
                  </>
                   }
                 
                </div>
              </div>
            </div>
            :
            <div class="d-flex justify-content-center">
              <AppLoader />
            </div>
        }
      </div>
    </>
  );
  
}

export default Picture;
