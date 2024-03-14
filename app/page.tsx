'use client'
import { useEffect, useRef, useState } from 'react';
import { FaGlobeAfrica } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoiYWVzY29iYWwiLCJhIjoiY2x0ZHFkZ2doMDY5NjJqbjlkMXBjdGJpbyJ9.qib_FZFlBTBcFxccxb8_jA';

const pharmacies = [
  { name: "Medicare Pharmacy", address: "Suite 547 1930 Bernhard Ways, East Cordelia, KY 42881-4359", zipcode: 42881, coordinates: [-73.7562, 42.6526] },
  { name: "Healthplus Pharmacy", address: "1278 Rocio Estates, South Mariellemouth, MN 57617", zipcode: 57617, coordinates: [-73.755, 42.653] },
  { name: "Pharma Choice", address: "Apt. 780 573 Karma Row, Port Denis, CO 47687", zipcode: 47687, coordinates: [-73.754, 42.654] },
];

export default function Home() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
 // Inside the component
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapContainer.current && !map) {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-73.7562, 42.6526], // New York (Albany)
        zoom: 15
      });
      
      // Add geocoder control
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Search for a location'
      });
  
      // Add geocoder to the upper right corner
      newMap.addControl(geocoder, 'top-right');
  
      // Add zoom in and zoom out controls
      newMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  
      // Add markers for pharmacies
      pharmacies.forEach(pharmacy => {
        const [lng, lat] = pharmacy.coordinates;
        const popup = new mapboxgl.Popup().setHTML(`<h3>${pharmacy.name}</h3><p>${pharmacy.address}</p>`);
        new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(newMap);
      });
  
      setMap(newMap);
    }
    
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title h4">Book Your Appointment</h5>
          <p className="card-text text-secondary">Your local pharmacy + MakoRx Care Connect work together to provide you special services and testing.</p>
          <hr />
         
          <div ref={mapContainer} className="map">
            <div className="cards-container">
              {pharmacies.map((pharmacy, index) => (
                <div key={index} className="pharmacy-card">
                  <div className="card-header h6 m-0">{pharmacy.name}</div>
                  <div className="card-body">
                    <p style={{fontSize: 15}}>{pharmacy.address}</p>
                    <button type="button" className="btn btn-primary btn-sm">See Services Offered</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        < hr />
         <div className="card-body">
      
      
        <div className="row">
    <div className="col-sm-12 col-md-6 col-lg-4">
    <p className="card-text text-secondary">Selected Pharmacy</p>
       
    <div className="card">
  <img src="https://placehold.co/300x150/png" className="card-img-top" alt="dummy image" />
  <div className="card-body">
    <h5 className="card-title">Medicare Pharmacy</h5>
    <p className="card-text">Suite 547 1930 Bernhard Ways, East Cordelia, KY 42881-4359</p>
    <h6 className="card-subtitle mb-2 "><span style={{color: '#919191'}}>Areas Served:</span> Davidson and nearby areas</h6>
    <h6 className="card-subtitle mb-2 "><span style={{color: '#919191'}}>Hours:</span> Closed - Opens 9 AM</h6>
    <h6 className="card-subtitle mb-2"><span style={{color: '#919191'}}>Phone:</span> +1 7-4-658-9870</h6>
    < br />
    <h5><span className="badge bg-primary font-size-20 " style={{marginRight: 5}}><FaGlobeAfrica style={{marginRight: 5}}/>Website</span><span className="badge bg-primary"><IoCall style={{marginRight: 5}}/>Call</span></h5>
  </div>
</div>
    </div>
    <div className="col-sm-12 col-md-6 col-lg-8">
    <p className="card-text text-secondary">Medicare Pharmacy</p>
    <h5 className="card-title">Available Test & Services</h5>   
    <div className="row">
    {[...Array(6)].map((_, index) => (
        <div className="col-sm-6 col-md-6 col-lg-4 mt-3" key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Services {index + 1}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Services Subtitle</h6>
              <p className="card-text">Services Description</p>
            </div>
          </div>
        </div>
      ))}
      </div>    
    </div>
  </div>
        </div>
      </div>

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 40px;
          width: 100%;
        }

        .card {
          width: 100%;
          }

        .map {
          position: relative;
          width: 100%;
          height: 500px;
          background-color: lightgray;
          padding: 20px;
        }

        .cards-container {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 1;
        }

        .pharmacy-card {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          max-width: 300px;
        }

        .card-header {
          font-weight: bold;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}


