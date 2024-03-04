import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API } from "../../API/API";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import "./Descriptions.css";
import DescriptionReview from "./DescriptionReview/DescriptionReview";
import NewReview from "./NewReview/NewReview";
import {Link} from "react-router-dom";

function Descriptions() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [reloadReviews, setReloadDescription] = useState(false);
  const { id } = useParams();

  //her legger vi til admin-tilganger
  const[permission, setPermission] = useState(0);
  

  //fetch data from the server when the page starts running and set it in the state destination
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const isAdmin = await API.get('/admin');
    setPermission(isAdmin.data.permission)
    const destRes = await API.get(`/destinations/${id}`);
    if (destRes) {
      window.scrollTo(0, 0);
      setDestinations(destRes.data);
      return setLoading(false);
    }
  };


  const handleReviewSubmit = () => {
    setReloadDescription(prevState => !prevState); 
  };



  return (
    <>
      <Navbar />

      <div className="descriptionContent">
        <div className="descriptionsContainer">
          {isLoading && <Loading />}
          <h1 className="descriptionsHeader">{destinations.place}</h1>

          <h2>
            {" "}
            <span className="icon">
              <i className="fas fa-globe"></i>
            </span>
            {destinations.country}, {destinations.continent}
          </h2>
          {permission == 1?
          <Link to={`/editdestination/${id}`} className="destAnchor">
          <button>Rediger 
          </button>
          </Link>
          :null} 
        </div>
        <div className="column-container">
          <div className="labels">
            <h3 className="destinationHeader">Egenskaper:</h3>
            <ul className="destinationLabels">
              {destinations?.labels?.map((destinationLabel) => (
                <li className="label" key={destinationLabel}>{destinationLabel}</li>
              ))}
            </ul>
          </div>

          <div className="descriptionContainer">
            <h3 className="descriptionHeader">Beskrivelse:</h3>
            <p className="descriptionsText">{destinations.description}</p>
          </div>

          <div></div>
        </div>
        <NewReview destinationId={destinations._id} onReviewSubmit={handleReviewSubmit}/>
        <DescriptionReview destinationId={destinations._id} key={reloadReviews} />
      </div>

      <Footer />
    </>
  );
}

export default Descriptions;
