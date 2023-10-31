import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState} from "react";
import './details.css';

function Details() {
    const { id } = useParams();
    const [brewery, setBrewery] = useState(null);
    
    useEffect (() => {
        fetch(`https://api.openbrewerydb.org/breweries/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setBrewery(data);
        });
    }, [id]);

    if (!brewery) {
        return <div>Loading...</div>;
    }

    return (
        <div className="detail-holder"> 
            <h1>{brewery.name}</h1>
            <p>{brewery.latitude} {brewery.longitude}</p>
            <p>Type: {brewery.brewery_type}</p>
            <p>Address: {brewery.address_1} {brewery.postal_code} {brewery.city}, {brewery.state_province}, {brewery.country}</p>
            <p>Phone: {brewery.phone}</p>
            <p>Website: {brewery.website_url}</p>
        </div>
    );
}

export default Details;
