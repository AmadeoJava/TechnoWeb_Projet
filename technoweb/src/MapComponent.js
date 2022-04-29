import { MapContainer, TileLayer, useMap, Marker, Popup, Circle } from 'react-leaflet';
import "leaflet-routing-machine";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-easybutton";
import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import cities from "./cities.json";
import pieton from './images/map/pieton.png';
import car from './images/map/car.png';
import './home.css';

const MapComponent = () => {
  let interval = null;
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    var map = useMap();;

    useEffect(() => {

      if ("geolocation" in navigator) {
        Geolocation.getCurrentPosition(

          (position) => {
            interval = setInterval(() => {
              //console.log(position);
              setPosition([position.coords.latitude, position.coords.longitude]);
              // map.flyTo([position.coords.latitude, position.coords.longitude]);
            }, 1000);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }


        );
      }
      return () => clearInterval(interval);
    }, [map]);

    return position === null ? null : (
      <Circle
        center={position}
        position={position}
        radius={5}
        fillColor="blue"

      />

    );
  }

  var myRouter = null;
  const optionsV2 = { profile: "mapbox/walking" };




  const createRoutineMachineLayer = (props) => {
    myRouter = L.Routing.control({
      waypoints: [
        L.latLng(43.928470611572, 2.1426000595093),
        L.latLng(43.94261, 2.14822),
      ],

      router: L.Routing.mapbox(
        "pk.eyJ1IjoiYXplYXpkcXp6c2ppaGdocXpqa2giLCJhIjoiY2wxNTQzcnpvMGdydTNvcXpreDBmbnZxNiJ9.hKjHX7H6ZbnO4Gt0gH_sAg",
        optionsV2
      ),
    });
    return myRouter;
  };


  const RoutingMachine = createControlComponent(createRoutineMachineLayer);
  const buttonEasyV = () => {
    const buton = L.easyButton('<img src='+car+' style="width:100%" >', function (btn, map) {
      myRouter.getRouter().options.profile = "mapbox/driving";
      myRouter.route();
    });
    return buton;
  };

  const EasyleafletVoiture = createControlComponent(buttonEasyV);
  const buttonEasyP = () => {
    const buton = L.easyButton('<img src='+pieton+' style="width:100%" > ', function (btn, map) {
      myRouter.getRouter().options.profile = "mapbox/walking";
      myRouter.route();
    });
    return buton;
  };

  const EasyleafletPieton = createControlComponent(buttonEasyP);
  
  const markerIcon = new L.Icon({
    iconUrl: require('./images/map/markerMonument.png'),
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46], 
  });

  return <div>

    <MapContainer className= "mapcontainer" >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <EasyleafletPieton />
      <EasyleafletVoiture />

      <RoutingMachine />


      <LocationMarker />
      {cities.map((city, idx) => (
        <Marker
          position={[city.lat, city.lng]}
          key={idx}
          icon={markerIcon}
        >
          <Popup>
            <b>
              {city.city}, {city.country}
            </b>
          </Popup>
        </Marker>
      ))}
    </MapContainer>

  </div>;
}

export default MapComponent;

