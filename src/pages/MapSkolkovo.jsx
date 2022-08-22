import React, { useEffect, useState } from 'react'
import { MapContainer } from 'react-leaflet'
import LayersS from '../components/skolkovo/LayersS'

const MapSkolkovo = () => { 
    const mapCenter = localStorage.getItem('centerS')?JSON.parse(localStorage.getItem('centerS')):[55.69376308689773, 37.34733685072814]           
    const zoom= localStorage.getItem('zoomS')?localStorage.getItem('zoomS'):12

    useEffect(() => {
        document.title = "Сколково"
     }, []);
    return  (                
        <MapContainer            
            center={mapCenter}                                  
            zoom={zoom}             
            style={{ height: '100%', width: '100%' }}           
        >                               
            <LayersS />                         
        </MapContainer>
    )
}
export default MapSkolkovo