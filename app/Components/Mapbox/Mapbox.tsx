"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { duration } from "moment";
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";


function FlyToActiveCity({ activeCityCoords }: { activeCityCoords: { lat: number; lon: number } }) {
  const map =useMap();

  useEffect(() => {
    if(activeCityCoords) {
      const zoomLev =13;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo([activeCityCoords.lat, activeCityCoords.lon],zoomLev, flyToOptions);
    }
  }, [activeCityCoords, map]);

  return null;
}


function Mapbox() {
  const { forecast } = useGlobalContext();

  const activeCityCoords =forecast?.coord;

  if(!forecast || !activeCityCoords) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  // console.log(activeCityCoords)

  return <div className="flex-1 basis-[50%] border rounded-lg">
    <MapContainer
      center={[activeCityCoords.lat, activeCityCoords.lon]}
      zoom={13}
      scrollWheelZoom={false}
      className="rounded-lg m-4"
      style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)"}}
    >
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <FlyToActiveCity activeCityCoords={activeCityCoords} />
    </MapContainer>
  </div>;
}

export default Mapbox;
