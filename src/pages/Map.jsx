import React, { useEffect, useState } from 'react'
import { MapContainer } from 'react-leaflet'
import Layers from '../components/epr/Layers'

const Map = () => { 
    const mapCenter = localStorage.getItem('center')?JSON.parse(localStorage.getItem('center')):[59.96906375537783, 30.32941039614578]           
    const zoom= localStorage.getItem('zoom')?localStorage.getItem('zoom'):9        
    useEffect(() => {
        document.title = "ЭПР в СПб"
     }, []);
    return  (                
        <MapContainer            
            center={mapCenter}                                  
            zoom={zoom}             
            style={{ height: '100%', width: '100%' }}           
        >                               
            <Layers />                         
        </MapContainer>
    )
}

export default Map
