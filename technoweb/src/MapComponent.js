import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import "leaflet-routing-machine";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-easybutton";
import pieton from './images/map/pieton.png';
import car from './images/map/car.png';
import './home.css';
import Commentaires_Notes from './Commentaires_Notes';
import "https://cdn.jsdelivr.net/npm/leaflet.locatecontrol/dist/L.Control.Locate.min.js";
import "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js";
var myRouter;
var tabTest = [];
const optionsV2 = { profile: "mapbox/walking" };

const createRoutineMachineLayer = (props) => {

  myRouter = L.Routing.control({
    geocoder: L.Control.Geocoder.nominatim(),
    waypoints: [
      L.latLng(43.928470611572, 2.1426000595093),
      L.latLng(43.9271, 2.14785)],

    router: L.Routing.mapbox(
      "pk.eyJ1IjoiYXplYXpkcXp6c2ppaGdocXpqa2giLCJhIjoiY2wxNTQzcnpvMGdydTNvcXpreDBmbnZxNiJ9.hKjHX7H6ZbnO4Gt0gH_sAg",
      optionsV2
    ),
  });

  return myRouter;
};
const buttonEasyV = () => {
  const buton = L.easyButton('<img src=' + car + ' style="width:100%" >', function (btn, map) {
    myRouter.getRouter().options.profile = "mapbox/driving";
    myRouter.route();
  });
  return buton;
};

const EasyleafletVoiture = createControlComponent(buttonEasyV);
const buttonEasyP = () => {
  const buton = L.easyButton('<img src=' + pieton + ' style="width:100%" > ', function (btn, map) {
    myRouter.getRouter().options.profile = "mapbox/walking";
    myRouter.route();
  });
  return buton;
};
const EasyleafletPieton = createControlComponent(buttonEasyP);

var RoutingMachine = createControlComponent(createRoutineMachineLayer);
const axios = require('axios');

const getMap = (data) => {

  try {
    for (var i = 0; i < data.length; i++) {
      tabTest.push(data[i]);
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

var afficherounon=true;
function MapComponent (r){

  function LocationMarker() {
    var map = useMap();;
    if (afficherounon){

      L.control.locate().addTo(map);
      afficherounon=false;
    }

    return null;
  }




 



  const ouvreMoi= (e) => {
    try {
      const result = axios.get(
        `/AvisGet/${e.idLieu}`
      );

      result.then((resp) =>
        setAvisTab(resp.data)
      );

    } catch (err) {
      console.log(err);
    }

    try {
      axios.post(
        `/addFrequentation/${e.intitule}`
      );
    } catch (err) {
      console.log(err);
    }
  };
 

  const markerIconMonument = new L.Icon({
    iconUrl: require('./images/map/markerMonument.png'),
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  const markerIconRestaurant = new L.Icon({
    iconUrl: require('./images/map/markerRestaurant.png'),
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
   
  });
  const markerIconHotel = new L.Icon({
    iconUrl: require('./images/map/markerHotel.png'),
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
    
  });
  getMap(r["el"]);


  const [AvisTab, setAvisTab] = useState([]);

  return <div>

    <MapContainer className="mapcontainer" >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <EasyleafletPieton />
      <EasyleafletVoiture />

      <RoutingMachine />


      <LocationMarker /> 

      {tabTest.map((city, idx) => {
        
        if ((city.caracteristque) === 'Culturel') {
          return (

              <Marker
              position={[city.lat, city.longu]}
              key={idx}
              icon={markerIconMonument}
              eventHandlers={{
                click: (e) => {
                  ouvreMoi(city)
                },
              }}

            >
              <Popup>
                <h1>{city.intitule}</h1>
                <p style={{fontSize:'14px'}}>
                  {city.descriptionLieu}

                  
                </p>
                <Commentaires_Notes resp={AvisTab} el={city.idLieu}/>
              </Popup>
            </Marker>

          );
        } else if((city.caracteristque) === 'Restaurant') {
          return (
            <Marker
            position={[city.lat, city.longu]}
            key={idx}
            icon={markerIconRestaurant}
            eventHandlers={{
              click: (e) => {
                ouvreMoi(city.idLieu)
              },
            }}

          >
            <Popup>
              <h1>{city.intitule}</h1>
              <p style={{fontSize:'14px'}}>
                {city.descriptionLieu}

                
              </p>
              <Commentaires_Notes resp={AvisTab} el={city.idLieu}/>
            </Popup>
          </Marker>

          );
        }else{
          return (
            <Marker
            position={[city.lat, city.longu]}
            key={idx}
            icon={markerIconHotel}
            eventHandlers={{
              click: (e) => {
                ouvreMoi(city.idLieu)
              },
            }}

          >
            <Popup>
              <h1>{city.intitule}</h1>
              <p style={{fontSize:'14px'}}>
                {city.descriptionLieu}

                
              </p>
              <Commentaires_Notes resp={AvisTab} el={city.idLieu}/>
            </Popup>
          </Marker>

          );
        }

      }
    )}
    </MapContainer>

  </div>;
}

export default MapComponent;

