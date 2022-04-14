import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import "leaflet-routing-machine";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-easybutton";
import React,{useEffect,useState} from 'react';

import cities from "./cities.json";


const MapComponent = () => {
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    var map= useMap();;
   
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        /*map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
        */
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>
          You are here. <br />
        </Popup>
      </Marker>
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
    const buton = L.easyButton('<img src="pic.png">', function (btn, map) {
      myRouter.getRouter().options.profile = "mapbox/driving";
      myRouter.route();
    });
    return buton;
  };
  const EasyleafletVoiture = createControlComponent(buttonEasyV);
  const buttonEasyP = () => {
    const buton = L.easyButton('<img src="pic.png">', function (btn, map) {
      myRouter.getRouter().options.profile = "mapbox/walking";
      myRouter.route();
    });
    return buton;
  };

  const EasyleafletPieton = createControlComponent(buttonEasyP);

  return <div>

    <MapContainer style={{ width: '1080px', height: '620px' }}>
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

