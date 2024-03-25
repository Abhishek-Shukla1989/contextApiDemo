// import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import {useEffect, useState } from 'react'
import { useCity } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeoLocation'
import Button from './Button'
import {useURLPosition} from '../hooks/useURLPosition'
export default function Map() {

  const navigate = useNavigate()
  const {isLoading:isLoadingPosition, position:geoLocationPosition, getPosition} = useGeolocation()
  const {cities} = useCity()
  const [lat,lng]= useURLPosition()
  const [mapPositions,setmapPositions] = useState([40,1])

  useEffect(function()
  {
    if(lat && lng)
    {
      setmapPositions([lat,lng])
    }
  }, [lat,lng])
  
  useEffect(function()
  {
     if(geoLocationPosition) 
     {
      setmapPositions([geoLocationPosition.lat, geoLocationPosition.lng])}
  }, [geoLocationPosition])

  return ( <div className={styles.mapContainer} >
    <Button type='position' onClick={getPosition}>{isLoadingPosition?'Loading...':'Use your position'}</Button>
    <MapContainer center={mapPositions} zoom={13} scrollWheelZoom={true} className={styles['map']}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map(city=><Marker position={[city.position.lat,city.position.lng]} key= {city.id}>
      <Popup>
       {city.cityName}
      </Popup>
    </Marker>)
    }
    <ChangeCenter position={mapPositions}/> 
    <DetectClick/>
  </MapContainer>
    </div>
  )
}

function ChangeCenter({position})
{
  const map = useMap()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}